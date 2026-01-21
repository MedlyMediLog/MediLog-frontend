// src/app/product-listing/_components/ProductList.tsx
'use client'

import React from 'react'
import Link from 'next/link'

import type { SelectedKey, ProductItem, ProductStatus } from './shared/types'
import { getTargetMessage } from './shared/policy'

import { FilterBar, type FilterOption } from '@/app/_components/common/FilterBar'
import { EmptyResult } from './shared/EmptyResult'
import TargetNotice from './shared/TargetNotice'
import { InfoMessage } from '@/app/_components/common/InfoMessage'
import { IntakeInfoOverlay } from './shared/IntakeInfoOverlay/IntakeInfoOverlay'
import { getProductImageById } from './shared/productImages'

// 모바일 QueryResult(경로가 다름)
import { QueryResult as QueryResultMobile } from '@/app/_components/common/QueryResult/QueryResult'
// 데스크탑 QueryResult
import { QueryResult as QueryResultDesktop } from '@/app/_components/common/QueryResult'

import { BasicTargetSummaryCard } from './shared/BasicTargetSummaryCard/BasicTargetSummaryCard'
import { LoadMoreSection } from './shared/LoadMoreSection/LoadMoreSection'

import { FloatingTopButton } from './shared/FloatingTopButton/FloatingTopButton'
import { ScrollAwareBlock } from './shared/ScrollAwareBlock/ScrollAwareBlock'

import Toast from '@/app/_components/common/Toast'
import type { ToastItem as CommonToastItem } from '@/app/_components/common/types'

import ProductGridDesktop from './ProductGrid.desktop'
import { ProductCard } from './ProductCard'
import { useProductList } from '@/hooks/useProductList'
import { Category } from '@/types/product'
import { Target } from '@/types/product'

const FILTER_OPTIONS: FilterOption[] = [
  { label: '전체', value: 'all' },
  { label: '임산부', value: 'pregnant' },
  { label: '청소년', value: 'teen' },
  { label: '다이어터', value: 'dieter' },
]

type Props = {
  category: Category
  target?: Target
}

const LOAD_STEP = 20

type ApiProduct = {
  productCode: string | number
  name: string
  manufacturer: string
  ingredients: string[]
  level: number | null
  imageUrl: string | null
}

type ProductListApiResponse = {
  category: string
  target: Target | null
  items: ApiProduct[] | null
  allowed: ApiProduct[] | null
  caution: ApiProduct[] | null
}

const TARGET_BY_SELECTED: Record<Exclude<SelectedKey, 'all'>, Target> = {
  pregnant: 'PREGNANT',
  teen: 'TEEN',
  dieter: 'DIETER',
}

/** -----------------------------
 * A) 표시 문자열 정리 유틸
 * ----------------------------- */
function cleanText(input: unknown) {
  const s = String(input ?? '')

  let out = s
    .replace(/[\uFEFF\u200B-\u200D\u2060\u00AD]/g, '')
    .replace(/\uFFFD/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (out.startsWith('?')) {
    const next = out.slice(1, 2)
    if (/[0-9A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ]/.test(next)) {
      out = out.slice(1).trim()
    }
  }

  return out
}

/** -----------------------------
 * 검색 유틸: 한글 초성 추출
 * ----------------------------- */
const CHO = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
] as const

function getChosung(text: string) {
  let out = ''
  for (const ch of text) {
    const code = ch.charCodeAt(0)
    if (code >= 44032 && code <= 55203) {
      const index = Math.floor((code - 44032) / 588)
      out += CHO[index] ?? ch
      continue
    }
    out += ch
  }
  return out
}

function normalize(text: string) {
  return text.replace(/\s+/g, '').toLowerCase()
}

function looksLikeChosungOnly(q: string) {
  const s = q.replace(/\s+/g, '')
  if (s.length === 0) return false
  return /^[ㄱ-ㅎ]+$/.test(s)
}

function containsJamo(q: string) {
  return /[ㄱ-ㅎㅏ-ㅣ]/.test(q)
}

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(t)
  }, [value, delayMs])

  return debounced
}

/** -----------------------------
 * 사전식 정렬키 (제품명 기준)
 * ----------------------------- */
