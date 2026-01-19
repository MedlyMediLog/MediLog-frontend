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
import { Category } from '@/app/category/_components/category.constants'
import { Target } from '@/types/product'

const FILTER_OPTIONS: FilterOption[] = [
  { label: '전체', value: 'all' },
  { label: '임산부', value: 'pregnant' },
  { label: '청소년', value: 'teen' },
  { label: '다이어터', value: 'dieter' },
]

type Props = {
  category: Category
  /** URL에서 들어온 target(있을 수도/없을 수도). 기본 정책은 “칩이 우선” */
  target?: Target
}

const LOAD_STEP = 20

/**
 * ✅ 실제 API 응답(스크린샷 기준)
 * - productId가 아니라 productCode
 * - target은 null 또는 'PREGNANT'|'TEEN'|'DIETER'
 * - 전체 리스트: items 사용
 * - 대상군 리스트: allowed/caution 사용
 */
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

export function ProductList({ category, target }: Props) {
  // ✅ “칩이 우선” 정책:
  // - 사용자가 칩을 만지기 전까지는(초기 진입) URL target이 있으면 그걸 반영할 수 있음
  // - 한 번이라도 칩 선택하면, 그 이후엔 selected만 기준으로 API 요청/렌더
  const userTouchedFilterRef = React.useRef(false)

  const initialSelected: SelectedKey = React.useMemo(() => {
    if (target === 'PREGNANT') return 'pregnant'
    if (target === 'TEEN') return 'teen'
    if (target === 'DIETER') return 'dieter'
    return 'all'
  }, [target])

  const [selected, setSelected] = React.useState<SelectedKey>(initialSelected)
  const [q, setQ] = React.useState('')
  const [isSearching, setIsSearching] = React.useState(false)
  const [visibleCount, setVisibleCount] = React.useState(LOAD_STEP)
  const [isScrolling, setIsScrolling] = React.useState(false)
  const [showTopButton, setShowTopButton] = React.useState(false)
  const [toast, setToast] = React.useState<CommonToastItem | null>(null)
  const [isIntakeOverlayOpen, setIsIntakeOverlayOpen] = React.useState(false)

  const mobileContentRef = React.useRef<HTMLDivElement | null>(null)
  const desktopContentRef = React.useRef<HTMLDivElement | null>(null)
  const [toastLeft, setToastLeft] = React.useState<number | null>(null)

  // ✅ 실제 API 요청에 넣을 target 결정
  // - 사용자가 칩을 누른 적이 없고, selected가 all이면: URL target을 유지할 수 있음
  // - 사용자가 칩을 누른 뒤에는: selected 기준(전체는 undefined)
  const requestTarget = React.useMemo<Target | undefined>(() => {
    if (userTouchedFilterRef.current) {
      if (selected === 'all') return undefined
      return TARGET_BY_SELECTED[selected]
    }

    // 아직 사용자가 칩을 안 만짐: URL target이 있으면 유지(옵션)
    if (selected === 'all') return target
    return TARGET_BY_SELECTED[selected]
  }, [selected, target])

  const { data, isLoading, isError, refetch } = useProductList({
    category,
    target: requestTarget,
  }) as {
    data?: ProductListApiResponse
    isLoading: boolean
    isError: boolean
    refetch?: () => void
  }

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
    const updateToastLeft = () => {
      const el = window.matchMedia('(min-width: 768px)').matches
        ? desktopContentRef.current
        : mobileContentRef.current

      if (!el) return

      const rect = el.getBoundingClientRect()
      setToastLeft(rect.left + rect.width / 2)
    }

    updateToastLeft()
    window.addEventListener('resize', updateToastLeft)
    return () => window.removeEventListener('resize', updateToastLeft)
  }, [])

  // ✅ “필터 적용 여부”는 UI 기준(칩 선택 기준)
  const isFilterApplied = selected !== 'all'

  const safeId = (p: ApiProduct) => String(p.productCode)

  // ✅ 이미지 매핑: productCode가 엄청 큰 숫자/문자열이라도 안전하게 number로 변환 시도
  // (getProductImageById가 내부에서 fallback을 해주면 가장 깔끔)
  const safeImage = (p: ApiProduct) => {
    const n = Number(p.productCode)
    if (Number.isFinite(n)) return getProductImageById(n)
    return undefined
  }

  // ✅ “현재 응답(data)”에서 화면에 뿌릴 원본 리스트 만들기
  // - 전체(칩 all): items
  // - 대상군(칩): allowed/caution 합치고 status 부여
  const sourceList: ProductItem[] = React.useMemo(() => {
    if (!data) return []

    // 전체 보기
    if (!isFilterApplied) {
      const items = data.items ?? []
      return items.map((p) => ({
        id: safeId(p),
        name: p.name,
        brand: p.manufacturer,
        tags: p.ingredients,
        image: safeImage(p),
      }))
    }

    // 대상군 보기
    const allowed = data.allowed ?? []
    const caution = data.caution ?? []

    const toItem = (p: ApiProduct, status: ProductStatus): ProductItem => ({
      id: safeId(p),
      name: p.name,
      brand: p.manufacturer,
      tags: p.ingredients,
      image: safeImage(p),
      status,
    })

    return [...allowed.map((p) => toItem(p, '섭취 가능')), ...caution.map((p) => toItem(p, '주의사항'))]
  }, [data, isFilterApplied])

  // ✅ 검색: 제조사/브랜드명(manufacturer) 기준 (스펙 그대로)
  const filtered: ProductItem[] = React.useMemo(() => {
    const keyword = q.trim()
    if (keyword.length === 0) return sourceList
    return sourceList.filter((it) => it.brand.includes(keyword))
  }, [sourceList, q])

  const shouldShowEmptyResult = !isLoading && !isError && filtered.length === 0

  const visibleItems = React.useMemo(() => {
    return filtered.slice(0, visibleCount)
  }, [filtered, visibleCount])

  React.useEffect(() => {
    setVisibleCount(LOAD_STEP)
  }, [selected, q, filtered.length])

  const toastKey = `${selected}__${q}__${shouldShowEmptyResult}__${isFilterApplied}`
  const prevToastKeyRef = React.useRef<string | null>(null)

  React.useEffect(() => {
    if (prevToastKeyRef.current === toastKey) return
    prevToastKeyRef.current = toastKey

    if (!shouldShowEmptyResult) return

    setToast({
      id: String(Date.now()),
      type: 'error',
      message: '결과를 불러오지 못했어요. 다시 필터를 적용해주세요.',
    })

    const t = window.setTimeout(() => setToast(null), 2200)
    return () => window.clearTimeout(t)
  }, [toastKey, shouldShowEmptyResult])

  const handleLoadMore = () => {
    setIsIntakeOverlayOpen(true)
    setVisibleCount((prev) => Math.min(prev + LOAD_STEP, filtered.length))
  }

  const handleSelect = (v: string) => {
    userTouchedFilterRef.current = true
    setSelected(v as SelectedKey)

    // ✅ “전체”를 누르면 URL target과 상관없이 “전체”가 되길 원하니까
    // requestTarget 계산에서 userTouchedFilterRef가 true면 all -> undefined로 처리됨
  }

  if (isLoading) return <div className="p-5">로딩중...</div>
  if (isError || !data) return <div className="p-5">상세 정보를 불러오지 못했어요.</div>

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

      {/* Mobile */}
      <section className="md:hidden w-full">
        <IntakeInfoOverlay open={isIntakeOverlayOpen} onClose={() => setIsIntakeOverlayOpen(false)} />

        <div ref={mobileContentRef} className={['w-full', 'flex flex-col items-start self-stretch', 'px-[20px]', 'pb-[60px]'].join(' ')}>
          <ScrollAwareBlock hidden={isScrolling} className="w-full">
            <div className="w-full mb-[12px]">
              <BasicTargetSummaryCard />
            </div>

            <FilterBar
              variant="mobile"
              isSearching={isSearching}
              options={FILTER_OPTIONS}
              selectedValue={selected}
              onSelect={handleSelect}
              searchValue={q}
              onSearchChange={setQ}
              onSearchSubmit={() => {}}
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
                title="1XX errors"
                message={'에러 문구 출력 자리.\n문장이 두개 일시 엔터로!'}
                buttonText="다시 찾아보기"
                onClick={() => {
                  userTouchedFilterRef.current = true
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

      {/* Desktop */}
      <section className="hidden md:flex flex-col items-center w-full">
        <div ref={desktopContentRef} className={['flex flex-col items-center', 'w-full max-w-[1300px]', 'flex-1 self-stretch', 'px-[20px] pb-[120px]'].join(' ')}>
          <ScrollAwareBlock hidden={isScrolling} className="w-full">
            <div className="w-full flex flex-col items-start pt-0 pb-[20px]">
              <div className="w-full mb-[12px]">
                <BasicTargetSummaryCard />
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
                title="1XX errors"
                message={'에러 문구 출력 자리.\n문장이 두개 일시 엔터로!'}
                buttonText="다시 찾아보기"
                onClick={() => {
                  userTouchedFilterRef.current = true
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
