// src/app/product-listing/_components/ProductList.tsx
'use client'

import React from 'react'
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
  { label: '다이어터', value: 'diet' },
]

type Props = {
  category: Category
  target?: Target // (page에서 넘어오는 target이 있다면 초기값으로만 쓸 수 있음)
}

const LOAD_STEP = 20

// ✅ 서버 응답 item 형태(콘솔로 확인한 형태)
type ApiProduct = {
  productId: number
  name: string
  manufacturer: string
  ingredients: string[]
  imageUrl?: string
  level: number | null
}

// ✅ target 섹션 형태
type TargetSection = {
  category: string
  target: Target
  items: null
  allowed: ApiProduct[]
  caution: ApiProduct[]
}

// ✅ useProductList data 구조(확장 가능하게 optional 처리)
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
  DIET?: TargetSection
}

// ✅ 탭(selected) → API target 매핑
// ⚠️ 만약 Target 타입이 소문자('pregnant')라면 여기만 바꿔주면 됨.
const TARGET_BY_SELECTED: Record<Exclude<SelectedKey, 'all'>, Target> = {
  pregnant: 'PREGNANT' as Target,
  teen: 'TEEN' as Target,
  diet: 'DIET' as Target,
}

// ✅ API target → data key 매핑 (응답이 PREGNANT/TEEN/DIET 키로 온다는 전제)
const DATAKEY_BY_TARGET: Record<Target, keyof ProductListResponse> = {
  PREGNANT: 'PREGNANT',
  TEEN: 'TEEN',
  DIET: 'DIET',
} as const

export function ProductList({ category, target }: Props) {
  // ✅ 탭/검색만 ProductList에서 관리
  // - target prop이 들어오면 초기 탭을 맞춰줄 수도 있는데, 지금은 기본 all 유지
  const [selected, setSelected] = React.useState<SelectedKey>('all')
  const [q, setQ] = React.useState('')

  /** ✅ FilterBarProps에서 isSearching이 필수라서 상태를 유지 */
  const [isSearching, setIsSearching] = React.useState(false)

  /** ✅ 더보기: 현재 노출 개수 (모바일/데스크탑 공통) */
  const [visibleCount, setVisibleCount] = React.useState(LOAD_STEP)

  /** ✅ 스크롤 중 숨김용 */
  const [isScrolling, setIsScrolling] = React.useState(false)

  /** ✅ 플로팅 버튼 노출 여부 */
  const [showTopButton, setShowTopButton] = React.useState(false)

  /** ✅ Toast 상태 */
  const [toast, setToast] = React.useState<CommonToastItem | null>(null)

  /** ✅ (모바일) 섭취 정보 오버레이 팝업 상태 */
  const [isIntakeOverlayOpen, setIsIntakeOverlayOpen] = React.useState(false)

  /** ✅ Toast 위치 계산용 ref */
  const mobileContentRef = React.useRef<HTMLDivElement | null>(null)
  const desktopContentRef = React.useRef<HTMLDivElement | null>(null)
  const [toastLeft, setToastLeft] = React.useState<number | null>(null)

  /**
   * ✅ 핵심 변경: selected 탭에 따라 API target을 바꾼다
   * - all: target 없음(=default + 서버가 함께 주는 섹션)
   * - pregnant/teen/diet: 각각 PREGNANT/TEEN/DIET로 요청
   */
  const apiTarget = React.useMemo<Target | undefined>(() => {
    if (selected === 'all') return undefined
    return TARGET_BY_SELECTED[selected]
  }, [selected])

  // ✅ 실데이터 hook (apiTarget에 따라 자동 재요청)
  const { data, isLoading, isError, refetch } = useProductList({
    category,
    target: apiTarget ?? target, // ✅ all이면 기존 target prop을 쓰고 싶다면 이렇게(보통은 apiTarget만 써도 됨)
  }) as {
    data?: ProductListResponse
    isLoading: boolean
    isError: boolean
    refetch?: () => void
  }

  // ✅ 새로고침 (refetch 없으면 안전하게 noop)
  const onRefresh = React.useCallback(() => {
    refetch?.()
  }, [refetch])

  // ✅ 스크롤 요구사항 구현
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

  // ✅ Toast 위치 계산
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

  // ✅ isFilterApplied: 전체가 아니면 true
  const isFilterApplied = selected !== 'all'

  /**
   * ✅ default.items -> baseList(ProductItem[])로 바인딩
   * - all 탭에서 사용하는 기본 리스트
   */
  const baseList: ProductItem[] = React.useMemo(() => {
    const items = data?.default?.items ?? []
    return items.map((p) => ({
      id: String(p.productId),
      name: p.name,
      brand: p.manufacturer,
      tags: p.ingredients,
      image: getProductImageById(p.productId), // ✅ CDN 대신 로컬 매핑
    }))
  }, [data])

  /**
   * ✅ 선택된 target 섹션 가져오기
   * - pregnant/teen/diet 탭에서 allowed/caution 목록을 화면에 뿌릴 때 사용
   */
  const currentTargetSection = React.useMemo<TargetSection | null>(() => {
    if (!data) return null
    if (!apiTarget) return null // all이면 섹션 기반 렌더링 안 함

    const key = DATAKEY_BY_TARGET[apiTarget]
    const section = data[key]
    if (!section) return null

    // 타입상 default도 들어올 수 있어서 안전하게 체크
    if ((section as TargetSection).allowed && (section as TargetSection).caution) {
      return section as TargetSection
    }
    return null
  }, [data, apiTarget])

  /**
   * ✅ target 섹션(allowed/caution) -> ProductItem[]로 변환 + status 주입
   */
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

  /**
   * ✅ 최종 리스트(filtered)
   * - all: baseList
   * - target 탭: targetList
   * 그리고 검색(q)은 둘 다 동일 기준으로 적용
   */
  const filtered: ProductItem[] = React.useMemo(() => {
    const keyword = q.trim()

    const source = selected === 'all' ? baseList : targetList

    if (keyword.length === 0) return source

    // 검색: 제조사/브랜드명 기준
    return source.filter((it) => it.brand.includes(keyword))
  }, [baseList, targetList, q, selected])

  // ✅ 결과 0이면 EmptyResult
  const shouldShowEmptyResult = !isLoading && !isError && filtered.length === 0

  // ✅ 더보기용 visibleItems
  const visibleItems = React.useMemo(() => {
    return filtered.slice(0, visibleCount)
  }, [filtered, visibleCount])

  // ✅ 필터/검색 결과 바뀌면 노출 개수 초기화
  React.useEffect(() => {
    setVisibleCount(LOAD_STEP)
  }, [selected, q, filtered.length])

  // ✅ EmptyResult 토스트 (원하면 제거 가능)
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

  // ✅ 더보기
  const handleLoadMore = () => {
    setIsIntakeOverlayOpen(true)
    setVisibleCount((prev) => Math.min(prev + LOAD_STEP, filtered.length))
    
  }

  React.useEffect(() => {
  console.log('=== UI STATE ===')
  console.log('selected:', selected)
  console.log('q:', q)
  console.log('filtered length:', filtered.length)
  console.log('first item:', filtered[0])
}, [selected, q, filtered])

  // ✅ early return은 훅들 다 호출된 뒤에!
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
                <ul className="flex flex-col items-start self-stretch w-full gap-[20px]">
                  {visibleItems.map((item) => (
                    <li key={item.id} className="w-full">
                      <ProductCard item={item} showStatus={isFilterApplied} />
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
