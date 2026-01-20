// src/app/product-listing/_components/ProductCard.tsx
import React from 'react'
import Image from 'next/image'
import type { ProductItem, ProductStatus } from './shared/types'

import productListingPlaceholder from '@/assets/product-listing/placeholder/product-listing.png'
import placeholderCard from '@/assets/product-listing/placeholder/product-listing.png'
import iconSafety from '@/assets/product-listing/icons/mobile/icon-safety.svg'
import iconWarning from '@/assets/product-listing/icons/mobile/icon-status-warning.svg'

import { Label } from '@/app/_components/common/Label/Label'
import { Card } from '@/app/_components/common/Card'

import styles from './ProductCard.module.css'

type Props = {
  item: ProductItem
  showStatus?: boolean
}

function getStatusIconSrc(status: Exclude<ProductStatus, '섭취 금지'>) {
  if (status === '섭취 가능') return iconSafety
  return iconWarning
}

export function ProductCard({ item, showStatus = false }: Props) {
  // ✅ 공통 데이터 가공(바인딩) 1번: 모바일/데스크탑이 같이 씀
  const tags = item.tags ?? []
  const visible = tags.slice(0, 2)
  const restCount = Math.max(tags.length - 2, 0)

  const canShowStatus =
    showStatus && item.status && item.status !== '섭취 금지'

  const renderStatusBadges = (status: Exclude<ProductStatus, '섭취 금지'>) => {
    if (status === '섭취 가능') return <Label variant="positive">섭취 가능</Label>
    return (
      <>
        <Label variant="attention">섭취 고려</Label>
        <Label variant="default">주의사항</Label>
      </>
    )
  }

  return (
    <>
      {/* =========================
          Mobile
         ========================= */}
      <div className="md:hidden">
        <Card
          className={[
            'flex items-center w-full self-stretch',
            'gap-5 pb-5',
            'rounded-none bg-transparent',
            'border-b',
          ].join(' ')}
          style={{ borderBottomColor: 'var(--Color-Role-bg-layer-secondary, #DCE4ED)' }}
        >
          {/* 썸네일 */}
          <div
            className={[
              'relative flex-none overflow-hidden',
              'w-[96px] h-[120px]',
              'rounded-[8px]',
            ].join(' ')}
            style={{ background: 'var(--Color-gray-0, #FBFDFD)' }}
          >
            {/* 상태 아이콘 */}
            {canShowStatus && (
              <Image
                src={getStatusIconSrc(item.status as Exclude<ProductStatus, '섭취 금지'>)}
                alt=""
                width={20}
                height={20}
                className="absolute left-[4px] top-[4px] w-[20px] h-[20px]"
              />
            )}

            <Image
              src={item.image ?? productListingPlaceholder}
              alt={item.image ? item.name : '상품 이미지 placeholder'}
              width={96}
              height={120}
              className="block w-full h-full object-cover object-center"
            />
          </div>

          {/* 텍스트 */}
          <div className="min-w-0 flex-1 flex flex-col items-start gap-4">
            <div className="w-full flex flex-col items-start gap-1">
              <p className="typo-b3 text-fg-basic-primary">{item.brand}</p>
              <p className="typo-b1 text-fg-basic-accent line-clamp-2" style={{ maxHeight: 54 }}>
                {item.name}
              </p>
            </div>

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
      </div>

      {/* =========================
          Desktop
         ========================= */}
      <div className="hidden md:block">
        <article className="flex w-[302px] flex-col items-start gap-4">
          <div className="relative h-[202px] w-[302px] overflow-hidden rounded-[12px] bg-layer-primary">
            {canShowStatus && (
              <div className="absolute left-[10px] top-[10px] z-10 flex items-center gap-[4px]">
                {renderStatusBadges(item.status as Exclude<ProductStatus, '섭취 금지'>)}
              </div>
            )}

            <Image
              src={item.image ?? placeholderCard}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex w-full max-w-[280px] flex-col items-start gap-1">
            <p className="typo-b3 text-fg-basic-primary w-full">{item.brand}</p>
            <p className={['typo-b1 text-fg-basic-accent w-full', styles.clamp2].join(' ')}>
              {item.name}
            </p>
          </div>

          <div className="flex items-center gap-1">
            {visible.map((label, idx) => (
              <span
                key={`${label}-${idx}`}
                className={[
                  'inline-flex items-center justify-center',
                  'px-[10px] py-[3px]',
                  'rounded-[8px]',
                  'bg-layer-secondary',
                  'typo-b5 text-fg-basic-accent',
                ].join(' ')}
              >
                {label}
              </span>
            ))}

            {restCount > 0 && (
              <span
                className={[
                  'inline-flex items-center justify-center',
                  'min-w-[24px]',
                  'px-[12px] py-[3px]',
                  'rounded-[8px]',
                  'bg-layer-secondary',
                  'typo-b5 text-fg-basic-week',
                ].join(' ')}
              >
                +{restCount}
              </span>
            )}
          </div>
        </article>
      </div>
    </>
  )
}
