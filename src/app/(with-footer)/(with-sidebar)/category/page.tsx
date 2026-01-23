import CategoryGrid from './_components/CategoryGrid'
import CategoryHeader from './_components/CategoryHeader'

export default function Page() {
  return (
    <>
      {/* <div className="flex"> */}
      {/* <div className="w-[80px] bg-[#EDF2F6]"></div> */}
      <div className="flex flex-col bg-[linear-gradient(to_bottom,#EDF2F6_0%,#FFFFFF_100%)] relative">
        <CategoryHeader />
        <div className="w-full">
          <div className="w-full max-w-[1300px] mx-auto px-[20px] py-[17px] flex items-center">
            <div className="typo-d2 text-fg-basic-accent whitespace-pre-line">
              {'요즘 어떤 건강 주제에\n관심 있으세요?'}
            </div>
          </div>
          <div className="w-full max-w-[1300px] mx-auto pt-[30px] pb-[90px] desktop:min-h-[745px]">
            <div className="w-full max-w-[1260px] mx-auto p-[20px]">
              <CategoryGrid />
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}
