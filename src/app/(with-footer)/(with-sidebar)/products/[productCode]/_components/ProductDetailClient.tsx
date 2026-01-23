'use client'

import { useEffect } from 'react'

import ProductDeatilHeader from './ProductDetailHeader'
import IngredientsSection from './IngredientsSection'
import ProductSummarySection from './ProductSummarySection'
import SafetyGuideSection from './SafetyGuideSection'
import IntakeStorageSection from './IntakeStorageSection'
import GeneralUsageSection from './GeneralUsageSection'
import ShareButton from './ShareButton'

import { useProductDetail } from '@/hooks/useProductDetail'
import { Target } from '@/lib/api/types'
import ShareButton from './ShareButton'
import LoadingSpinner from '@/app/_components/common/LoadingSpinner'
import { ErrorState } from '@/app/_components/common/ErrorState'
import { getOrCreateAnonId } from '@/lib/analytics/identity'

type Props = {
  productCode: number
  target: Target | null
}

export default function ProductDetailClient({ productCode, target }: Props) {
  // ✅ 익명 사용자 ID 보장 (로그인/비로그인 공통)
  useEffect(() => {
    getOrCreateAnonId()
  }, [])

  const { data, isLoading, isError } = useProductDetail({ productCode, target })

  // if (isLoading) return <div className="p-5">로딩중...</div>
  // if (!data) return <div className="p-5">상세 정보를 불러오지 못했어요.</div>

  return (
    <div className="flex flex-col bg-[linear-gradient(to_bottom,#EDF2F6_0%,#FFFFFF_100%)] relative">
      <ProductDeatilHeader />
      {isLoading ? (
        <div className="w-full flex justify-center items-center py-[150px]">
          <LoadingSpinner />
        </div>
      ) : isError || !data ? (
        <div className="w-full flex justify-center  pb-[120px]">
          <ErrorState
            code="1XX errors"
            description={
              '입력하신 조건으로는 결과를 찾지 못했어요.\n다른 키워드로 다시 검색해보세요.'
            }
            actionLabel="다시 찾아보기"
            onAction={() => window.location.reload()}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col pt-5 pb-15 gap-5 desktop:pt-0 items-center">
          <div className="flex flex-col px-5 gap-5 desktop:flex-row desktop:gap-4">
            <div>
              <ProductSummarySection
                name={data.name}
                manufacturer={data.manufacturer}
                appearanceForm={data.appearanceForm}
                text={data.text}
              />
            </div>

            <div className="flex-col flex gap-5 desktop:w-155">
              <IngredientsSection ingredients={data.ingredients} />
              <GeneralUsageSection functionText={data.functionText} />
              <IntakeStorageSection
                howToEat={data.howToEat}
                expiration={data.expiration}
                storageMethod={data.storageMethod}
              />
              <SafetyGuideSection cautionRaw={data.cautionRaw} />
              <ShareButton />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
