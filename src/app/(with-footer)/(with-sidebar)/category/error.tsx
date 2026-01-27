'use client'

import CategoryHeader from './_components/CategoryHeader'
import { ErrorState } from '@/app/_components/common/ErrorState'
export default function Page() {
  return (
    <>
      <div className="flex flex-col bg-gray-100 relative">
        <CategoryHeader />
        <div className="w-full">
          <div className="w-full max-w-[1300px] mx-auto px-[20px] py-[17px] gap-[10px] flex items-center">
            <div className="typo-d2 text-fg-basic-accent whitespace-pre-line">
              {'요즘 어떤 건강 주제에\n관심 있으세요?'}
            </div>
          </div>
          <div className="w-full flex justify-center min-h-[745px]">
            <ErrorState
              code={'5XX errors'}
              description={'카테고리 정보를 불러올 수 없어요.\n잠시 후 다시 시도해주세요.'}
              actionLabel={'다시 시도하기'}
              onAction={() => window.location.reload()}
            />
          </div>
        </div>
      </div>
    </>
  )
}
