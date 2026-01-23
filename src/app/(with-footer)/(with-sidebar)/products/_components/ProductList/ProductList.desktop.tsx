// src/app/(with-footer)/(with-sidebar)/products/_components/ProductList/ProductList.desktop.tsx
'use client'

import React from 'react'

import type { SelectedKey, ProductItem } from '../shared/types'
import type { FilterOption } from '@/app/_components/common/FilterBar'

import { FilterBar } from '@/app/_components/common/FilterBar'
import { ErrorState } from '@/app/_components/common/ErrorState'
import { InfoMessage } from '@/app/_components/common/InfoMessage'
import { BasicTargetSummaryCard } from '../shared/BasicTargetSummaryCard/BasicTargetSummaryCard'
import { LoadMoreSection } from '../shared/LoadMoreSection/LoadMoreSection'
import { ScrollAwareBlock } from '../shared/ScrollAwareBlock/ScrollAwareBlock'

// 데스크탑 QueryResult
import { QueryResult as QueryResultDesktop } from '@/app/_components/common/QueryResult'

import ProductGridDesktop from '../ProductGrid.desktop'

type Props = {
  contentRef: React.RefObject<HTMLDivElement | null>

  // UI 상태
  isScrolling: boolean

  // 필터/검색
  options: FilterOption[]
  selected: SelectedKey
  q: string
  isFilterApplied: boolean
  targetMessage: string

  // 결과
  shouldShowEmptyResult: boolean
  filteredCount: number
  visibleItems: ProductItem[]
  visibleCount: number
  step: number

  // handlers
  onSelect: (v: string) => void
  onSearchChange: (v: string) => void
  onRefresh: () => void
  onLoadMore: () => void
  onResetEmpty: () => void
}

export function ProductListDesktop({
  contentRef,
  isScrolling,
  options,
  selected,
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
  onRefresh,
  onLoadMore,
  onResetEmpty,
}: Props) {
  return (
    <section className="hidden desktop:flex flex-col items-stretch w-full">
      <div
        ref={contentRef}
        className={['w-full', 'flex flex-col items-stretch', 'flex-1 self-stretch', 'pb-[120px]'].join(' ')}
      >
        <ScrollAwareBlock hidden={isScrolling} className="w-full">
          <div className="w-full flex flex-col items-start pt-0 pb-[20px]">
            <div className="w-full mb-[12px]">
              <BasicTargetSummaryCard withSlotPadding={false} />
            </div>

            <div className="w-full">
              <FilterBar
                variant="select"
                isSearching={false}
                options={options}
                selectedValue={selected}
                onSelect={onSelect}
                searchValue={q}
                onSearchChange={onSearchChange}
                onSearchSubmit={() => {}}
                searchPlaceholder="제조사/브랜드명으로 검색해보세요."
              />
            </div>

            <div className="w-full flex flex-wrap items-end content-end py-[10px] gap-y-[10px] rounded-[12px]">
              {isFilterApplied ? (
                <div className="min-w-0 flex-1 max-w-[485px] -my-[10px]">
                  <InfoMessage message={targetMessage} />
                </div>
              ) : (
                <div className="min-w-0 flex-1" />
              )}

              {!shouldShowEmptyResult && (
                <div className="ml-auto flex-shrink-0 -my-[10px]">
                  <QueryResultDesktop
                    count={filteredCount}
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
            // ✅ Desktop: 중앙 정렬 + 여백(푸터/하단 영역 고려)
            <div className="w-full flex justify-center  pb-[120px]">
              <ErrorState
                code="1XX errors"
                description={'입력하신 조건으로는 결과를 찾지 못했어요.\n다른 키워드로 다시 검색해보세요.'}
                actionLabel="다시 찾아보기"
                onAction={onResetEmpty}
              />
            </div>
          ) : (
            <>
              <ProductGridDesktop items={visibleItems} showStatus={isFilterApplied} />
              <LoadMoreSection total={filteredCount} visible={visibleCount} step={step} onLoadMore={onLoadMore} />
            </>
          )}
        </div>
      </div>
    </section>
  )
}
