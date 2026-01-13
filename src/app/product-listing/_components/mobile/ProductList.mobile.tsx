// src/app/product-listing/_compnents/mobile/ProductList.mobile.tsx
'use client'

import React from 'react'
import type { SelectedKey } from '../shared/types'
import { FilterBar, type FilterOption } from '@/app/_components/common/FilterBar'
import { EmptyResult } from '../shared/EmptyResult'
import TargetNotice from '../shared/TargetNotice'
import { getTargetMessage } from '../shared/policy'
import { useProductListing } from '../shared/useProductListing'
import { ProductCardMobile } from './ProductCard.mobile'
import styles from './ProductList.mobile.module.css'

const FILTER_OPTIONS: FilterOption[] = [
  { label: '전체', value: 'all' },
  { label: '임산부', value: 'pregnant' },
  { label: '청소년', value: 'teen' },
  { label: '다이어터', value: 'diet' },
]

export function ProductListMobile() {
  const { selected, setSelected, q, setQ, filtered, isFilterApplied, isEmpty } =
    useProductListing('all')

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
        {/* FilterBar는 공통컴포넌트 그대로 */}
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

        {isFilterApplied && (
          <div className="mt-[var(--Number-8,8px)] w-full">
            <TargetNotice message={getTargetMessage(selected)} />
          </div>
        )}

        <div className="mt-[var(--Number-16,16px)] w-full">
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
            <ul className={styles.cardList}>
              {filtered.map((item) => (
                <li key={item.id} className={styles.cardItem}>
                  <ProductCardMobile item={item} showStatus={isFilterApplied} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
