// src/app/product-listing/_components/mobile/ProductListingTopBar.mobile.tsx
'use client'

import React from 'react'
import Image from 'next/image'

import hamburgerIcon from '@/assets/product-listing/icons/mobile/icon-hamburger.svg'

export function ProductListingTopBarMobile() {
  return (
    <header className="w-full bg-layer-week">
      <div
        className={[
          // ✅ 상단바(피그마)
          // display:flex; height:56px; padding:16px; align-items:center; gap:120px; align-self:stretch;
          'relative flex items-center self-stretch',
          'h-[56px]',
          'p-[16px]',
          'gap-[120px]',
          'w-full',
        ].join(' ')}
      >
        {/* ✅ 왼쪽(피그마): flex / space-between / center / flex:1 0 0 */}
        <div className="flex flex-1 items-center justify-between">
          {/* ✅ 로고: 80x40 / gray-400 */}
          <div
            className="h-[40px] w-[80px] shrink-0 bg-[var(--color-gray-400)]"
            aria-label="로고"
          />

          {/* ✅ 페이지명(피그마): absolute left 106 / top 8 + H5 */}
          <h1 className="absolute left-[106px] top-[8px] text-center typo-h5 text-fg-basic-accent">
            눈 건강 제품
          </h1>
        </div>

        {/* ✅ 오른쪽(피그마): flex / align-items:flex-start / gap:8 */}
        <div className="flex items-start gap-[8px]">
          {/* ✅ 아이콘 버튼(피그마): 40x40 / padding 4 / 아이콘 32x32 */}
          <button
            type="button"
            aria-label="메뉴"
            className={[
              'flex',
              'h-[40px] w-[40px]',
              'items-center justify-center',
              'p-[4px]',
            ].join(' ')}
          >
            <Image
              src={hamburgerIcon}
              alt=""
              width={32}
              height={32}
              className="h-[32px] w-[32px] shrink-0"
            />
          </button>
        </div>
      </div>
    </header>
  )
}
