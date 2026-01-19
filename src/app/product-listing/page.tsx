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
      <div className="min-h-dvh bg-[var(--Color-gray-100,#EDF2F6)] md:bg-layer-week">
        {/* ✅ 데스크탑에서만 가운데 정렬 */}
        <div className="min-h-dvh flex md:justify-center">
          {/* ✅ 실제 "중앙에 놓일" 콘텐츠 컨테이너 */}
          <div className="w-full md:max-w-[1120px] md:mx-auto flex flex-col items-center md:items-stretch">
            <ProductListingTopBar />
            <ProductList category={category} target={target} />
          </div>
        </div>
      </div>
    </main>
  )
}
