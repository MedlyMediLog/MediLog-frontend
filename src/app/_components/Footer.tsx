type FooterProps = {
  className?: string
}

export default function Footer({ className = '' }: FooterProps) {
  return (
    <>
      {/* 푸터 */}
      <div className="flex flex-col w-full py-7.5 px-10 gap-2.5 bg-[#dce4ed] desktop:flex-row  bottom-0">
        <div className="flex flex-col w-full gap-10 desktop:flex-row">
          <div className="flex flex-col w-full gap-5 desktop:flex-row">
            <div className="flex flex-col w-full gap-7.5 desktop:flex-row">
              <div className="w-20 h-7.5 bg-[#d9d9d9]"></div>
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
      </div>
    </>
  )
}
