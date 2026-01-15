//src/app/product-listing/_components/shared/BasicTargetSummaryCard.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import styles from './BasicTargetSummaryCard.module.css'

import iconGuide from '@/assets/product-listing/icons/mobile/icon-guide.svg'
import iconMore from '@/assets/product-listing/icons/mobile/icon-more.svg'

type Props = {
  title?: string
  helperTitle?: string
  helperLabel?: string
  defaultOpen?: boolean
}

export function BasicTargetSummaryCard({
  title = '["Tittle"]',
  helperTitle = '함께 알아두면 좋아요!',
  helperLabel = '[“Sentence_AvgComposition”]',
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = React.useState(defaultOpen)

  return (
    <section className={styles.card} aria-label="기본 및 대상 요약">
      {/* 헤더(항상 노출) */}
      <button
        type="button"
        className={styles.header}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {/* ✅ 타이포/색상은 globals 유틸로 */}
        <span className={`typo-h5 text-fg-basic-primary ${styles.title}`}>{title}</span>

        <span className={open ? styles.moreIconOpen : styles.moreIcon}>
          <Image src={iconMore} alt="" width={24} height={24} />
        </span>
      </button>

      {/* 펼침 영역 */}
      {open && (
        <div className={styles.body}>
          <div className={styles.helperBox}>
            <div className={styles.helperRow}>
              <Image src={iconGuide} alt="" width={20} height={20} />
              {/* ✅ 텍스트 타이포/색상 유틸 */}
              <span className={`typo-b3 text-fg-info-secondary-week ${styles.helperTitle}`}>
                {helperTitle}
              </span>
            </div>

            {/* ✅ 라벨도 유틸 */}
            <span className={`typo-b5 text-fg-basic-accent ${styles.helperLabel}`}>{helperLabel}</span>
          </div>
        </div>
      )}
    </section>
  )
}
