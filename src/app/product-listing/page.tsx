// src/app/product-listing/page.tsx
import React from 'react'
import { ProductListingTopBar } from './_components/ProductListingTopBar'
import { ProductList } from './_components/ProductList'

export default function ProductListingPage() {
  return (
    <main className="min-h-dvh">
      {/* Mobile */}
      <div className="md:hidden min-h-dvh bg-[var(--Color-gray-100,#EDF2F6)]">
        <div className="mx-auto flex flex-col items-center min-h-dvh">
          <ProductListingTopBar />
          <ProductList />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block flex justify-center bg-layer-week min-h-dvh">
        <ProductListingTopBar />
        <ProductList />
      </div>
    </main>
  )
}
