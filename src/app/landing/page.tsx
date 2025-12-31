export default function LandingPage() {
  return (
    <div className="w-full">
        <header className="w-full py-[16px] px-[20px] flex gap-[120px] h-[80px]">
            <div className="w-full gap-[40px]">
                <div className="w-[80px] h-[30px] bg-[#d9d9d9]"></div>
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
        </div>
      </section>

      {/* Footer / Quick links */}
      <footer className="w-full px-[40px] py-[30px] gap-[10px] flex flex-col">
        <div className="flex gap-[40px] w-full flex-col">
        <div className="w-[246px] flex flex-col">
        {/* 소개 제품 찾기*/}
          <div className="flex justify-between">
            <div className="flex flex-col gap-[10px]">
              <div className="text-b3 text-[#a3a3a3]">소개</div>
              <div className="text-b5 text-[#666666]">서비스 소개</div>
            </div>

            <div className="flex flex-col gap-[10px]">
              <div className="text-b3 text-[#a3a3a3]">제품 찾기</div>
              <div className="text-b5 text-[#666666]">카테고리</div>
            </div>
          </div>
          

          </div>
          {/* 서비스 이용약관 개인정보 처리방침 등등 */}
          <div className="flex justify-between w-full ">
            <div className="flex gap-[29px] items-center">
                <div className="w-[80px] h-[30px] bg-[#d9d9d9]"></div>
                <div className="flex gap-[16px] whitespace-nowrap">
                    <div className="text-b5 text-[#a3a3a3]">서비스 이용약관</div>
                    <div className="text-b5 text-[#a3a3a3]">개인정보 처리방침</div>
                    <div className="text-b5 text-[#a3a3a3]">식약처 공공 데이터</div>
                    <div className="text-b5 text-[#a3a3a3]">제품 표시사항</div>
                </div>
            </div>
        </div>
        </div>
      </footer>
    </div>
  )
}
