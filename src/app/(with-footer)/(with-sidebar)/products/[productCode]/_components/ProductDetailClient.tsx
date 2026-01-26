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
import type { Target } from '@/lib/api/types'

import LoadingSpinner from '@/app/_components/common/LoadingSpinner'
import { ErrorState } from '@/app/_components/common/ErrorState'

import { getOrCreateAnonId } from '@/lib/analytics/identity'
import { usePageDuration } from '@/hooks/usePageDuration'

//  5-click: 상세 첫 도착 성공 전송
import {
  ensureFunnelSessionExists,
  hasFlushed,
  markReachedDetail,
  flushFunnelSession,
} from '@/lib/analytics/funnelSession'

type Props = {
  productCode: number
  target: Target | null
}

export default function ProductDetailClient({ productCode, target }: Props) {
  useEffect(() => {
    getOrCreateAnonId()
  }, [])

  useEffect(() => {
    ensureFunnelSessionExists()
    if (hasFlushed()) return

    const pc = String(productCode)
    markReachedDetail(pc)

    flushFunnelSession({
      reachedDetail: true,
      productCode: pc,
    })
  }, [productCode])

  usePageDuration({
    pageKey: `product_detail:${productCode}`,
    meta: { productCode, target },
    idleMs: 10_000,
    onFlush: async (p) => {
      const anonId = getOrCreateAnonId()

      await fetch('https://api.medilog.today/v1/stay-time-events', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          anonId,
          startedAt: p.startedAt,
          endedAt: p.endedAt,
          totalMs: p.totalMs,
          activeMs: p.activeMs,
          productCode: String(productCode),
          target: target ?? null,
        }),
        keepalive: true,
        credentials: 'include',
      }).catch(() => {})
    },
  })

  const { data, isLoading, isError } = useProductDetail({ productCode, target })

  return (
    <div className="relative flex flex-col bg-[linear-gradient(to_bottom,#EDF2F6_0%,#FFFFFF_100%)]">
      <ProductDeatilHeader />

      {isLoading ? (
        <div className="flex w-full items-center justify-center py-[170px]">
          <LoadingSpinner />
        </div>
      ) : isError || !data ? (
        <div className="flex w-full justify-center pt-[56px] desktop:pt-[80px] pb-[120px]">
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
        <div className="flex w-full flex-col items-center gap-5 pt-5 pb-15  desktop:pt-20">
          {/* ✅ 740~1379: 1열(모바일처럼) 유지 */}
          {/* ✅ 1380+: 예전 desktop 배치(2열) 그대로 */}
          <div className="flex flex-col gap-5 px-5 min-[1380px]:flex-row min-[1380px]:gap-4">
            <div>
              <ProductSummarySection
                name={data.name}
                manufacturer={data.manufacturer}
                appearanceForm={data.appearanceForm}
                text={data.text}
                imageUrl={data.imageUrl}
              />
            </div>

            <div className="flex flex-col gap-5 desktop:w-[620px]">
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
