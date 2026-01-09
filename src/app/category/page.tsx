import CategoryGrid from './_components/CategoryGrid'
import CategoryHeader from './_components/CategoryHeader'

export default function Page() {
  return (
    <>
      <div className="flex min-h-screen">
        {/* <div className="w-[80px] bg-[#EDF2F6]"></div> */}
        <div className="flex-1 bg-[#EDF2F6]">
          <CategoryHeader />
          <div className="w-full">
            <div className="w-full max-w-[1300px] mx-auto px-[20px] py-[17px] flex items-center">
              <div className="typo-d2 whitespace-pre-line">
                {'어떤 종류의 제품 정보를 \n확인하고 싶으신가요?'}
              </div>
            </div>
            <div className="w-full max-w-[1300px] mx-auto px-[20px] pt-[30px] pb-[90px]">
              <div className="w-full max-w-[1260px] mx-auto p-[20px]">
                <CategoryGrid />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
