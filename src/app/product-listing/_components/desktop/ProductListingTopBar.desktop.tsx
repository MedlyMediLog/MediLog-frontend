'use client'

import React from 'react'

export function ProductListingTopBarDesktop() {
  return (
    <header className="w-full bg-layer-week">
      <div className="w-full max-w-[1300px]">
        <div className="flex items-center gap-[120px] px-5 py-4">
          <div
            className="h-10 w-20 shrink-0 bg-[var(--gray-400)]"
            aria-label="로고"
          />
        </div>
      </div>
    </header>
  )
}
