import React from 'react'
import ProductListingTopBar from './_components/ProductListingTopBar'
import { ProductList } from './_components/ProductList'
import { CATEGORY_MAP } from '../category/_components/category.constants'
import { Target } from '@/types/product'

type Props = {
  searchParams: Promise<{
    category?: string
    target?: string
  }>
}

export default async function ProductListingPage({ searchParams }: Props) {
  const { category: rawCategory, target: rawTarget } = await searchParams

  if (!rawCategory) {
    throw new Error('category is required')
  }

  const category = CATEGORY_MAP[rawCategory as keyof typeof CATEGORY_MAP]
  const target = rawTarget?.toUpperCase() as Target | undefined

  if (!category) {
    throw new Error(`Invalid category: ${rawCategory}`)
  }

  return (
    <main className="min-h-dvh">
      {/* 배경 레이어 */}
      <div className="bg-[linear-gradient(to_bottom,#EDF2F6_0%,#FFFFFF_100%)] relative">
        {/* A안: TopBar가 패딩/정렬을 자체로 책임 → 공통 컨테이너 밖 */}
        <ProductListingTopBar />

        {/* 리스트/본문만 가운데 정렬 컨테이너 */}
        <div className="min-h-dvh flex justify-center pt-[56px] desktop:pt-[64px]">
          <div
            className={[
              'w-full',
              'px-[20px]',
              'pt-[10px]',
              'desktop:px-[20px]',
              'desktop:pt-[20px]',
              'desktop:max-w-[1300px]',
              'flex',
              'flex-col',
              'items-stretch',
            ].join(' ')}
          >
            <ProductList category={category} target={target} />
          </div>
        </div>
      </div>
    </main>
  )
}
