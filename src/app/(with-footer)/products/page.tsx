// src/app/product-listing/page.tsx
import React from 'react'
import { ProductListingTopBar } from './_components/ProductListingTopBar'
import { ProductList } from './_components/ProductList'
import { CATEGORY_MAP } from '../category/_components/category.constants'
import { Target } from '@/types/product'

type Props = {
  searchParams: Promise<{
    category?: string
    target?: string
  }>
}

export default async function ProductListingPage({ searchParams }: Props) {
  const { category: rawCategory, target: rawTarget } = await searchParams

  if (!rawCategory) {
    throw new Error('category is required')
  }

  const category = CATEGORY_MAP[rawCategory as keyof typeof CATEGORY_MAP]
  const target = rawTarget?.toUpperCase() as Target | undefined

  if (!category) {
    throw new Error(`Invalid category: ${rawCategory}`)
  }

  return (
    <main className="min-h-dvh">
      {/* 배경 레이어 */}
      <div className="min-h-dvh bg-[var(--Color-gray-100,#EDF2F6)] desktop:bg-layer-week">
        {/* ✅ 전체를 가운데 정렬 (모바일은 full, 데스크탑은 center) */}
        <div className="min-h-dvh flex justify-center">
          {/* ✅ 공통 컨테이너: 모든 섹션의 '시작선'을 통일 */}
          <div
            className={[
              'w-full',
              // 모바일~: 좌우 여백(피그마 slot 느낌)
              'px-[20px]',
              'pt-[10px]',
              // desktop(>=740): 더 넓게 + 위 여백 조정
              'desktop:px-[20px]',
              'desktop:pt-[20px]',
              // ✅ 740~1380+ 반응형 핵심: 1300까지 넓어짐
              'desktop:max-w-[1300px]',
              // 내부 정렬
              'flex',
              'flex-col',
              'items-stretch',
            ].join(' ')}
          >
            <ProductListingTopBar />
            <ProductList category={category} target={target} />
          </div>
        </div>
      </div>
    </main>
  )
}