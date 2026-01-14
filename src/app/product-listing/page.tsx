// src/app/product-listing/page.tsx
import React from 'react'
import { ProductList } from './_components/ProductList'
import { ProductListingTopBar } from './_components/ProductListingTopBar'
import { getProducts } from '@/lib/api/products'
import { CATEGORY_MAP } from '../category/_components/category.constants'
import type { Target } from '@/types/product'
import { headers } from 'next/headers'

type Props = {
  searchParams: Promise<{
    category?: string
    target?: string
  }>
}

export default async function ProductListingPage({ searchParams }: Props) {
  const { category: rawCategory, target: rawTarget } = await searchParams

  console.log('카테고리', rawCategory)

  if (!rawCategory) {
    throw new Error('category is required')
  }

  const category = CATEGORY_MAP[rawCategory as keyof typeof CATEGORY_MAP]
  const target = rawTarget?.toUpperCase() as Target | undefined

  if (!category) {
    throw new Error(`Invalid category: ${rawCategory}`)
  }

  return (
    // ✅ 컨텐츠 영역 bg-layer-week
    <main className="min-h-dvh bg-layer-week">
      {/* ✅ 상단바 */}
      <ProductListingTopBar />

      {/* ✅ 본문 */}
      <ProductList category={category} target={target} />
    </main>
  )
}
