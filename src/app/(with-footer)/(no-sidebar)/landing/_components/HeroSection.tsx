import Button from '@/app/_components/common/Button'
import logo from '@/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type HeroSectionProps = {
  isLoggedIn: boolean
  onLoginClick: () => void
  onLogoutClick: () => void
}

export default function HeroSection({ isLoggedIn, onLoginClick, onLogoutClick }: HeroSectionProps) {
  const router = useRouter()
  return (
    <div className="relative w-full flex-1 px-5 overflow-hidden">
      {/* Desktop video (≥ 740px) */}
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10 hidden desktop:block"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video/landing_desktop.mp4" type="video/mp4" />
      </video>

      {/* Mobile video (375–739px) */}
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10 block desktop:hidden"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video/landing_mobile.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10">
        {/* 헤더 */}
        <div className="mx-auto flex items-center justify-between max-w-[1300px] py-4 px-5">
          <Link href="/" className="flex items-center w-[80px] h-[40px]" aria-label="홈으로 이동">
            <Image
              src={logo}
              alt="logo"
              width={57}
              height={20}
              className="shrink-0 aspect-[57/20]"
              priority
            />
          </Link>

          <Button
            variant="secondary"
            shape="rounded"
            className="flex py-2 px-4 desktop:py-3 desktop:px-4 items-center justify-center"
            onClick={isLoggedIn ? onLogoutClick : onLoginClick}
          >
            {isLoggedIn ? '로그아웃' : '로그인'}
          </Button>
        </div>

        {/* Hero 내용 */}
        <div className="mx-auto max-w-[1300px] h-[1000px] desktop:pt-[200px] pt-[80px] px-5">
          <div className="flex flex-col items-center desktop:items-start gap-[30px] desktop:gap-[60px]">
            <div className="flex flex-col text-center items-center desktop:text-left desktop:items-start gap-[12px]">
              <div
                className="
                    typo-h2
                    desktop:typo-d1
                    bg-gradient-to-r
                    from-gray-900
                    via-gray-400
                    to-gray-0
                    bg-[length:300%_100%]
                    bg-clip-text
                    text-transparent
                    animate-gradient-move
                    whitespace-pre-line
                "
              >
                {'안심하고 판단할 수 있는 \n건강기능식품 정보'}
              </div>
              <div className="desktop:text-[24px] typo-b3 whitespace-pre-line">
                {'식약처 공공데이터로 성분, 기능성부터 \n섭취방법, 주의사항까지 한번에 확인해요.'}
              </div>
            </div>
            <Button
              variant="primary"
              shape="rounded"
              className="flex py-3 px-5 justify-center items-center gap-[8px]"
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
