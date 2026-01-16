// src/app/product-listing/_components/shared/BasicTargetSummaryCard.tsx
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

  // ✅ 데스크탑(md 이상)에서는 항상 펼침
  const [isDesktop, setIsDesktop] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const mq: MediaQueryList = window.matchMedia('(min-width: 768px)')

    const apply = () => setIsDesktop(mq.matches)
    apply()

    const handler = () => apply()
    mq.addEventListener('change', handler)

    return () => {
      mq.removeEventListener('change', handler)
    }
  }, [])

  const isOpen = isDesktop ? true : open

  return (
    <section className={styles.card} aria-label="기본 및 대상 요약">
      {/* 헤더 */}
      {isDesktop ? (
        <div className={styles.header}>
          {/* ✅ 데스크탑 타이틀: H3 */}
          <span className={`typo-h3 text-fg-basic-primary ${styles.title}`}>{title}</span>

          {/* 데스크탑은 펼침 고정이므로 아이콘 숨김 */}
          <span className={styles.moreIconDesktopHidden} aria-hidden="true">
            <Image src={iconMore} alt="" width={24} height={24} />
          </span>
        </div>
      ) : (
        <button
          type="button"
          className={styles.header}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={isOpen}
        >
          {/* ✅ 모바일 타이틀: 기존대로 H5 */}
          <span className={`typo-h5 text-fg-basic-primary ${styles.title}`}>{title}</span>

          <span className={isOpen ? styles.moreIconOpen : styles.moreIcon}>
            <Image src={iconMore} alt="" width={24} height={24} />
          </span>
        </button>
      )}

      {/* 펼침 영역 */}
      {isOpen && (
        <div className={styles.body}>
          <div className={styles.helperBox}>
            <div className={styles.helperRow}>
              <Image src={iconGuide} alt="" width={20} height={20} />
              <span className={`typo-b3 text-fg-info-secondary-week ${styles.helperTitle}`}>
                {helperTitle}
              </span>
            </div>

            <span className={`typo-b5 text-fg-basic-accent ${styles.helperLabel}`}>{helperLabel}</span>
          </div>
        </div>
      )}
    </section>
  )
}
