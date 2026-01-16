// src/app/product-listing/_components/ProductList.tsx
'use client'

import React from 'react'
import type { SelectedKey } from './shared/types'
import { useProductListing } from './shared/useProductListing'
import { getTargetMessage } from './shared/policy'

import { FilterBar, type FilterOption } from '@/app/_components/common/FilterBar'
import { EmptyResult } from './shared/EmptyResult'
import TargetNotice from './shared/TargetNotice'
import { InfoMessage } from '@/app/_components/common/InfoMessage'
import { IntakeInfoOverlay } from './shared/IntakeInfoOverlay/IntakeInfoOverlay'

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

const FILTER_OPTIONS: FilterOption[] = [
  { label: '전체', value: 'all' },
  { label: '임산부', value: 'pregnant' },
  { label: '청소년', value: 'teen' },
  { label: '다이어터', value: 'diet' },
]

const LOAD_STEP = 20

export function ProductList() {
  const {
    selected,
    setSelected,
    q,
    setQ,
    filtered,
    isFilterApplied,
    shouldShowEmptyResult,
    onRefresh,
  } = useProductListing('all')

  /** ✅ FilterBarProps에서 isSearching이 필수라서 상태를 유지 */
  const [isSearching, setIsSearching] = React.useState(false)

  /** ✅ 더보기: 현재 노출 개수 (모바일/데스크탑 공통) */
  const [visibleCount, setVisibleCount] = React.useState(LOAD_STEP)

  /** ✅ 스크롤 상태(스크롤 중 숨김용) */
  const [isScrolling, setIsScrolling] = React.useState(false)

  /** ✅ 플로팅 버튼 노출 여부 */
  const [showTopButton, setShowTopButton] = React.useState(false)

  /** ✅ Toast 상태 (공통 타입 사용) */
  const [toast, setToast] = React.useState<CommonToastItem | null>(null)

  /** ✅ (모바일) 섭취 정보 오버레이 팝업 상태 */
  const [isIntakeOverlayOpen, setIsIntakeOverlayOpen] = React.useState(false)

  /**
   * ✅ "사이드바 제외 컨텐츠 영역" 기준 중앙 정렬을 위한 좌표
   * - Mobile/Desk 각각 DOM이 다르므로 ref를 분리해서 안전하게 처리
   */
  const mobileContentRef = React.useRef<HTMLDivElement | null>(null)
  const desktopContentRef = React.useRef<HTMLDivElement | null>(null)
  const [toastLeft, setToastLeft] = React.useState<number | null>(null)

  /** ✅ 화면에 보여줄 아이템 */
  const visibleItems = filtered.slice(0, visibleCount)

  /** ✅ 필터/검색 결과 바뀌면 노출 개수 초기화 */
  React.useEffect(() => {
    setVisibleCount(LOAD_STEP)
  }, [selected, q, filtered.length])

  /**
   * ✅ 스크롤 요구사항 구현
   * - 최상단이면 버튼 숨김
   * - 어느 정도 내려가면 버튼 표시
   * - 스크롤 중엔 상단 UI 숨김
   * - 스크롤 멈추면 다시 나타남
   */
  React.useEffect(() => {
    let stopTimer: number | null = null

    const onScroll = () => {
      const y = window.scrollY
      setShowTopButton(y > 240)

      setIsScrolling(true)

      if (stopTimer) window.clearTimeout(stopTimer)
      stopTimer = window.setTimeout(() => {
        setIsScrolling(false)
      }, 160)
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

  /**
   * ✅ Toast 위치 계산
   */
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

  /**
   * ✅ “검색/필터 결과 0개(EmptyResult 노출)”일 때 토스트도 띄우고 싶으면 유지
   * - EmptyResult 화면이 이미 뜨니, 토스트는 UX상 과하면 삭제해도 됨
   */
  const toastKey = `${selected}__${q}__${shouldShowEmptyResult}__${isFilterApplied}`
  const prevToastKeyRef = React.useRef<string | null>(null)

  React.useEffect(() => {
    // EmptyResult가 뜰 때만 토스트도 띄움 (원하면 이 블록 제거)
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

  /** ✅ (공통) 더보기 핸들러: "팝업 + 더보기"를 ProductList에서 조합 */
  const handleLoadMore = () => {
    // ✅ 기획: 4번 클릭 시 팝업 (모바일에서만)
    setIsIntakeOverlayOpen(true)

    // ✅ 기존 더보기 동작 유지
    setVisibleCount((prev) => Math.min(prev + LOAD_STEP, filtered.length))
  }

  return (
    <>
      {/* ✅ 플로팅 최상단 버튼 (모바일/데스크탑 공통) */}
      <FloatingTopButton visible={showTopButton} onClick={handleScrollToTop} />

      {/* ✅ 공통 Toast (사이드바 제외 컨텐츠 영역 기준 중앙 / 하단 170px) */}
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
        {/* ✅ 모바일에서만 렌더링되는 섭취 정보 오버레이 */}
        <IntakeInfoOverlay
          open={isIntakeOverlayOpen}
          onClose={() => setIsIntakeOverlayOpen(false)}
        />

        <div
          ref={mobileContentRef}
          className={[
            // ✅ 모바일은 max-width 제한을 두면 "데스크탑 축소판"처럼 보일 수 있음
            'w-full',
            'flex flex-col items-start self-stretch',
            'px-[20px]',
            'pb-[60px]',
          ].join(' ')}
        >
          {/* ✅ 스크롤 중에 숨길 상단 UI 묶음 */}
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
              onIconClick={() => {
                setIsSearching(true)
              }}
            />

            {isFilterApplied && (
              <div className="mt-[8px] w-full">
                <TargetNotice message={getTargetMessage(selected)} />
              </div>
            )}

            {/* ✅ 결과가 있을 때만 QueryResult 노출 */}
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

                <LoadMoreSection
                  total={filtered.length}
                  visible={visibleCount}
                  step={LOAD_STEP}
                  onLoadMore={handleLoadMore}
                />
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
          {/* ✅ 스크롤 중에 숨길 상단 UI 묶음 */}
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

                {/* ✅ 결과가 있을 때만 QueryResult 노출 */}
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

                {/* ✅ PC는 기획상 오버레이 제외 → 더보기는 기존대로 */}
                <LoadMoreSection
                  total={filtered.length}
                  visible={visibleCount}
                  step={LOAD_STEP}
                  onLoadMore={() => {
                    setVisibleCount((prev) =>
                      Math.min(prev + LOAD_STEP, filtered.length),
                    )
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
