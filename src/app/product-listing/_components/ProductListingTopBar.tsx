//src/app/product-listing/_components/Product
'use client'

import React from 'react'

export function ProductListingTopBar() {
  return (
    // ✅ 상단바(전체 폭 배경)
    <header className="w-full bg-layer-week">
      {/* ❌ mx-auto 제거: 사이드바 바로 옆부터 시작해야 해서 가운데 정렬 금지 */}
      <div className="w-full max-w-[1300px]">
        {/* ✅ 상단바: padding 16 20 / gap 120 */}
        <div className="flex items-center gap-[120px] px-5 py-4">
          {/* ✅ 로고: 80x40 / gray-400 */}
          <div
            className="h-10 w-20 shrink-0 bg-[var(--Color-gray-400,#A2ACB7)]"
            aria-label="로고"
          />
        </div>
      </div>
    </header>
  )
}
