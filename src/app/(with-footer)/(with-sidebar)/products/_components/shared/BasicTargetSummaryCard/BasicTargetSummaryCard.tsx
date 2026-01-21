// src/app/product-listing/_components/shared/BasicTargetSummaryCard.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import styles from './BasicTargetSummaryCard.module.css'

import iconGuide from '@/assets/product-listing/icons/mobile/icon-guide.svg'
import iconMore from '@/assets/product-listing/icons/mobile/icon-more.svg'

type Props = {
  title?: string
  subtitle?: string
  helperTitle?: string
  helperLabel?: string
  defaultOpen?: boolean

  /** ⚠️ 페이지가 공통 컨테이너 padding을 가지므로 기본은 false 추천 */
  withSlotPadding?: boolean
}

export function BasicTargetSummaryCard({
  title = '["Tittle"]',
  subtitle = '서브 타이틀',
  helperTitle = '함께 알아두면 좋아요!',
  helperLabel = '꿀팁',
  defaultOpen = false,
  withSlotPadding = false,
}: Props) {
  const [open, setOpen] = React.useState(defaultOpen)

  const [isDesktop, setIsDesktop] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const mq = window.matchMedia('(min-width: 740px)')

    const apply = () => setIsDesktop(mq.matches)
    apply()

    const onChange = () => apply()
    mq.addEventListener('change', onChange)

    return () => {
      mq.removeEventListener('change', onChange)
    }
  }, [])

  const isOpen = isDesktop ? true : open

  const card = (
    <section className={styles.card} aria-label="기본 및 대상 요약">
      <div className={styles.content}>
        {isDesktop ? (
          <div className={styles.header}>
            <span className={`typo-h3 text-fg-basic-accent ${styles.title}`}>{title}</span>
          </div>
        ) : (
          <button
            type="button"
            className={styles.header}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={isOpen}
          >
            <span className={`typo-h3 text-fg-basic-accent ${styles.title}`}>{title}</span>

            <span className={isOpen ? styles.moreIconOpen : styles.moreIcon} aria-hidden="true">
              <Image src={iconMore} alt="" width={24} height={24} />
            </span>
          </button>
        )}

        <span className={`typo-b3 text-fg-basic-primary ${styles.subtitle}`}>{subtitle}</span>
      </div>

      {isOpen && (
        <div className={styles.tipBox}>
          <Image src={iconGuide} alt="" width={20} height={20} />

          <div className={styles.tipTexts}>
            <span className={`typo-b3 text-fg-info-primary-accent ${styles.helperTitle}`}>
              {helperTitle}
            </span>

            <span className={`typo-b4 text-fg-basic-accent ${styles.helperLabel}`}>{helperLabel}</span>
          </div>
        </div>
      )}
    </section>
  )

  if (!withSlotPadding) return card
  return <div className={styles.slot}>{card}</div>
}