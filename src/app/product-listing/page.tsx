// src/app/product-listing/page.tsx
import React from 'react'

import { ProductListingTopBarDesktop } from './_components/desktop/ProductListingTopBar.desktop'
import { ProductListDesktop } from './_components/desktop/ProductList.desktop'

import { ProductListMobile } from './_components/mobile/ProductList.mobile'
import ProductListingTopBarMobile from './_components/mobile/ProductListingTopBar.mobile'

export default function ProductListingPage() {
  return (
     
    <main 
    className="min-h-dvh">
      {/* ✅ Mobile: 피그마 프레임(375, min 375, max 739, center, column, bg) */}
      <div className="md:hidden min-h-dvh bg-[var(--Color-gray-100,#EDF2F6)]">
        <div
          className={[
            'mx-auto flex flex-col items-center',
            'min-h-dvh',
          ].join(' ')}
        >
          
          <ProductListingTopBarMobile />
          <ProductListMobile />
        </div>
      </div>

      {/* ✅ Desktop */}
      <div className="hidden md:block bg-layer-week min-h-dvh">
        <ProductListingTopBarDesktop />
        <ProductListDesktop />
      </div>
    </main>
  )
}
