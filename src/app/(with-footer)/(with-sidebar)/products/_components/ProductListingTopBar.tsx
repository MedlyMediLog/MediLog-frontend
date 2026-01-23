// src/app/(with-footer)/(with-sidebar)/products/_components/ProductListingTopBar.tsx
import Image from 'next/image'
import hambugi from '@/assets/hambugi.png'
import serviceLogo from '@/assets/product-listing/icons/icon-service-logo.svg'

export function ProductListingTopBar() {
  return (
    <>
      {/* ✅ Mobile (375~739) */}
      <header className="desktop:hidden w-full bg-[var(--Color-gray-100,#EDF2F6)]">
        <div className="h-[56px] px-[16px] flex items-center">
          <div className="relative w-full flex items-center justify-between">
            {/* 로고 컨테이너(피그마: 80x30 + padding 5 23 5 0) */}
            <div className="flex items-center" style={{ width: 80, height: 30, padding: '5px 23px 5px 0' }}>
              <Image src={serviceLogo} alt="서비스 로고" width={57} height={20} priority />
            </div>

            {/* 중앙 타이틀 */}
            <div className="absolute left-1/2 -translate-x-1/2 typo-h5 text-fg-basic-accent">
              제품 목록
            </div>

            {/* 햄버거 버튼(피그마: 32x32) */}
            <button
              type="button"
              aria-label="메뉴 열기"
              className="w-[32px] h-[32px] flex items-center justify-center"
            >
              <span className="relative w-[32px] h-[32px]">
                <Image src={hambugi} alt="" fill className="object-contain" priority />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ✅ Desktop (740~1380+) */}
      <header className="hidden desktop:block w-full bg-layer-week">
        {/* ✅ 핵심: mx-auto/max-w로 가운데 정렬하지 않음 → 로고 x좌표 고정 */}
        <div className="h-[64px] px-[20px] flex items-center">
          <div className="flex items-center" style={{ width: 80, height: 30, padding: '5px 23px 5px 0' }}>
            <Image src={serviceLogo} alt="서비스 로고" width={57} height={20} priority />
          </div>
        </div>
      </header>
    </>
  )
}