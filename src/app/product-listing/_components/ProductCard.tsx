import React from 'react'
import Image from 'next/image'
import styles from './ProductCard.module.css'
import type { ProductItem, ProductStatus } from './types'

// ✅ 피그마 기본 카드 placeholder
import placeholderCard from '@/assets/product-listing/placeholder/product-listing.png'

// ✅ 공통 라벨 (수정 불가)
import { Label } from '@/app/_components/common/Label/Label'

type Props = {
  item: ProductItem
  /** 전체(all)일 때는 라벨 숨기고, 대상군 선택 시만 라벨 노출 */
  showStatus?: boolean
}

export function ProductCard({ item, showStatus = false }: Props) {
  const tags = item.tags ?? []
  const visible = tags.slice(0, 2)
  const restCount = Math.max(tags.length - 2, 0)

  const canShowStatus = showStatus && item.status && item.status !== '섭취 금지'

  /**
   * ✅ 라벨 노출 규칙
   * - 섭취 가능: 단독
   * - 섭취 고려 / 주의사항: 항상 "세트"로 같이 노출
   *
   * ✅ Label 최신 variant 매핑
   * - positive  : 섭취 가능
   * - attention : 섭취 고려(노랑)
   * - default   : 주의사항(회색)
   */
  const renderStatusBadges = (status: Exclude<ProductStatus, '섭취 금지'>) => {
    if (status === '섭취 가능') {
      return <Label variant="positive">섭취 가능</Label>
    }

    // ✅ 섭취 고려 OR 주의사항 → 무조건 세트
    return (
      <>
        <Label variant="attention">섭취 고려</Label>
        <Label variant="default">주의사항</Label>
      </>
    )
  }

  return (
    <article className="flex w-[302px] flex-col items-start gap-4">
      <div
        className={[
          'relative w-[302px] h-[202px]',
          'rounded-[12px] overflow-hidden',
          'bg-[var(--gray-0)]',
        ].join(' ')}
      >
        {/* ✅ 상태 라벨: 피그마 1:1 (left/top 10, 라벨-라벨 gap 4) */}
        {canShowStatus && (
          <div
            className={[
              'absolute left-[10px] top-[10px] z-10',
              'flex items-center',
              'gap-[4px]', // ✅ 스샷 기준 라벨 간격: 4px
            ].join(' ')}
          >
            {renderStatusBadges(
              item.status as Exclude<ProductStatus, '섭취 금지'>
            )}
          </div>
        )}

        <Image
          src={item.image ?? placeholderCard}
          alt={item.name}
          fill
          className="object-cover"
          priority={false}
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
