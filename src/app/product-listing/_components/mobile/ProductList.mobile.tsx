// src/app/product-listing/_components/mobile/ProductList.mobile.tsx
'use client'

import React from 'react'
import type { SelectedKey } from '../shared/types'
import { FilterBar, type FilterOption } from '@/app/_components/common/FilterBar'
import { EmptyResult } from '../shared/EmptyResult'
import TargetNotice from '../shared/TargetNotice'
import { getTargetMessage } from '../shared/policy'
import { useProductListing } from '../shared/useProductListing'
import { ProductCardMobile } from './ProductCard.mobile'
import { QueryResult } from '@/app/_components/common/QueryResult/QueryResult'

/** ✅ 신규: 기본&대상 요약카드 */
import { BasicTargetSummaryCard } from '../shared/BasicTargetSummaryCard/BasicTargetSummaryCard'

/** ✅ 신규: 제품 더보기 영역 */
import { LoadMoreSection } from '../shared/LoadMoreSection/LoadMoreSection'

const FILTER_OPTIONS: FilterOption[] = [
  { label: '전체', value: 'all' },
  { label: '임산부', value: 'pregnant' },
  { label: '청소년', value: 'teen' },
  { label: '다이어터', value: 'diet' },
]

const LOAD_STEP = 20

export function ProductListMobile() {
  const { selected, setSelected, q, setQ, filtered, isFilterApplied, isEmpty } =
    useProductListing('all')

  // ✅ 모바일 돋보기 클릭 → searching 전환 상태
  const [isSearching, setIsSearching] = React.useState(false)

  // ✅ 더보기: 현재 노출 개수
  const [visibleCount, setVisibleCount] = React.useState(LOAD_STEP)

  // ✅ 필터/검색 결과가 바뀌면(= filtered가 달라지면) 노출 개수도 초기화
  React.useEffect(() => {
    setVisibleCount(LOAD_STEP)
  }, [selected, q, filtered.length])

  const visibleItems = filtered.slice(0, visibleCount)

  return (
    <section className="w-full">
      <div
        className={[
          'mx-auto w-full max-w-[1300px]',
          'flex flex-col items-start self-stretch',
          'px-[20px]',
          'pb-[60px]', // ✅ 피그마 하단 여백(footer 위 공간)
        ].join(' ')}
      >
        {/* ✅ Topbar와 FilterBar 사이(피그마 1번 위치): 기본&대상 요약카드 */}
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
          onSearchSubmit={() => {
            // 필요하면 여기서 검색 실행 트리거
          }}
          searchPlaceholder="제조사/브랜드명으로 검색해보세요."
          onIconClick={() => setIsSearching(true)}
          onCloseSearching={() => setIsSearching(false)}
        />

        {isFilterApplied && (
          <div className="mt-[8px] w-full">
            <TargetNotice message={getTargetMessage(selected)} />
          </div>
        )}

        <div className="mt-[16px] w-full">
          {isEmpty ? (
            <EmptyResult
              title="1XX errors"
              message={'에러 문구 출력 자리.\n문장이 두개 일시 엔터로!'}
              buttonText="다시 찾아보기"
              onClick={() => {
                setQ('')
                setSelected('all')
                setIsSearching(false)
              }}
            />
          ) : (
            <>
              {/* ✅ QueryResult: 사진처럼 오른쪽 정렬 */}
              <div className="w-full flex justify-end">
                <QueryResult
                  count={filtered.length}
                  onRefresh={() => {
                    // 필요하면 refresh 추가
                  }}
                />
              </div>

              {/* ✅ 제품 카드 목록 (피그마: 카드 간격 20) */}
              <ul className="flex flex-col items-start self-stretch w-full gap-[20px]">
                {visibleItems.map((item) => (
                  <li key={item.id} className="w-full">
                    <ProductCardMobile item={item} showStatus={isFilterApplied} />
                  </li>
                ))}
              </ul>

              {/* ✅ 제품 더보기 영역(피그마 4번) - 컨텐츠 영역 안에 포함 */}
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
  )
}
