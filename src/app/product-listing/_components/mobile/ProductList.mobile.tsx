// src/app/product-listing/_components/mobile/ProductList.mobile.tsx
'use client'

import React from 'react'
import type { SelectedKey } from '../shared/types'
import { FilterBar, type FilterOption } from '@/app/_components/common/FilterBar'
import { EmptyResult } from '../shared/EmptyResult'
import { getTargetMessage } from '../shared/policy'
import { useProductListing } from '../shared/useProductListing'
import { ProductCardMobile } from './ProductCard.mobile'
import styles from './ProductList.mobile.module.css'

import { InfoMessage } from '@/app/_components/common/InfoMessage/InfoMessage'
import { QueryResult } from '@/app/_components/common/QueryResult/QueryResult'

const FILTER_OPTIONS: FilterOption[] = [
  { label: '전체', value: 'all' },
  { label: '임산부', value: 'pregnant' },
  { label: '청소년', value: 'teen' },
  { label: '다이어터', value: 'diet' },
]

export function ProductListMobile() {
  const { selected, setSelected, q, setQ, filtered, isFilterApplied, isEmpty } =
    useProductListing('all')

  const count = filtered.length

  return (
    <section className="w-full">
      <div
        className={[
          'mx-auto w-full max-w-[1300px]',
          'flex flex-col items-start self-stretch',
          'px-[var(--Number-20,20px)]',
          'pb-[60px]',
        ].join(' ')}
      >
        {/* ✅ 필터바 */}
        <FilterBar
          variant="mobile"
          options={FILTER_OPTIONS}
          selectedValue={selected}
          onSelect={(v) => setSelected(v as SelectedKey)}
          searchValue={q}
          onSearchChange={setQ}
          onSearchSubmit={() => {}}
          searchPlaceholder="제조사/브랜드명으로 검색해보세요."
        />

        {/* ✅ 안내 문구 */}
        {isFilterApplied && (
          <div className="mt-[var(--Number-8,8px)] w-full">
            <InfoMessage
              message={getTargetMessage(selected)}
              minHeight={0}
              className={['bg-transparent', 'p-0', 'rounded-none'].join(' ')}
            />
          </div>
        )}

        {/* ✅ 여기 mt-16이 “안내문구”와 “조회결과”를 벌려서 문제였음 */}
        <div
          className={[
            'w-full',
            // ✅ 안내문구가 있을 땐 바로 붙게(=0), 없을 땐 필터바와 리스트 사이 여백 유지(=16)
            isFilterApplied ? 'mt-0' : 'mt-[var(--Number-16,16px)]',
          ].join(' ')}
        >
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
            <>
              {/* ✅ 조회 결과 */}
              <div
                className={[
                  'w-full',
                  'flex items-center justify-end',
                  'pt-0 pb-[10px]',
                  'rounded-[var(--Number-gap-12,12px)]',
                ].join(' ')}
              >
                <QueryResult
                  count={count}
                  label="조회 결과"
                  unit="개"
                  onRefresh={() => {}}
                />
              </div>

              {/* ✅ 카드 리스트 */}
              <ul className={styles.cardList}>
                {filtered.map((item) => (
                  <li key={item.id} className={styles.cardItem}>
                    <ProductCardMobile item={item} showStatus={isFilterApplied} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
