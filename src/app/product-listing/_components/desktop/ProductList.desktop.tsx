'use client'

import React from 'react'
import ProductGridDesktop from './ProductGrid.desktop'
import type { SelectedKey } from '../shared/types'
import { FilterBar, type FilterOption } from '@/app/_components/common/FilterBar'
import { QueryResult } from '@/app/_components/common/QueryResult'
import { InfoMessage } from '@/app/_components/common/InfoMessage'
import { EmptyResult } from '../shared/EmptyResult'
import { getTargetMessage } from '../shared/policy'
import { useProductListing } from '../shared/useProductListing'

const FILTER_OPTIONS: FilterOption[] = [
  { label: '전체', value: 'all' },
  { label: '임산부', value: 'pregnant' },
  { label: '청소년', value: 'teen' },
  { label: '다이어터', value: 'diet' },
]

export function ProductListDesktop() {
  const {
    selected,
    setSelected,
    q,
    setQ,
    filtered,
    isFilterApplied,
    isEmpty,
    onRefresh,
  } = useProductListing('diet') // ✅ 기존처럼 diet 기본값 유지

  return (
    <section
      className={[
        'flex flex-col items-center',
        'w-full max-w-[1300px]',
        'flex-1 self-stretch',
        'px-[20px] pb-[120px]',
      ].join(' ')}
    >
      <div className="w-full flex items-center gap-[10px] py-[17px]">
        <h1 className="text-fg-basic-accent typo-d2">
          ‘눈 건강’ 제품 정보 한눈에 보기
        </h1>
      </div>

      <div className="w-full flex flex-col items-start pt-0 pb-[60px]">
        <div className="w-full">
          <FilterBar
            variant="select"
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

          <div className="ml-auto flex-shrink-0 -my-[10px]">
            <QueryResult
              count={filtered.length}
              showRefresh
              onRefresh={onRefresh}
              label="조회 결과"
              unit="개"
            />
          </div>
        </div>

        <div className="w-full">
          {isEmpty ? (
            <EmptyResult
              title="1XX errors"
              message={'에러 문구 출력 자리.\n문장이 두개 일시 엔터로!'}
              buttonText="다시 찾아보기"
              onClick={() => {
                setQ('')
                setSelected('all')
              }}
            />
          ) : (
            <ProductGridDesktop items={filtered} showStatus={isFilterApplied} />
          )}
        </div>
      </div>
    </section>
  )
}
