import logo from '@/assets/logo.png'
import Image from 'next/image'

type FooterProps = {
  className?: string
}

export default function Footer({ className = '' }: FooterProps) {
  return (
    <>
      {/* 푸터
      <div className="flex flex-col w-full py-7.5 px-10 gap-2.5 bg-[#dce4ed] desktop:flex-row  bottom-0">
        <div className="flex flex-col w-full gap-10 desktop:flex-row">
          <div className="flex flex-col w-full gap-5 desktop:flex-row">
            <div className="flex flex-col w-full gap-7.5 desktop:flex-row">
              <div className="flex w-[80px] h-[40px] py-[10px] pr-[23px] items-center">
                <Image src={logo} alt="logo" />
              </div>

              <div className="flex flex-wrap w-full gap-4">
                <button className="py-1 gap-1 typo-b5 text-[#838c97] whitespace-nowrap">
                  서비스 이용 약관
                </button>
                <button className="py-1 gap-1 typo-b5 text-[#838c97] whitespace-nowrap">
                  개인정보 처리방침
                </button>
                <button className="py-1 gap-1 typo-b5 text-[#838c97] whitespace-nowrap">
                  식약처 공공 데이터
                </button>
                <button className="py-1 gap-1 typo-b5 text-[#838c97] whitespace-nowrap">
                  제품 표시사항
                </button>
              </div>
            </div>
            <div className="gap-4 flex items-center">
              <div className="typo-b4 text-[#a2acb7] whitespace-nowrap">메디로그 MVP ver.1.0.0</div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="flex flex-col items-center gap-[10px] self-stretch desktop:flex-row bg-layer-secondary">
        <div className="flex w-full py-[30px] px-[20px] flex-col items-start gap-[30px] self-stretch">
          <div className="text-fg-basic-secondary typo-b4 whitespace-pre-line">
            {
              '본 서비스는 의료 진단이나 치료 목적이 아니며, 일반적인 정보 제공을 목적으로 합니다. \n 개인 상태에 따라 다를 수 있으므로, 이상 증상이 있거나 우려되는 경우 전문가 상담이 필요합니다.'
            }
          </div>
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
                <button className="py-1 gap-1 typo-b5 text-fg-basic-secondary whitespace-nowrap">
                  서비스 이용 약관
                </button>
                <button className="py-1 gap-1 typo-b5 text-fg-basic-secondary whitespace-nowrap">
                  개인정보 처리방침
                </button>
                <button className="py-1 gap-1 typo-b5 text-fg-basic-secondary whitespace-nowrap">
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
