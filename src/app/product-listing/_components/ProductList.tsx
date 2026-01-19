// src/app/product-listing/_components/ProductList.tsx
// src/app/product-listing/_components/ProductList.tsx
'use client'

import React from 'react'
import Link from 'next/link' // ✅ 추가

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

// ✅ 추가 (이미 너 코드에 있음)
import { FloatingTopButton } from './shared/FloatingTopButton/FloatingTopButton'
import { ScrollAwareBlock } from './shared/ScrollAwareBlock/ScrollAwareBlock'

// ✅ Toast 추가
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
  target?: Target
}

const LOAD_STEP = 20

type ApiProduct = {
  productId: number
  name: string
  manufacturer: string
  ingredients: string[]
  imageUrl?: string
  level: number | null
}

type TargetSection = {
  category: string
  target: Target
  items: null
  allowed: ApiProduct[]
  caution: ApiProduct[]
}

type ProductListResponse = {
  default: {
    category: string
    target: null
    items: ApiProduct[]
    allowed: null
    caution: null
  }
  PREGNANT?: TargetSection
  TEEN?: TargetSection
  DIETER?: TargetSection
}

const TARGET_BY_SELECTED: Record<Exclude<SelectedKey, 'all'>, Target> = {
  pregnant: 'PREGNANT' as Target,
  teen: 'TEEN' as Target,
  dieter: 'DIETER' as Target,
}

const DATAKEY_BY_TARGET: Record<Target, keyof ProductListResponse> = {
  PREGNANT: 'PREGNANT',
  TEEN: 'TEEN',
  DIETER: 'DIETER',
} as const

export function ProductList({ category, target }: Props) {
  const [selected, setSelected] = React.useState<SelectedKey>('all')
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

  const apiTarget = React.useMemo<Target | undefined>(() => {
    if (selected === 'all') return undefined
    return TARGET_BY_SELECTED[selected]
  }, [selected])

  const { data, isLoading, isError, refetch } = useProductList({
    category,
    target: apiTarget ?? target,
  }) as {
    data?: ProductListResponse
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

  const isFilterApplied = selected !== 'all'

  const baseList: ProductItem[] = React.useMemo(() => {
    const items = data?.default?.items ?? []
    return items.map((p) => ({
      id: String(p.productId),
      name: p.name,
      brand: p.manufacturer,
      tags: p.ingredients,
      image: getProductImageById(p.productId),
    }))
  }, [data])

  const currentTargetSection = React.useMemo<TargetSection | null>(() => {
    if (!data) return null
    if (!apiTarget) return null

    const key = DATAKEY_BY_TARGET[apiTarget]
    const section = data[key]
    if (!section) return null

    if ((section as TargetSection).allowed && (section as TargetSection).caution) {
      return section as TargetSection
    }
    return null
  }, [data, apiTarget])

  const targetList: ProductItem[] = React.useMemo(() => {
    if (!currentTargetSection) return []

    const allowed = currentTargetSection.allowed ?? []
    const caution = currentTargetSection.caution ?? []

    const toItem = (p: ApiProduct, status: ProductStatus): ProductItem => ({
      id: String(p.productId),
      name: p.name,
      brand: p.manufacturer,
      tags: p.ingredients,
      image: getProductImageById(p.productId),
      status,
    })

    return [
      ...allowed.map((p) => toItem(p, '섭취 가능')),
      ...caution.map((p) => toItem(p, '주의사항')),
    ]
  }, [currentTargetSection])

  const filtered: ProductItem[] = React.useMemo(() => {
    const keyword = q.trim()
    const source = selected === 'all' ? baseList : targetList
    if (keyword.length === 0) return source
    return source.filter((it) => it.brand.includes(keyword))
  }, [baseList, targetList, q, selected])

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
    const shouldShowErrorToast = shouldShowEmptyResult
    if (prevToastKeyRef.current === toastKey) return
    prevToastKeyRef.current = toastKey

    if (!shouldShowErrorToast) return

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

        <div
          ref={mobileContentRef}
          className={['w-full', 'flex flex-col items-start self-stretch', 'px-[20px]', 'pb-[60px]'].join(' ')}
        >
          <ScrollAwareBlock hidden={isScrolling} className="w-full">
            <div className="w-full mb-[12px]">
              <BasicTargetSummaryCard />
            </div>

            <FilterBar
              variant="mobile"
              isSearching={isSearching}
              options={FILTER_OPTIONS}
              selectedValue={selected}
              onSelect={(v) => setSelected(v as SelectedKey)}
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
                  setQ('')
                  setSelected('all')
                  setIsSearching(false)
                  onRefresh()
                }}
              />
            ) : (
              <>
                {/* ✅ A안: 카드 전체를 Link로 감싸기 */}
                <ul className="flex flex-col items-start self-stretch w-full gap-[20px]">
                  {visibleItems.map((item) => (
                    <li key={item.id} className="w-full">
                      <Link
                        href={`/products/${item.id}`}
                        className="block"
                        aria-label={`${item.name} 상세로 이동`}
                      >
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
        <div
          ref={desktopContentRef}
          className={[
            'flex flex-col items-center',
            'w-full max-w-[1300px]',
            'flex-1 self-stretch',
            'px-[20px] pb-[120px]',
          ].join(' ')}
        >
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
                  onSelect={(v) => setSelected(v as SelectedKey)}
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
                    <QueryResultDesktop
                      count={filtered.length}
                      showRefresh
                      onRefresh={onRefresh}
                      label="조회 결과"
                      unit="개"
                    />
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
                  setQ('')
                  setSelected('all')
                  onRefresh()
                }}
              />
            ) : (
              <>
                {/* ✅ 데스크탑은 ProductGridDesktop 내부에서 Link 처리(아래 3번 코드 적용) */}
                <ProductGridDesktop items={visibleItems} showStatus={isFilterApplied} />

                <LoadMoreSection
                  total={filtered.length}
                  visible={visibleCount}
                  step={LOAD_STEP}
                  onLoadMore={() => {
                    setVisibleCount((prev) => Math.min(prev + LOAD_STEP, filtered.length))
                  }}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
