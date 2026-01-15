// src/app/product-listing/_components/mobile/ProductCard.mobile.tsx
import React from 'react'
import Image from 'next/image'
import type { ProductItem, ProductStatus } from '../shared/types'

import productListingPlaceholder from '@/assets/product-listing/placeholder/product-listing.png'
import iconSafety from '@/assets/product-listing/icons/mobile/icon-safety.svg'
import iconWarning from '@/assets/product-listing/icons/mobile/icon-status-warning.svg'

import { Label } from '@/app/_components/common/Label/Label'
import { Card } from '@/app/_components/common/Card'

type Props = {
  item: ProductItem
  /** ✅ 전체(all)에서는 false, 임산부/청소년/다이어터 탭에서는 true (ProductList에서 내려줌) */
  showStatus?: boolean
}

function getStatusIconSrc(status: Exclude<ProductStatus, '섭취 금지'>) {
  if (status === '섭취 가능') return iconSafety
  // '섭취 고려' | '주의사항'
  return iconWarning
}

export function ProductCardMobile({ item, showStatus = false }: Props) {
  const tags = item.tags ?? []
  const visible = tags.slice(0, 2)
  const restCount = Math.max(tags.length - 2, 0)

  const canShowStatusIcon =
    showStatus && item.status && item.status !== '섭취 금지'

  return (
    <Card
      className={[
        // ✅ rowCard (팀 컨벤션: TSX에서 className으로 레이아웃 구성)
        'flex items-center w-full self-stretch',
        'gap-5 pb-5', // 20px
        'rounded-none bg-transparent',
        'border-b',
      ].join(' ')}
      style={{
        borderBottomColor: 'var(--Color-Role-bg-layer-secondary, #DCE4ED)',
      }}
    >
      {/* ✅ 썸네일 (피그마: 96x120 / radius 8 / bg gray-0) */}
      <div
        className={[
          'relative flex-none overflow-hidden',
          'w-[96px] h-[120px]',
          'rounded-[8px]',
        ].join(' ')}
        style={{
          background: 'var(--Color-gray-0, #FBFDFD)',
        }}
      >
        {/* ✅ 상태 아이콘 오버레이 (피그마: 20x20 / top 4 / left 4) */}
        {canShowStatusIcon && (
          <Image
            src={getStatusIconSrc(item.status as Exclude<ProductStatus, '섭취 금지'>)}
            alt=""
            width={20}
            height={20}
            className="absolute left-[4px] top-[4px] w-[20px] h-[20px]"
            priority={false}
          />
        )}

        {/* ✅ 이미지: cover/center */}
        <Image
          src={item.image ?? productListingPlaceholder}
          alt={item.image ? item.name : '상품 이미지 placeholder'}
          width={96}
          height={120}
          className="block w-full h-full object-cover object-center"
        />
      </div>

      {/* ✅ 텍스트 컬럼(Frame 81) */}
      <div className="min-w-0 flex-1 flex flex-col items-start gap-4">
        {/* ✅ 상품명 및 브랜드 (gap 4) */}
        <div className="w-full flex flex-col items-start gap-1">
          {/* 브랜드: 피그마 B3 / primary */}
          <p className="typo-b3 text-fg-basic-primary">{item.brand}</p>

          {/* 상품명: 피그마 B1 / accent / 2줄 말줄임 */}
          <p
            className="typo-b1 text-fg-basic-accent line-clamp-2"
            style={{ maxHeight: 54 }}
          >
            {item.name}
          </p>
        </div>

        {/* ✅ 포함 성분 */}
        <div className="flex items-center gap-1 flex-nowrap">
          {visible.map((t, idx) => (
            <Label key={`${t}-${idx}`} variant="default">
              <div className="typo-b5 text-fg-basic-accent">{t}</div>
            </Label>
          ))}
          {restCount > 0 && (
            <Label variant="default">
              <div className="typo-b5 text-fg-basic-accent">+{restCount}</div>
            </Label>
          )}
        </div>
      </div>
    </Card>
  )
}
