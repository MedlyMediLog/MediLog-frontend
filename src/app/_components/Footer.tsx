'use client'
import logo from '@/assets/logo.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type FooterProps = {
  className?: string
}

export default function Footer({ className = '' }: FooterProps) {
  const router = useRouter()
  return (
    <>
      <div className="flex flex-col items-center gap-[10px] self-stretch desktop:flex-row bg-layer-secondary">
        <div className="flex w-full py-[30px] px-[20px] flex-col items-start gap-[30px] self-stretch">
          <ul className="text-fg-basic-secondary typo-b4 list-disc pl-[16px] space-y-[4px]">
            <li>
              본 서비스는 의료 진단이나 치료 목적이 아니며, 일반적인 정보 제공을 목적으로 합니다.
            </li>
            <li>
              개인 상태에 따라 다를 수 있으므로, 이상 증상이 있거나 우려되는 경우 전문가 상담이
              필요합니다.
            </li>
          </ul>
          <div
            className="flex
              flex-col
              w-full
              items-start
              desktop:justify-between
              desktop:items-center
              gap-y-5
              self-stretch
              flex-wrap
              desktop:flex-row"
          >
            <div className="flex flex-col gap-[10px] desktop:items-center desktop:gap-[30px] desktop:flex-row">
              <div className="flex w-[80px] h-[40px] py-[10px] pr-[23px] items-center">
                <Image src={logo} alt="logo" width={57} height={20} className="shrink-0" />
              </div>

              <div className="flex flex-wrap w-full gap-4">
                <button
                  onClick={() => router.push('/term')}
                  className="py-1 gap-1 typo-b5 text-fg-basic-secondary whitespace-nowrap cursor-pointer"
                >
                  서비스 이용 약관
                </button>
                <button
                  onClick={() => router.push('/privacy')}
                  className="py-1 gap-1 typo-b5 text-fg-basic-secondary whitespace-nowrap cursor-pointer"
                >
                  개인정보 처리방침
                </button>
                <button
                  onClick={() =>
                    window.open(
                      'https://www.foodsafetykorea.go.kr/apiMain.do',
                      '_blank',
                      'noopener,noreferrer',
                    )
                  }
                  className="py-1 gap-1 typo-b5 text-fg-basic-secondary whitespace-nowrap cursor-pointer"
                >
                  식약처 공공 데이터
                </button>
              </div>
            </div>
            <div className="flex gap-4 items-center typo-b4 text-[#a2acb7] whitespace-nowrap">
              메디로그 MVP ver.1.0.0
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
