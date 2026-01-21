// src/app/product-listing/_components/shared/LoadMoreSection/LoadMoreSection.tsx
'use client'

import React from 'react'
import Button from '@/app/_components/common/Button'

type Props = {
  /** 현재 리스트 총 개수 (필터/검색 적용 후 결과 개수) */
  total: number
  /** 현재 화면에 노출 중인 개수 */
  visible: number
  /** 더보기 클릭 시 실행 */
  onLoadMore: () => void
  /** 클릭 시 추가로 늘릴 단위(기본 20) */
  step?: number
}

export function LoadMoreSection({
  total,
  visible,
  onLoadMore,
  step = 20,
}: Props) {
  const canLoadMore = visible < total

  if (!canLoadMore) return null

  return (
    <div
      className={[  
        // ✅ 피그마(제품 더보기 영역)
        // display:flex; padding-top:24px; flex-direction:column;
        // justify-content:center; align-items:center; align-self:stretch;
        'flex flex-col justify-center items-center self-stretch',
        'pt-[24px]',
      ].join(' ')}
    >
      {/* ✅ 버튼: 공통 Button 사용 (secondary / rounded)
          - 공통 Button의 rounded가 피그마와 동일하게
            px 20 / py 12 / gap 8 / radius 999 로 이미 정의되어 있음
      */}
      <Button
        variant="secondary"
        shape="rounded"
        onClick={onLoadMore}
        aria-label={`제품 더보기 (추가 ${step}개)`}
      >
        제품 더보기
      </Button>
    </div>
  )
}