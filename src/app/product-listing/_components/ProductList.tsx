// src/app/product-listing/_components/ProductList.tsx
'use client'

import React from 'react'
import ProductGrid from './ProductGrid'
import type { ProductItem, ProductStatus } from './types'
import { FilterBar, type FilterOption } from '@/app/_components/common/FilterBar'
import { QueryResult } from '@/app/_components/common/QueryResult'
import { InfoMessage } from '@/app/_components/common/InfoMessage'
import { EmptyResult } from './EmptyResult'
import type { ProductListResponse } from '@/types/product'

import bottleCapsules from '@/assets/product-listing/mock/bottle-capsules.png'
import bottleTablets from '@/assets/product-listing/mock/bottle-tablets.png'
import boxStick from '@/assets/product-listing/mock/box-stick.png'
import dropper from '@/assets/product-listing/mock/dropper.png'

type TargetKey = 'pregnant' | 'teen' | 'diet'
type SelectedKey = 'all' | TargetKey

const FILTER_OPTIONS: FilterOption[] = [
  { label: '전체', value: 'all' },
  { label: '임산부', value: 'pregnant' },
  { label: '청소년', value: 'teen' },
  { label: '다이어터', value: 'diet' },
]

type ProductItemWithMeta = ProductItem & {
  targets: TargetKey[]
  status: ProductStatus
}

type Props = {
  data: ProductListResponse
}

/**
 * ✅ 확인용 mock
 * - "diet" 필터를 선택했을 때 결과가 0건이 되도록:
 *   diet가 들어간 상품들을 전부 '섭취 금지'로 두고,
 *   아래 withoutForbidden 필터에서 제거되게 함.
 */
const mockProducts: ProductItemWithMeta[] = [
  {
    id: '1',
    brand: '종근당건강',
    name: '아이클리어 루테인 지아잔틴',
    tags: ['루테인', '지아잔틴', '비타민A'],
    image: bottleCapsules,
    targets: ['teen', 'diet'],
    status: '섭취 금지',
  },
  {
    id: '2',
    brand: '고려은단',
    name: '비타민C 1000',
    tags: ['비타민C', '아연'],
    image: bottleTablets,
    targets: ['pregnant', 'teen', 'diet'],
    status: '섭취 금지',
  },
  {
    id: '3',
    brand: '센트룸',
    name: '멀티비타민',
    tags: ['비타민D', '비타민B군'],
    image: boxStick,
    targets: ['diet'],
    status: '섭취 금지',
  },
  {
    id: '4',
    brand: '뉴트리원',
    name: '알티지 오메가3',
    tags: ['오메가3', 'EPA/DHA', '비타민E'],
    image: dropper,
    targets: ['pregnant'],
    status: '섭취 금지',
  },
  {
    id: '5',
    brand: 'GNC',
    name: '루테인 20mg',
    tags: ['루테인', '비타민A'],
    targets: ['teen', 'diet'],
    status: '섭취 금지',
  },
  {
    id: '6',
    brand: '솔가(Solgar)',
    name: '비타민 D3 1000 IU',
    tags: ['비타민D'],
    targets: ['pregnant', 'diet'],
    status: '섭취 금지',
  },
  {
    id: '7',
    brand: '네이처메이드',
    name: '징코 빌로바',
    tags: ['은행잎추출물', '비타민E', '아연'],
    targets: ['teen'],
    status: '섭취 고려',
  },
  {
    id: '8',
    brand: '일양약품',
    name: '루테인 골드',
    tags: ['루테인', '아연'],
    targets: ['pregnant', 'teen'],
    status: '주의사항',
  },
]

const STATUS_ORDER: Record<ProductStatus, number> = {
  '섭취 가능': 0,
  '섭취 고려': 1,
  주의사항: 2,
  '섭취 금지': 3,
}

function sortByPolicy(items: ProductItemWithMeta[], isFilterApplied: boolean) {
  const next = [...items]

  if (isFilterApplied) {
    next.sort((a, b) => {
      const sa = STATUS_ORDER[a.status] ?? 999
      const sb = STATUS_ORDER[b.status] ?? 999
      if (sa !== sb) return sa - sb
      return a.name.localeCompare(b.name, 'ko')
    })
    return next
  }

  next.sort((a, b) => a.name.localeCompare(b.name, 'ko'))
  return next
}

