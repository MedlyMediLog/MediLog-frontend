// src/app/(with-footer)/(with-sidebar)/products/_components/ProductList/ProductList.mobile.tsx
'use client'

import React from 'react'
import Link from 'next/link'

import type { SelectedKey, ProductItem } from '../shared/types'
import type { FilterOption } from '@/app/_components/common/FilterBar'

import { FilterBar } from '@/app/_components/common/FilterBar'
import { ErrorState } from '@/app/_components/common/ErrorState'
import TargetNotice from '../shared/TargetNotice'
import { IntakeInfoOverlay } from '../shared/IntakeInfoOverlay/IntakeInfoOverlay'
import { BasicTargetSummaryCard } from '../shared/BasicTargetSummaryCard/BasicTargetSummaryCard'
import { LoadMoreSection } from '../shared/LoadMoreSection/LoadMoreSection'
import { ScrollAwareBlock } from '../shared/ScrollAwareBlock/ScrollAwareBlock'

import { QueryResult as QueryResultMobile } from '@/app/_components/common/QueryResult/QueryResult'
import { ProductCard } from '../ProductCard'
import LoadingSpinner from '@/app/_components/common/LoadingSpinner'
import { FloatingTopButton } from '../shared/FloatingTopButton/FloatingTopButton'

type Props = {
  visible: boolean
  onClick: () => void
  contentRef: React.RefObject<HTMLDivElement | null>

  isScrolling: boolean
  isSearching: boolean
  isIntakeOverlayOpen: boolean

  options: FilterOption[]
  selected: SelectedKey
  isLoading: boolean
  q: string
  isFilterApplied: boolean
  targetMessage: string

  shouldShowEmptyResult: boolean
  filteredCount: number
  visibleItems: ProductItem[]
  visibleCount: number
  step: number

  onSelect: (v: string) => void
  onSearchChange: (v: string) => void
  onSearchOpen: () => void
  onSearchSubmit: () => void
  onRefresh: () => void
  onLoadMore: () => void
  onResetEmpty: () => void
  onCloseIntakeOverlay: () => void
}

export function ProductListMobile({
  visible,
  onClick,
  contentRef,
  isScrolling,
  isSearching, // (호환용) 현재 오버레이 방식에서는 사용 안 함
  isIntakeOverlayOpen,
  options,
  selected,
  isLoading,
  q,
  isFilterApplied,
  targetMessage,
  shouldShowEmptyResult,
  filteredCount,
  visibleItems,
  visibleCount,
  step,
  onSelect,
  onSearchChange,
  onSearchOpen,
  onSearchSubmit,
  onRefresh,
  onLoadMore,
  onResetEmpty,
  onCloseIntakeOverlay,
}: Props) {
  return (
    <section className="desktop:hidden w-full">
      <IntakeInfoOverlay open={isIntakeOverlayOpen} onClose={onCloseIntakeOverlay} />

      <div
        ref={contentRef}
        className={['w-full', 'flex flex-col items-start self-stretch', 'pb-[60px]'].join(' ')}
      >
        {/* TargetSummaryCard만 스크롤 시 숨김 */}
        <ScrollAwareBlock hidden={isScrolling} className="w-full">
          <div className="w-full mb-[12px]">
            <BasicTargetSummaryCard withSlotPadding={false} />
          </div>
        </ScrollAwareBlock>

        <div className="w-full">
          {/* 기본 모바일 UI(아이콘 + 칩)만 노출 */}
          <FilterBar
            variant="mobile"
            isSearching={false}
            hideOptionsWhenSearching={false}
            options={options}
            selectedValue={selected}
            onSelect={onSelect}
            searchValue={q}
            onSearchChange={onSearchChange}
            onSearchSubmit={onSearchSubmit}
            searchPlaceholder="제조사/브랜드명으로 검색해보세요."
            onIconClick={onSearchOpen} // 아이콘 클릭 => 오버레이 오픈
          />
        </div>

        {isFilterApplied && (
          <div className="mt-[8px] w-full">
            <TargetNotice message={targetMessage} />
          </div>
        )}

        {!shouldShowEmptyResult && (
          <div className="mt-[16px] w-full flex justify-end">
            <QueryResultMobile count={filteredCount} onRefresh={onRefresh} />
          </div>
        )}

        <div className="mt-[16px] w-full">
          {isLoading ? (
            <LoadingSpinner />
          ) : shouldShowEmptyResult ? (
            <div className="w-full flex justify-center pb-[120px]">
              <ErrorState
                code="1XX errors"
                description={
                  '입력하신 조건으로는 결과를 찾지 못했어요.\n다른 키워드로 다시 검색해보세요.'
                }
                actionLabel="다시 찾아보기"
                onAction={onResetEmpty}
              />
            </div>
          ) : (
            <>
              <div className="relative">
                <ul className="flex flex-col items-start self-stretch w-full gap-[20px]">
                  {visibleItems.map((item) => (
                    <li key={item.id} className="w-full">
                      <Link
                        href={`/products/${item.id}`}
                        className="block"
                        aria-label={`${item.name} 상세로 이동`}
                      >
                        <ProductCard item={item} showStatus={isFilterApplied} layout="mobile" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <FloatingTopButton visible={visible} onClick={onClick} />
          
              </div>

              <LoadMoreSection
                total={filteredCount}
                visible={visibleCount}
                step={step}
                onLoadMore={onLoadMore}
              />
            </>
          )}
        </div>
      </div>
    </section>
  )
}
