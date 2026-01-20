'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import LoginModal from '@/app/(no-footer)/login/_components/LoginModal'

export default function LandingPage() {
  const router = useRouter()
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const handleLoginClick = () => {
    const isDesktop = window.matchMedia('(min-width: 740px)').matches

    if (isDesktop) {
      setIsLoginOpen(true) // ✅ 데스크탑: 오버레이로 띄우기
    } else {
      router.push('/login') // ✅ 모바일: /login 이동
    }
  }

  return (
    <div className="w-full">
      {/* ✅ 데스크탑 로그인 오버레이 */}
      {isLoginOpen ? <LoginModal onClose={() => setIsLoginOpen(false)} /> : null}

        <header className="w-full py-[16px] px-[20px] flex gap-[120px] h-[80px]">
            <div className="w-full gap-[40px]">
          <div className="w-[80px] h-[30px] bg-[#d9d9d9]" />
            </div>
        </header>

      {/* Hero */}
      <section className="w-full">
        <div className="mx-auto flex min-h-[821px] max-w-[1256px] flex-col items-center">
          <h1 className="text-d2 mt-[133px] text-center text-[#222222]">
            광고 없이, 식약처 데이터로 <br /> 확인하는 건강 기능식품 정보
          </h1>

          <p className="text-b1 mt-[29px] text-center text-[#919191]">
            내게 필요한 성분·기능성·섭취방법·주의사항을 한 번에 비교해요.
            <br />
            임산부·청소년·노년층 등 대상별 주의 정보를 빠르게 필터링해 확인할 수 있어요.
          </p>

          <p className="text-b5 mt-[8px] text-center text-[#c9c9c9]">
            이 서비스는 제품 구매를 추천하거나 판매하지 않습니다.
          </p>

          {/* CTA */}
          <button
            type="button"
            onClick={handleLoginClick}
            className="
              mt-[40px]
              inline-flex items-center justify-center
              h-[48px] px-[32px]
              rounded-[12px]
              bg-[#222222]
              text-b4 text-white
              hover:bg-[#000000]
              transition
            "
          >
            시작하기
          </button>
        </div>
      </section>

      
    </div>
  )
}
