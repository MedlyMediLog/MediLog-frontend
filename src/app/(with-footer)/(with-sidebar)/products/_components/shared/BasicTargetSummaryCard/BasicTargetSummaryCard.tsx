// src/app/(with-footer)/(with-sidebar)/products/_components/shared/BasicTargetSummaryCard/BasicTargetSummaryCard.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import styles from './BasicTargetSummaryCard.module.css'

import iconGuide from '@/assets/product-listing/icons/mobile/icon-guide.svg'
import iconMore from '@/assets/product-listing/icons/mobile/icon-more.svg'

import type { TargetSummaryContent } from './BasicTargetSummaryCard.content'
import { getTargetSummaryContent } from './BasicTargetSummaryCard.content'

type Props = {
  /**
   * ✅ 카테고리 페이지에서 눌러서 들어온 "카테고리명" (엑셀 Category와 동일한 문자열)
   * 예) "눈 건강", "뼈·관절" ...
   */
  category?: string | null

  /**
   * ✅ 필요하면 category 대신 content를 직접 주입 가능
   * (우선순위: content > category 매핑)
   */
  content?: TargetSummaryContent

  /** 기본값 유지용(대부분 안 건드려도 됨) */
  helperTitle?: string
  defaultOpen?: boolean

  /** ⚠️ 페이지가 공통 컨테이너 padding을 가지므로 기본은 false 추천 */
  withSlotPadding?: boolean
}

export function BasicTargetSummaryCard({
  category,
  content,
  helperTitle = '함께 알아두면 좋아요!',
  defaultOpen = false,
  withSlotPadding = false,
}: Props) {
  const resolved = content ?? getTargetSummaryContent(category)

  const title = resolved.title
  const subtitle = `${resolved.sentenceIntro} ${resolved.sentenceNote}`
  const helperLabel = resolved.sentenceAvgComposition
  const disclaimer = resolved.disclaimer

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

  // ✅ 데스크탑은 항상 열린 상태(설계 유지)
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
            <span className={`typo-b3 text-fg-info-primary ${styles.helperTitle}`}>{helperTitle}</span>

            <span className={`typo-b4 text-fg-basic-accent ${styles.helperLabel}`}>{helperLabel}</span>

            {/* ✅ 엑셀 Disclaimer 반영 */}
            <span className={`typo-b5 text-fg-basic-secondary ${styles.disclaimer}`}>{disclaimer}</span>
          </div>
        </div>
      )}
    </section>
  )

  if (!withSlotPadding) return card
  return <div className={styles.slot}>{card}</div>
}
