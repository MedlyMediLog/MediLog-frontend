// src/app/(with-footer)/(with-sidebar)/products/_components/ProductListingTopBar.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import hambugi from '@/assets/hambugi.png'
import serviceLogo from '@/assets/product-listing/icons/icon-service-logo.svg'
import MobileSidebar from '@/app/_components/MobileSidebar'

export function ProductListingTopBar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile (375~739): A안 - 탑바가 패딩/정렬을 전부 책임 */}
      <header className="desktop:hidden w-full bg-[var(--Color-gray-100,#EDF2F6)]">
        <div className="h-[56px] px-[16px] flex items-center">
          <div className="relative w-full flex items-center justify-between">
            {/* 로고 (피그마: 80x30 + padding 5 23 5 0) */}
            <Link href="/" className="flex items-center" aria-label="홈으로">
              <div
                className="flex items-center"
                style={{ width: 80, height: 30, padding: '5px 23px 5px 0' }}
              >
                <Image src={serviceLogo} alt="서비스 로고" width={57} height={20} priority />
              </div>
            </Link>

            {/* 중앙 타이틀 */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <span className="typo-h5 text-fg-basic-accent">제품 목록</span>
            </div>

            {/* 햄버거 버튼 + 사이드바 (DetailHeader 방식으로 동작) */}
            <button
              type="button"
              aria-label="메뉴 열기"
              className="w-10 h-10 flex items-center justify-center rounded-[12px]"
              onClick={() => setOpen(true)}
            >
              <span className="relative w-[32px] h-[32px]">
                <Image src={hambugi} alt="" fill className="object-contain" priority />
              </span>
            </button>

            <MobileSidebar open={open} onClose={() => setOpen(false)} />
          </div>
        </div>
      </header>

      {/* Desktop (740~1380+): A안 - 탑바가 패딩/정렬을 전부 책임 */}
      <header className="hidden desktop:block w-full bg-layer-week">
        <div className="h-[64px] px-[20px] flex items-center">
          <Link href="/" className="flex items-center" aria-label="홈으로">
            <div
              className="flex items-center"
              style={{ width: 80, height: 30, padding: '5px 23px 5px 0' }}
            >
              <Image src={serviceLogo} alt="서비스 로고" width={57} height={20} priority />
            </div>
          </Link>
        </div>
      </header>
    </>
  )
}
