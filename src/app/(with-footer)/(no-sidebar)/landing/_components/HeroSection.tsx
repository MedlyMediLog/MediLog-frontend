'use client'

import Button from '@/app/_components/common/Button'
import logo from '@/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import LandingMaskText from './LandingMaskText'

type HeroSectionProps = {
  isLoggedIn: boolean
  onLoginClick: () => void
  onLogoutClick: () => void
}

export default function HeroSection({ isLoggedIn, onLoginClick, onLogoutClick }: HeroSectionProps) {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative w-full flex-1 overflow-hidden">
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 desktop:px-5 bg-white

        `}
      >
        <div className="mx-auto flex items-center justify-between max-w-[1300px] py-4 px-4 desktop:px-5">
          <Link href="/" className="flex items-center w-[80px] h-[40px]" aria-label="홈으로 이동">
            <Image
              src={logo}
              alt="logo"
              width={57}
              height={20}
              className="shrink-0 aspect-[57/20] cursor-pointer"
              priority
            />
          </Link>

          <Button
            variant="secondary"
            shape="rounded"
            className="flex py-2 px-4 desktop:py-3 desktop:px-4 items-center justify-center cursor-pointer"
            onClick={isLoggedIn ? onLogoutClick : onLoginClick}
          >
            {isLoggedIn ? '로그아웃' : '로그인'}
          </Button>
        </div>
      </header>

      <div className="h-[64px] desktop:h-[72px]" />

      <video
        className="absolute inset-0 w-full h-full object-cover -z-10 hidden desktop:block"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video/landing_desktop.mp4" type="video/mp4" />
      </video>

      <video
        className="absolute inset-0 w-full h-full object-cover -z-10 block desktop:hidden"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video/landing_mobile.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 desktop:px-5">
        <div className="mx-auto max-w-[1300px] h-[1000px] desktop:pt-[200px] pt-[80px] px-5">
          <div className="flex flex-col items-center desktop:items-start gap-[30px] desktop:gap-[60px]">
            <div className="flex flex-col text-center items-center desktop:text-left desktop:items-start gap-[12px]">
              <LandingMaskText
                titleLines={['안심하고 판단할 수 있는', '건강기능식품 정보']}
                subLines={[
                  '식약처 공공데이터로 성분∙기능성부터',
                  '섭취방법∙주의사항까지 한번에 확인해요.',
                ]}
              />
            </div>

            <Button
              variant="primary"
              shape="rounded"
              className="flex py-3 px-5 justify-center items-center gap-[8px] cursor-pointer"
              onClick={() => router.push('/category')}
            >
              제품 정보 확인하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
