// src/app/product-listing/_components/mobile/ProductCard.mobile.tsx
import React from 'react'
import Image from 'next/image'
import styles from './ProductCard.mobile.module.css'
import type { ProductItem, ProductStatus, SelectedKey } from '../shared/types'
import productListingPlaceholder from '@/assets/product-listing/placeholder/product-listing.png'
import iconSafety from '@/assets/product-listing/icons/mobile/icon-safety.svg'
import iconWarning from '@/assets/product-listing/icons/mobile/icon-status-warning.svg'


import { Label } from '@/app/_components/common/Label/Label'
import { Card } from '@/app/_components/common/Card'

type Props = {
  item: ProductItem
  selectedKey: SelectedKey
}

function ProductImagePlaceholder() {
  return (
    <Image
      src={productListingPlaceholder}
      alt="상품 이미지 placeholder"
      width={96}
      height={120}
      style={{
        borderRadius: 8,
        background: 'var(--Color-Role-bg-layer-primary, #FBFDFD)',
      }}
    />
  )
}


export function ProductCardMobile({ item, selectedKey }: Props) {
  const tags = item.tags ?? []
  const visible = tags.slice(0, 2)
  const restCount = Math.max(tags.length - 2, 0)

  const canShowStatus = showStatus && item.status && item.status !== '섭취 금지'

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
    // ✅ Card 공통컴포넌트 사용 (row-list라 rounded/bg는 제거)
    <Card className={`rounded-none bg-transparent ${styles.rowCard}`}>
      {/* ✅ 제품 이미지: 96x120 / radius 8 / bg-layer-primary */}
      <div className={styles.thumb}>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            width={96}
            height={120}
            className={styles.thumbImg}
          />
        ) : (
          <ProductImagePlaceholder />
        )}
      </div>

      {/* ✅ 텍스트 컬럼(Frame 81) */}
      <div className={styles.content}>
        {/* ✅ 상품명 및 브랜드 (gap 4) */}
        <div className={styles.nameBlock}>
          {/* 브랜드: 피그마 B3 / primary  ※ typo-b3가 진짜 B3인지 확인 필요 */}
          <p className="typo-b3 text-fg-basic-primary">{item.brand}</p>

          {/* 상품명: 피그마 B1 / accent / 2줄 말줄임 / max-height 54 */}
          <p className={`typo-b1 text-fg-basic-accent ${styles.titleClamp2}`}>{item.name}</p>
        </div>

        {/* ✅ 상태 라벨: 공통 Label 사용 (피그마에 이 블록이 항상 있는지 여부는 추가 확인 필요) */}
        {canShowStatus && (
          <div className="flex items-center gap-[var(--Number-4,4px)]">
            {renderStatusBadges(item.status as Exclude<ProductStatus, '섭취 금지'>)}
          </div>
        )}

        {/* ✅ 포함 성분: 공통 Label(피그마 padding/radius/bg에 맞음) */}
        <div className={styles.ingredients}>
          {visible.map((t, idx) => (
            <Label key={`${t}-${idx}`} variant="default">
              {t}
            </Label>
          ))}
          {restCount > 0 && <Label variant="default">+{restCount}</Label>}
        </div>
      </div>
    </Card>
  )
}
