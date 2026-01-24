// src/app/(with-footer)/(with-sidebar)/products/_components/ProductList/ProductList.tsx
'use client'

import React from 'react'

import type { SelectedKey, ProductItem, ProductStatus } from '../shared/types'
import { getTargetMessage } from '../shared/policy'

import type { FilterOption } from '@/app/_components/common/FilterBar'
import Toast from '@/app/_components/common/Toast'
import type { ToastItem as CommonToastItem } from '@/app/_components/common/types'

import { FloatingTopButton } from '../shared/FloatingTopButton/FloatingTopButton'
import { useProductList } from '@/hooks/useProductList'
import type { Category, Target } from '@/types/product'

import { ProductListMobile } from './ProductList.mobile'
import { ProductListDesktop } from './ProductList.desktop'

import type { ApiProduct, ProductListApiResponse } from './ProductList.types'
import {
  cleanText,
  getChosung,
  normalize,
  looksLikeChosungOnly,
  containsJamo,
  toSortKey,
  KO_COLLATOR,
  getSortGroup,
} from './ProductList.utils'

import { FilterBar } from '@/app/_components/common/FilterBar'
import Overlay from '@/app/_components/common/Overlay/Overlay'

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

const TOAST_BOTTOM_MOBILE = 120
const TOAST_BOTTOM_DESKTOP = 170

const TARGET_BY_SELECTED: Record<Exclude<SelectedKey, 'all'>, Target> = {
  pregnant: 'PREGNANT',
  teen: 'TEEN',
  dieter: 'DIETER',
}

/** 오버레이 검색창 위치 미세 조정용 상수
 *  - 값이 커질수록 아래로 내려감
 *  - 음수면 위로 올라감
 */
const SEARCH_OVERLAY_Y_OFFSET = -80

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(t)
  }, [value, delayMs])

  return debounced
}

/** 상태 우선 정렬 */
const STATUS_RANK: Record<string, number> = {
  '섭취 가능': 0,
  '섭취 고려': 1,
  주의사항: 1,
  '섭취 금지': 2,
}