function toSortKey(productName: string) {
  const t = cleanText(productName)
  const stripped = t.replace(/^[\s"'`“”‘’\[\]\(\)\{\}\-–—~!@#$%^&*_=+|\\/:;,.<>?]+/g, '')
  return normalize(stripped)
}

const KO_COLLATOR = new Intl.Collator('ko', { sensitivity: 'base', numeric: true })

/** -----------------------------
 * ✅ “현업형” 2단계 정렬: 그룹(한글/영문/숫자/기타) → 그룹 내 사전식
 * ----------------------------- */
function getSortGroup(sortKey: string) {
  const first = sortKey.charAt(0)
  if (!first) return 9

  const code = first.charCodeAt(0)

  if (code >= 44032 && code <= 55203) return 1 // 한글
  if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) return 2 // 영문
  if (code >= 48 && code <= 57) return 3 // 숫자
  return 4
}

export function ProductList({ category, target }: Props) {
  const initialSelected: SelectedKey = React.useMemo(() => {
    if (target === 'PREGNANT') return 'pregnant'
    if (target === 'TEEN') return 'teen'
    if (target === 'DIETER') return 'dieter'
    return 'all'
  }, [target])

  const [selected, setSelected] = React.useState<SelectedKey>(initialSelected)

  const [q, setQ] = React.useState('')
  const debouncedQ = useDebouncedValue(q, 250)

  const [isSearching, setIsSearching] = React.useState(false)
  const [visibleCount, setVisibleCount] = React.useState(LOAD_STEP)
  const [isScrolling, setIsScrolling] = React.useState(false)
  const [showTopButton, setShowTopButton] = React.useState(false)
  const [toast, setToast] = React.useState<CommonToastItem | null>(null)
  const [isIntakeOverlayOpen, setIsIntakeOverlayOpen] = React.useState(false)

  // ✅ (수정) 컨테이너 기준은 page.tsx가 잡으므로, ProductList 내부에서는 "좌표 측정용 ref"만 유지
  const mobileContentRef = React.useRef<HTMLDivElement | null>(null)
  const desktopContentRef = React.useRef<HTMLDivElement | null>(null)
  const [toastLeft, setToastLeft] = React.useState<number | null>(null)

  const [hasUserTouchedFilter, setHasUserTouchedFilter] = React.useState(false)

  const requestTarget = React.useMemo<Target | undefined>(() => {
    if (hasUserTouchedFilter) {
      if (selected === 'all') return undefined
      return TARGET_BY_SELECTED[selected]
    }
    if (selected === 'all') return target
    return TARGET_BY_SELECTED[selected]
  }, [hasUserTouchedFilter, selected, target])

  const {
    data: allData,
    isLoading: isAllLoading,
    isError: isAllError,
  } = useProductList({
    category,
    target: undefined,
  }) as {
    data?: ProductListApiResponse
    isLoading: boolean
    isError: boolean
  }

  const {
    data: viewData,
    isLoading: isViewLoading,
    isError: isViewError,
    refetch,
  } = useProductList({
    category,
    target: requestTarget,
  }) as {
    data?: ProductListApiResponse
    isLoading: boolean
    isError: boolean
    refetch?: () => void
  }

  const isLoading = isAllLoading || isViewLoading
  const isError = isAllError || isViewError

  const onRefresh = React.useCallback(() => {
    refetch?.()
  }, [refetch])

  React.useEffect(() => {
    let stopTimer: number | null = null

    const onScroll = () => {
      const y = window.scrollY
      setShowTopButton(y > 240)

      setIsScrolling(true)
      if (stopTimer) window.clearTimeout(stopTimer)
      stopTimer = window.setTimeout(() => setIsScrolling(false), 160)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (stopTimer) window.clearTimeout(stopTimer)
    }
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ✅ (수정) toast 위치 계산 분기 기준을 740px로 통일 + 컨테이너(ref)도 각각 사용
  React.useEffect(() => {
    const updateToastLeft = () => {
      const isDesktop = window.matchMedia('(min-width: 740px)').matches
      const el = isDesktop ? desktopContentRef.current : mobileContentRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      setToastLeft(rect.left + rect.width / 2)
    }

    updateToastLeft()
    window.addEventListener('resize', updateToastLeft)
    return () => window.removeEventListener('resize', updateToastLeft)
  }, [])

  const isFilterApplied = selected !== 'all'

  const safeImage = (p: ApiProduct) => {
    const n = Number(p.productCode)
    if (Number.isFinite(n)) return getProductImageById(n)
    return undefined
  }

  const makeKey = React.useCallback((p: ApiProduct) => `${p.manufacturer}__${p.name}`, [])

  const sourceList: ProductItem[] = React.useMemo(() => {
    const allItems = allData?.items ?? []
    if (!allData) return []

    if (!isFilterApplied) {
      return allItems.map((p) => ({
        id: String(p.productCode),
        name: cleanText(p.name),
        brand: cleanText(p.manufacturer),
        tags: p.ingredients,
        image: safeImage(p),
      }))
    }

    const allowed = viewData?.allowed ?? []
    const caution = viewData?.caution ?? []

    const allowedKeys = new Set(allowed.map(makeKey))
    const cautionKeys = new Set(caution.map(makeKey))

    return allItems
      .filter((p) => allowedKeys.has(makeKey(p)) || cautionKeys.has(makeKey(p)))
      .map((p) => {
        const isAllowed = allowedKeys.has(makeKey(p))
        const status: ProductStatus = isAllowed ? '섭취 가능' : '주의사항'

        return {
          id: String(p.productCode),
          name: cleanText(p.name),
          brand: cleanText(p.manufacturer),
          tags: p.ingredients,
          image: safeImage(p),
          status,
        }
      })
  }, [allData, viewData, isFilterApplied, makeKey])

  /** ✅ “현업형 사전식” 비교: 그룹 → 그룹 내 사전식 */
  const compareByProductName = React.useCallback((a: ProductItem, b: ProductItem) => {
    const ak = toSortKey(a.name)
    const bk = toSortKey(b.name)

    const ag = getSortGroup(ak)
    const bg = getSortGroup(bk)

    if (ag !== bg) return ag - bg
    return KO_COLLATOR.compare(ak, bk)
  }, [])

  const getRankScore = React.useCallback((item: ProductItem, queryRaw: string) => {
    const qClean = cleanText(queryRaw)
    const keyword = normalize(qClean)
    const keywordCho = normalize(getChosung(qClean))

    if (!keyword && !keywordCho) return 0

    const nameNorm = normalize(item.name)
    const brandNorm = normalize(item.brand)

    const nameCho = normalize(getChosung(item.name))
    const brandCho = normalize(getChosung(item.brand))

    const queryHasJamo = containsJamo(qClean)
    const queryIsChosungOnly = looksLikeChosungOnly(keywordCho)

    let score = 0

    if (keyword) {
      if (nameNorm === keyword) score += 1000
      else if (nameNorm.startsWith(keyword)) score += 700
      else if (nameNorm.includes(keyword)) score += 400
    }

    if (keyword) {
      if (brandNorm === keyword) score += 300
      else if (brandNorm.startsWith(keyword)) score += 200
      else if (brandNorm.includes(keyword)) score += 100
    }

    if (keywordCho) {
      if (queryIsChosungOnly) {
        if (nameCho.startsWith(keywordCho)) score += 250
        if (brandCho.startsWith(keywordCho)) score += 80
      } else if (queryHasJamo) {
        if (nameCho.startsWith(keywordCho)) score += 200
        if (brandCho.startsWith(keywordCho)) score += 60
      }
    }

    return score
  }, [])

  const filtered: ProductItem[] = React.useMemo(() => {
    const qRaw = debouncedQ.trim()

    if (qRaw.length === 0) return [...sourceList].sort(compareByProductName)

    const cleanedQuery = cleanText(qRaw)
    const keyword = normalize(cleanedQuery)
    const keywordCho = normalize(getChosung(cleanedQuery))
    const queryHasJamo = containsJamo(cleanedQuery)
    const queryIsChosungOnly = looksLikeChosungOnly(keywordCho)

    const candidates = sourceList.filter((it) => {
      const nameNorm = normalize(it.name)
      const brandNorm = normalize(it.brand)

      if (keyword && (nameNorm.includes(keyword) || brandNorm.includes(keyword))) return true

      const nameCho = normalize(getChosung(it.name))
      const brandCho = normalize(getChosung(it.brand))

      if (keywordCho) {
        if (queryIsChosungOnly) return nameCho.startsWith(keywordCho) || brandCho.startsWith(keywordCho)
        if (queryHasJamo) return nameCho.startsWith(keywordCho) || brandCho.startsWith(keywordCho)
      }

      return false
    })

    const scored = candidates.map((it) => ({ it, score: getRankScore(it, qRaw) }))

    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return compareByProductName(a.it, b.it)
    })

    return scored.map((x) => x.it)
  }, [sourceList, debouncedQ, compareByProductName, getRankScore])

  const shouldShowEmptyResult = !isLoading && !isError && filtered.length === 0
  const visibleItems = React.useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount])

  React.useEffect(() => {
    setVisibleCount(LOAD_STEP)
  }, [selected, q, filtered.length])

  const toastKey = `${selected}__${debouncedQ}__${shouldShowEmptyResult}__${isFilterApplied}`
  const prevToastKeyRef = React.useRef<string | null>(null)

  React.useEffect(() => {
    if (prevToastKeyRef.current === toastKey) return
    prevToastKeyRef.current = toastKey

    if (!shouldShowEmptyResult) return

    setToast({
      id: String(Date.now()),
      type: 'error',
      message: '결과를 불러오지 못했어요. 다시 검색/필터를 적용해주세요.',
    })

    const t = window.setTimeout(() => setToast(null), 2200)
    return () => window.clearTimeout(t)
  }, [toastKey, shouldShowEmptyResult])

  const handleLoadMore = () => {
    setIsIntakeOverlayOpen(true)
    setVisibleCount((prev) => Math.min(prev + LOAD_STEP, filtered.length))
  }

  const handleSelect = (v: string) => {
    setHasUserTouchedFilter(true)
    setSelected(v as SelectedKey)
  }

  if (isLoading) return <div className="p-5">로딩중...</div>
  if (isError || !allData) return <div className="p-5">상세 정보를 불러오지 못했어요.</div>

  return (
    <>
      <FloatingTopButton visible={showTopButton} onClick={handleScrollToTop} />

      {toast && toastLeft !== null && (
        <div
          style={{
            position: 'fixed',
            left: toastLeft,
            bottom: 170,
            transform: 'translateX(-50%)',
            zIndex: 50,
          }}
        >
          <Toast toast={toast} />
        </div>
      )}

      {/* -----------------------------
          Mobile (375~739)
          - ✅ 컨테이너 기준(page.tsx)을 따르므로 px/max-w 중복 제거
         ----------------------------- */}
      <section className="desktop:hidden w-full">
        <IntakeInfoOverlay open={isIntakeOverlayOpen} onClose={() => setIsIntakeOverlayOpen(false)} />

        {/* ✅ px-[20px] 제거: page 컨테이너가 이미 px를 가짐 */}
        <div ref={mobileContentRef} className={['w-full', 'flex flex-col items-start self-stretch', 'pb-[60px]'].join(' ')}>
          <ScrollAwareBlock hidden={isScrolling} className="w-full">
            <div className="w-full mb-[12px]">
              {/* ✅ slot padding 중복 방지 */}
              <BasicTargetSummaryCard withSlotPadding={false} />
            </div>

            <FilterBar
              variant="mobile"
              isSearching={isSearching}
              options={FILTER_OPTIONS}
              selectedValue={selected}
              onSelect={handleSelect}
              searchValue={q}
              onSearchChange={setQ}
              onSearchSubmit={() => setIsSearching(false)}
              searchPlaceholder="제조사/브랜드명으로 검색해보세요."
              onIconClick={() => setIsSearching(true)}
            />

            {isFilterApplied && (
              <div className="mt-[8px] w-full">
                <TargetNotice message={getTargetMessage(selected)} />
              </div>
            )}

            {!shouldShowEmptyResult && (
              <div className="mt-[16px] w-full flex justify-end">
                <QueryResultMobile count={filtered.length} onRefresh={onRefresh} />
              </div>
            )}
          </ScrollAwareBlock>

          <div className="mt-[16px] w-full">
            {shouldShowEmptyResult ? (
              <EmptyResult
                title="검색 결과가 없어요"
                message={'입력하신 조건으로는 결과를 찾지 못했어요.\n다른 키워드로 다시 검색해보세요.'}
                buttonText="다시 찾아보기"
                onClick={() => {
                  setHasUserTouchedFilter(true)
                  setQ('')
                  setSelected('all')
                  setIsSearching(false)
                  onRefresh()
                }}
              />
            ) : (
              <>
                <ul className="flex flex-col items-start self-stretch w-full gap-[20px]">
                  {visibleItems.map((item) => (
                    <li key={item.id} className="w-full">
                      <Link href={`/products/${item.id}`} className="block" aria-label={`${item.name} 상세로 이동`}>
                        <ProductCard item={item} showStatus={isFilterApplied} />
                      </Link>
                    </li>
                  ))}
                </ul>

                <LoadMoreSection total={filtered.length} visible={visibleCount} step={LOAD_STEP} onLoadMore={handleLoadMore} />
              </>
            )}
          </div>
        </div>
      </section>

      {/* -----------------------------
          Desktop (740~1380+)
          - ✅ 가운데 정렬/최대폭/패딩은 page.tsx 컨테이너가 담당
          - ✅ ProductList는 w-full만 유지
         ----------------------------- */}
      <section className="hidden desktop:flex flex-col items-stretch w-full">
        {/* ✅ max-w / px 중복 제거 */}
        <div ref={desktopContentRef} className={['w-full', 'flex flex-col items-stretch', 'flex-1 self-stretch', 'pb-[120px]'].join(' ')}>
          <ScrollAwareBlock hidden={isScrolling} className="w-full">
            <div className="w-full flex flex-col items-start pt-0 pb-[20px]">
              <div className="w-full mb-[12px]">
                {/* ✅ 데스크탑은 항상 펼침, slot padding 중복 방지 */}
                <BasicTargetSummaryCard withSlotPadding={false} />
              </div>

              <div className="w-full">
                <FilterBar
                  variant="select"
                  isSearching={false}
                  options={FILTER_OPTIONS}
                  selectedValue={selected}
                  onSelect={handleSelect}
                  searchValue={q}
                  onSearchChange={setQ}
                  onSearchSubmit={() => {}}
                  searchPlaceholder="제조사/브랜드명으로 검색해보세요."
                />
              </div>

              <div className="w-full flex flex-wrap items-end content-end py-[10px] gap-y-[10px] rounded-[12px]">
                {isFilterApplied ? (
                  <div className="min-w-0 flex-1 max-w-[485px] -my-[10px]">
                    <InfoMessage message={getTargetMessage(selected)} />
                  </div>
                ) : (
                  <div className="min-w-0 flex-1" />
                )}

                {!shouldShowEmptyResult && (
                  <div className="ml-auto flex-shrink-0 -my-[10px]">
                    <QueryResultDesktop count={filtered.length} showRefresh onRefresh={onRefresh} label="조회 결과" unit="개" />
                  </div>
                )}
              </div>
            </div>
          </ScrollAwareBlock>

          <div className="w-full">
            {shouldShowEmptyResult ? (
              <EmptyResult
                title="검색 결과가 없어요"
                message={'입력하신 조건으로는 결과를 찾지 못했어요.\n다른 키워드로 다시 검색해보세요.'}
                buttonText="다시 찾아보기"
                onClick={() => {
                  setHasUserTouchedFilter(true)
                  setQ('')
                  setSelected('all')
                  onRefresh()
                }}
              />
            ) : (
              <>
                <ProductGridDesktop items={visibleItems} showStatus={isFilterApplied} />
                <LoadMoreSection
                  total={filtered.length}
                  visible={visibleCount}
                  step={LOAD_STEP}
                  onLoadMore={() => setVisibleCount((prev) => Math.min(prev + LOAD_STEP, filtered.length))}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}