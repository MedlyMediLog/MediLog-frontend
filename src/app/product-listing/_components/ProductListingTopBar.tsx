// src/app/product-listing/_components/ProductListingTopBar.tsx
import Image from 'next/image'
import hambugi from '@/assets/hambugi.png'

// ✅ 서비스 로고
import serviceLogo from '@/assets/product-listing/icons/icon-service-logo.svg'

export function ProductListingTopBar() {
  return (
    <>
      {/* ✅ Mobile */}
      <header className="md:hidden w-full bg-[#edf2f6]">
        <div className="h-[56px] px-[16px] flex items-center">
          <div className="relative w-full flex items-center justify-between">
            {/* ✅ 로고 컨테이너(피그마: 80x30 + padding 5 23 5 0) */}
            <div
              className="flex items-center"
              style={{ width: 80, height: 30, padding: '5px 23px 5px 0' }}
            >
              {/* ✅ 실제 로고 SVG(피그마: 57x20) */}
              <Image
                src={serviceLogo}
                alt="서비스 로고"
                width={57}
                height={20}
                priority
              />
            </div>

            {/* ✅ 중앙 타이틀 */}
            <div className="absolute left-1/2 -translate-x-1/2 typo-h5">
              제품 목록
            </div>

            {/* ✅ 햄버거 버튼(피그마: 32x32) */}
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

      {/* ✅ Desktop */}
      <header className="hidden md:block w-full bg-layer-week">
        <div className="w-full max-w-[1300px] mx-auto">
          <div className="flex items-center px-5 py-4">
            {/* ✅ 데스크탑도 동일 구조: 컨테이너 80x30 + 실제 로고 57x20 */}
            <div
              className="flex items-center"
              style={{ width: 80, height: 30, padding: '5px 23px 5px 0' }}
            >
              <Image
                src={serviceLogo}
                alt="서비스 로고"
                width={57}
                height={20}
                priority
              />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