function getStatusRank(status?: ProductStatus) {
  if (!status) return 0
  return STATUS_RANK[status] ?? 9
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

  //  모바일 검색은 오버레이로
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = React.useState(false)

  //  오버레이 검색영역을 “원래 FilterBar 위치”에 띄우기 위한 앵커(top)
  const [searchOverlayTop, setSearchOverlayTop] = React.useState<number>(0)

  const [visibleCount, setVisibleCount] = React.useState(LOAD_STEP)
  const [isScrolling, setIsScrolling] = React.useState(false)
  const [showTopButton, setShowTopButton] = React.useState(false)

  const [toast, setToast] = React.useState<CommonToastItem | null>(null)
  const toastTimerRef = React.useRef<number | null>(null)

  const [isIntakeOverlayOpen, setIsIntakeOverlayOpen] = React.useState(false)

  const mobileContentRef = React.useRef<HTMLDivElement | null>(null)
  const desktopContentRef = React.useRef<HTMLDivElement | null>(null)

  const [toastLeft, setToastLeft] = React.useState<number | null>(null)
  const [toastBottom, setToastBottom] = React.useState<number>(TOAST_BOTTOM_MOBILE)

  const [hasUserTouchedFilter, setHasUserTouchedFilter] = React.useState(false)

  const [isDesktopViewport, setIsDesktopViewport] = React.useState(false)

  React.useEffect(() => {
    const mq = window.matchMedia('(min-width: 740px)')
    const onChange = () => setIsDesktopViewport(mq.matches)
    onChange()

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    }

    // legacy safari
    // eslint-disable-next-line deprecation/deprecation
    mq.addListener(onChange)
    // eslint-disable-next-line deprecation/deprecation
    return () => mq.removeListener(onChange)
  }, [])

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

  React.useEffect(() => {
    const updateToastPosition = () => {
      const isDesktop = window.matchMedia('(min-width: 740px)').matches
      const el = isDesktop ? desktopContentRef.current : mobileContentRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      setToastLeft(rect.left + rect.width / 2)
      setToastBottom(isDesktop ? TOAST_BOTTOM_DESKTOP : TOAST_BOTTOM_MOBILE)
    }

    updateToastPosition()
    window.addEventListener('resize', updateToastPosition)
    return () => window.removeEventListener('resize', updateToastPosition)
  }, [])

  const isFilterApplied = selected !== 'all'

  const makeKey = React.useCallback((p: ApiProduct) => `${p.manufacturer}__${p.name}`, [])

  /**
   * ✅ 핵심 변경(B안):
   * - image는 로컬 매핑(getProductImageById) 대신 서버에서 내려준 imageUrl을 그대로 사용
   * - p.imageUrl이 없으면 undefined 처리
   *
   * ⚠️ 만약 ProductItem.image 타입이 string을 허용하지 않으면,
   * shared/types의 ProductItem.image 타입을 `string | StaticImageData | undefined` 형태로 확장해야 함.
   */
  const sourceList: ProductItem[] = React.useMemo(() => {
    const allItems = allData?.items ?? []
    if (!allData) return []

    if (!isFilterApplied) {
      return allItems.map((p) => ({
        id: String(p.productCode),
        name: cleanText(p.name),
        brand: cleanText(p.manufacturer),
        tags: p.ingredients,
        // ✅ 서버 이미지 사용
        image: p.imageUrl ?? undefined,
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
          // ✅ 서버 이미지 사용
          image: p.imageUrl ?? undefined,
          status,
        }
      })
  }, [allData, viewData, isFilterApplied, makeKey])

  const compareByProductName = React.useCallback((a: ProductItem, b: ProductItem) => {
    const ak = toSortKey(a.name)
    const bk = toSortKey(b.name)

    const ag = getSortGroup(ak)
    const bg = getSortGroup(bk)

    if (ag !== bg) return ag - bg
    return KO_COLLATOR.compare(ak, bk)
  }, [])

  const compareForCurrentView = React.useCallback(
    (a: ProductItem, b: ProductItem) => {
      if (isFilterApplied) {
        const sr = getStatusRank(a.status) - getStatusRank(b.status)
        if (sr !== 0) return sr
      }
      return compareByProductName(a, b)
    },
    [isFilterApplied, compareByProductName],
  )

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

    if (qRaw.length === 0) return [...sourceList].sort(compareForCurrentView)

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
        if (queryIsChosungOnly)
          return nameCho.startsWith(keywordCho) || brandCho.startsWith(keywordCho)
        if (queryHasJamo) return nameCho.startsWith(keywordCho) || brandCho.startsWith(keywordCho)
      }

      return false
    })

    const scored = candidates.map((it) => ({ it, score: getRankScore(it, qRaw) }))

    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return compareForCurrentView(a.it, b.it)
    })

    return scored.map((x) => x.it)
  }, [sourceList, debouncedQ, compareForCurrentView, getRankScore])

  const shouldShowEmptyResult = !isLoading && filtered.length === 0
  const visibleItems = React.useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  )

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
      type: 'success',
      message: '결과를 불러오지 못했어요.\n다시 필터를 적용해주세요.',
    })
  }, [toastKey, shouldShowEmptyResult])

  React.useEffect(() => {
    if (!toast) return

    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current)

    toastTimerRef.current = window.setTimeout(() => {
      setToast(null)
      toastTimerRef.current = null
    }, 2200)

    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current)
        toastTimerRef.current = null
      }
    }
  }, [toast])

  const handleLoadMoreMobile = () => {
    setIsIntakeOverlayOpen(true)
    setVisibleCount((prev) => Math.min(prev + LOAD_STEP, filtered.length))
  }

  const handleLoadMoreDesktop = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_STEP, filtered.length))
  }

  const handleSelect = (v: string) => {
    setHasUserTouchedFilter(true)
    setSelected(v as SelectedKey)
  }

  const targetMessage = React.useMemo(() => getTargetMessage(selected), [selected])

  // 오버레이 열기 전에 “원래 FilterBar 위치(top)” 측정 (+ 상수 offset)
  const measureFilterBarTop = React.useCallback(() => {
    const root = mobileContentRef.current
    if (!root) return 0

    const filterBarEl = root.querySelector('.medly-filterbar') as HTMLElement | null
    if (!filterBarEl) return 0

    const rect = filterBarEl.getBoundingClientRect()
    return Math.max(0, rect.top + SEARCH_OVERLAY_Y_OFFSET)
  }, [])

  const openSearchOverlay = React.useCallback(() => {
    const top = measureFilterBarTop()
    setSearchOverlayTop(top)
    setIsSearchOverlayOpen(true)
  }, [measureFilterBarTop])

  const closeSearchOverlay = React.useCallback(() => {
    setIsSearchOverlayOpen(false)
  }, [])

  return (
    <>
      <FloatingTopButton visible={showTopButton} onClick={handleScrollToTop} />

      {toast && toastLeft !== null && (
        <div
          style={{
            position: 'fixed',
            left: toastLeft,
            bottom: toastBottom,
            transform: 'translateX(-50%)',
            zIndex: 50,
            whiteSpace: 'pre-line',
          }}
        >
          <Toast toast={toast} />
        </div>
      )}

      {/* Mobile Search Overlay */}
      {!isDesktopViewport && (
        <Overlay open={isSearchOverlayOpen} onClose={closeSearchOverlay} closeOnBackdrop>
          <div
            style={{
              position: 'absolute',
              top: searchOverlayTop,
              left: 0,
              right: 0,
            }}
            className={[
              'flex flex-col',
              'items-stretch',
              'gap-[10px]',
              'px-[20px]',
              'py-[10px]',
            ].join(' ')}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <FilterBar
              variant="searching"
              isSearching={true}
              hideOptionsWhenSearching={true}
              options={FILTER_OPTIONS}
              selectedValue={selected}
              onSelect={handleSelect}
              searchValue={q}
              onSearchChange={setQ}
              onSearchSubmit={() => {
                closeSearchOverlay()
              }}
              searchPlaceholder="제조사/브랜드명으로 검색해보세요."
              autoFocusSearch={true}
            />
          </div>
        </Overlay>
      )}

      {isDesktopViewport ? (
        <ProductListDesktop
          contentRef={desktopContentRef}
          isScrolling={isScrolling}
          options={FILTER_OPTIONS}
          selected={selected}
          isLoading={isLoading}
          q={q}
          isFilterApplied={selected !== 'all'}
          targetMessage={targetMessage}
          shouldShowEmptyResult={shouldShowEmptyResult}
          filteredCount={filtered.length}
          visibleItems={visibleItems}
          visibleCount={visibleCount}
          step={LOAD_STEP}
          onSelect={handleSelect}
          onSearchChange={setQ}
          onRefresh={onRefresh}
          onLoadMore={handleLoadMoreDesktop}
          onResetEmpty={() => {
            setHasUserTouchedFilter(true)
            setQ('')
            setSelected('all')
            onRefresh()
          }}
        />
      ) : (
        <ProductListMobile
          contentRef={mobileContentRef}
          isScrolling={isScrolling}
          isSearching={false}
          isIntakeOverlayOpen={isIntakeOverlayOpen}
          options={FILTER_OPTIONS}
          selected={selected}
          isLoading={isLoading}
          q={q}
          isFilterApplied={selected !== 'all'}
          targetMessage={targetMessage}
          shouldShowEmptyResult={shouldShowEmptyResult}
          filteredCount={filtered.length}
          visibleItems={visibleItems}
          visibleCount={visibleCount}
          step={LOAD_STEP}
          onSelect={handleSelect}
          onSearchChange={setQ}
          onSearchOpen={openSearchOverlay}
          onSearchSubmit={() => {}}
          onRefresh={onRefresh}
          onLoadMore={handleLoadMoreMobile}
          onResetEmpty={() => {
            setHasUserTouchedFilter(true)
            setQ('')
            setSelected('all')
            onRefresh()
          }}
          onCloseIntakeOverlay={() => setIsIntakeOverlayOpen(false)}
        />
      )}
    </>
  )
}
