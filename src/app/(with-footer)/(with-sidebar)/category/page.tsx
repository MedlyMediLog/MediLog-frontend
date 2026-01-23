import { PageErrorBoundary } from '@/app/_components/ErrorBoundaryWrapper'
import CategoryGrid from './_components/CategoryGrid'
import CategoryHeader from './_components/CategoryHeader'

export default function Page() {
  return (
    <>
      <div className="flex flex-col bg-gray-100 relative">
        <CategoryHeader />
        <PageErrorBoundary>
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
        </PageErrorBoundary>
      </div>
    </>
  )
}
// export default function Page() {
//   throw new Error('강제로 에러 발생')

//   return <div>절대 안 보임</div>
// }
