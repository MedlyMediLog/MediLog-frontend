// src/app/product-listing/_components/mobile/ProductCard.mobile.tsx
import React from 'react'
import Image from 'next/image'
import styles from './ProductCard.mobile.module.css'
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

function getStatusIconSrc(status: Exclude<ProductStatus, '섭취 금지'>) {
  if (status === '섭취 가능') return iconSafety
  // '섭취 고려' | '주의사항'
  return iconWarning
}

export function ProductCardMobile({ item, showStatus = false }: Props) {
  const tags = item.tags ?? []
  const visible = tags.slice(0, 2)
  const restCount = Math.max(tags.length - 2, 0)

  // ✅ 필터 탭(임산부/청소년/다이어터)일 때만 상태 아이콘 표시
  // ✅ '섭취 금지'는 원칙상 리스트에서 이미 제외되지만, 안전하게 한 번 더 방어
  const canShowStatusIcon =
    showStatus && item.status && item.status !== '섭취 금지'

  return (
    // ✅ Card 공통컴포넌트 사용 (row-list라 rounded/bg는 제거)
    <Card className={`rounded-none bg-transparent ${styles.rowCard}`}>
      {/* ✅ 제품 이미지: 96x120 / radius 8 / bg-layer-primary */}
      <div className={styles.thumb}>
        {/* ✅ 상태 아이콘 오버레이 (피그마: 20x20 / top 4 / left 4) */}
        {canShowStatusIcon && (
          <Image
            src={getStatusIconSrc(item.status as Exclude<ProductStatus, '섭취 금지'>)}
            alt=""
            width={20}
            height={20}
            className={styles.statusIcon}
            priority={false}
          />
        )}

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
          {/* 브랜드: 피그마 B3 / primary */}
          <p className="typo-b3 text-fg-basic-primary">{item.brand}</p>

          {/* 상품명: 피그마 B1 / accent / 2줄 말줄임 */}
          <p className={`typo-b1 text-fg-basic-accent ${styles.titleClamp2}`}>
            {item.name}
          </p>
        </div>

        {/* ✅ 포함 성분: 공통 Label 사용 */}
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
