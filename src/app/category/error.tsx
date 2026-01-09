'use client'

import Button from '../_components/common/Button'
import error from '@/assets/error.png'
import Image from 'next/image'
import CategoryHeader from './_components/CategoryHeader'
export default function Page() {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex-1 bg-[#EDF2F6]">
          <CategoryHeader />
          <div className="w-full">
            <div className="w-full max-w-[1300px] mx-auto px-[20px] py-[17px] flex items-center">
              <div className="typo-d2 whitespace-pre-line">
                {'어떤 종류의 제품 정보를 \n확인하고 싶으신가요?'}
              </div>
            </div>
            <div className="w-full flex justify-center">
              <div className="w-full flex flex-col items-center justify-center py-[60px] gap-[24px] max-w-[295px] rounded-[12px]">
                <div className="typo-d1 text-[#C1CAD6]">5XX errors</div>
                <span className="relative w-[120px] h-[120px]">
                  <Image src={error} alt="" fill className="object-contain" priority />
                </span>
                <div className="typo-b1 whitespace-pre-line text-center">
                  {'카테고리 정보를 불러올 수 없어요.\n 잠시 후 다시 시도해주세요.'}
                </div>
                <Button variant="primary" shape="rounded">
                  다시 시도하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
