// src/app/product-listing/_components/mobile/ProductCard.mobile.tsx
import React from 'react'
import Image from 'next/image'
import styles from './ProductCard.mobile.module.css'
import type { ProductItem, ProductStatus } from '../shared/types'

import { Label } from '@/app/_components/common/Label/Label'
import { Card } from '@/app/_components/common/Card'

type Props = {
  item: ProductItem
  showStatus?: boolean
}

function ProductImagePlaceholder() {
  // ✅ 피그마 placeholder SVG (96x120 / radius=8 느낌 / bg-layer-primary + bottle bg-layer-secondary)
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="120" viewBox="0 0 96 120" fill="none">
      <path
        d="M0 8C0 3.58172 3.58172 0 8 0H88C92.4183 0 96 3.58172 96 8V112C96 116.418 92.4183 120 88 120H8C3.58172 120 0 116.418 0 112V8Z"
        fill="var(--Color-Role-bg-layer-primary, #FBFDFD)"
      />
      <path
        d="M48.001 26.5C54.8028 26.5 60.3174 27.5643 60.3174 28.877V42.0566L60.3135 42.1182C60.2259 42.7852 58.7136 43.3803 56.3428 43.8018C62.0831 45.0948 65.9999 47.6794 66 50.6582C66 50.7107 65.9975 50.7632 65.9951 50.8154H66V84.6055H65.9961C65.8151 89.1544 57.8278 92.8164 48 92.8164C38.1723 92.8164 30.1849 89.1544 30.0039 84.6055H30V50.8154H30.0049C30.0025 50.7632 30 50.7107 30 50.6582C30.0001 47.6791 33.9177 45.0937 39.6592 43.8008C37.2165 43.3664 35.6855 42.7482 35.6855 42.0566V28.877C35.6855 27.5643 41.1993 26.5 48.001 26.5Z"
        fill="var(--Color-Role-bg-layer-secondary, #DCE4ED)"
      />
    </svg>
  )
}

export function ProductCardMobile({ item, showStatus = false }: Props) {
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
