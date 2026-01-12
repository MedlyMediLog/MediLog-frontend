// src/app/product-listing/page.tsx
import React from 'react'
import { ProductList } from './_components/ProductList'
import { ProductListingTopBar } from './_components/ProductListingTopBar'

export default function ProductListingPage() {
  return (
    // ✅ 컨텐츠 영역 bg-layer-week
    <main className="min-h-dvh bg-layer-week">
      {/* ✅ 상단바 */}
      <ProductListingTopBar />

      {/* ✅ 본문 */}
      <ProductList />
    </main>
  )
}