function getTargetMessage(selected: SelectedKey) {
  if (selected === 'pregnant') return '강한 주의가 언급된 제품은 결과에서 제외했어요.'
  if (selected === 'teen') return '강한 주의가 언급된 제품은 결과에서 제외했어요.'
  if (selected === 'diet') return '강한 주의가 언급된 제품은 결과에서 제외했어요.'
  return ''
}

export function ProductList({ data }: Props) {
  // ✅ 바로 빈 상태 확인하도록 기본값 diet
  const [selected, setSelected] = React.useState<SelectedKey>('diet')
  const [q, setQ] = React.useState('')

  const [refreshKey, setRefreshKey] = React.useState(0)
  const handleRefresh = React.useCallback(() => {
    console.log('[ProductList] refresh')
    setRefreshKey((v) => v + 1)
  }, [])

  const { items, allowed, caution, target } = data

  const filtered = React.useMemo(() => {
    const isFilterApplied = selected !== 'all'

    let byTarget = mockProducts
    if (isFilterApplied) {
      byTarget = mockProducts.filter((p) => p.targets.includes(selected))
    }

    // ✅ 금지 제외(설계서 규칙)
    const withoutForbidden = byTarget.filter((p) => p.status !== '섭취 금지')

    const keyword = q.trim().toLowerCase()
    const searched =
      keyword.length === 0
        ? withoutForbidden
        : withoutForbidden.filter((p) => p.brand.toLowerCase().includes(keyword))

    return sortByPolicy(searched, isFilterApplied)
  }, [selected, q, refreshKey])

  const isFilterApplied = selected !== 'all'
  const isEmpty = isFilterApplied && filtered.length === 0

  return (
    /**
     * ✅ 컨텐츠영역 (피그마)
     * display:flex;
     * max-width:1300px;
     * padding: 0 20px 120px 20px;
     * flex-direction:column;
     * align-items:center;
     * flex:1 0 0;
     * align-self:stretch;
     *
     * - mx-auto는 “사이드바 옆에 딱 붙이는 레이아웃”에서 간섭될 수 있어서 제거 유지
     * - 대신 section이 stretch + max-width를 가지도록 구성
     */
    <section
      className={[
        'flex flex-col items-center',
        'w-full max-w-[1300px]',
        'flex-1 self-stretch',
        'px-[20px] pb-[120px]',
      ].join(' ')}
    >
      {/* ✅ 타이틀 영역은 내부에서 w-full로 좌측 정렬 */}
      <div className="w-full flex items-center gap-[10px] py-[17px]">
        <h1
          className={[
            'text-[#3D3D3D]',
            'font-bold',
            'text-[44px]',
            'leading-[66px]',
            'tracking-[-0.88px]',
          ].join(' ')}
        >
          ‘눈 건강’ 제품 정보 한눈에 보기
        </h1>
      </div>

      {/* ✅ 본문 */}
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

        {/* ✅ 요약 배너/조회결과 라인 */}
        <div
          className={[
            'w-full',
            'flex flex-wrap',
            'items-end content-end',
            'py-[10px]',
            'gap-y-[10px]',
            'rounded-[12px]',
          ].join(' ')}
        >
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
              onRefresh={handleRefresh}
              label="조회 결과"
              unit="개"
            />
          </div>
        </div>

        {/* ✅ 결과 영역: EmptyResult ↔ Grid 스위칭 */}
        <div className="w-full">
          {isEmpty ? (
            <EmptyResult
              title="1XX errors"
              // ✅ 줄바꿈이 필요하니 \n 유지 (컴포넌트에서 whitespace-pre-line 처리)
              message={'에러 문구 출력 자리.\n문장이 두개 일시 엔터로!'}
              buttonText="다시 찾아보기"
              onClick={() => {
                // “다시 찾아보기”의 가장 직관적인 동작: 검색/필터 초기화
                setQ('')
                setSelected('all')
              }}
            />
          ) : (
            <ProductGrid items={filtered} showStatus={isFilterApplied} />
          )}
        </div>
      </div>
    </section>
  )
}
