import React from 'react'
import Image from 'next/image'
import styles from './ProductCard.desktop.module.css'
import type { ProductItem, ProductStatus } from '../shared/types'

import placeholderCard from '@/assets/product-listing/placeholder/product-listing.png'
import { Label } from '@/app/_components/common/Label/Label'

type Props = {
  item: ProductItem
  showStatus?: boolean
}

export function ProductCardDesktop({ item, showStatus = false }: Props) {
  const tags = item.tags ?? []
  const visible = tags.slice(0, 2)
  const restCount = Math.max(tags.length - 2, 0)

  const canShowStatus = showStatus && item.status && item.status !== '섭취 금지'

  const renderStatusBadges = (status: Exclude<ProductStatus, '섭취 금지'>) => {
    if (status === '섭취 가능') {
      return <Label variant="positive">섭취 가능</Label>
    }
    return (
      <>
        <Label variant="attention">섭취 고려</Label>
        <Label variant="default">주의사항</Label>
      </>
    )
  }

  return (
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
  )
}
