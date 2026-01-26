'use client'

import React from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import styles from './BasicTargetSummaryCard.module.css'

import iconGuide from '@/assets/product-listing/icons/mobile/icon-guide.svg'
import iconMore from '@/assets/product-listing/icons/mobile/icon-more.svg'

import { getBasicTargetCardContent, type Target } from '@/types/targetSummaryContent'

const CATEGORY_ALIAS: Record<string, string> = {
  EYE: '눈 건강',
  BONE: '뼈·관절',
  IMMUNE: '면역',
  ENERGY: '피로·에너지',
  STRESS: '수면·스트레스',
  GUT: '장 건강',
  BLOOD: '혈행·혈압',
  SKIN: '피부·모발',
  MUSCLE: '근육·운동',
  LIVER: '간 건강',
}

function normalizeCategory(raw?: string | null) {
  const v = (raw ?? '').trim()
  if (!v) return null
  return CATEGORY_ALIAS[v.toUpperCase()] ?? v
}

const TARGET_ALIAS: Record<string, Target> = {
  ALL: '전체',
  PREGNANT: '임산부',
  TEEN: '청소년',
  DIETER: '다이어터',

  전체: '전체',
  임산부: '임산부',
  청소년: '청소년',
  다이어터: '다이어터',
}

function normalizeTarget(raw?: string | null): Target {
  const v = (raw ?? '').trim()
  if (!v) return '전체'
  return TARGET_ALIAS[v.toUpperCase()] ?? ((v as Target) || '전체')
}

type Props = {
  title?: string

  /** 강제로 주면 desktopSubtitle을 통째로 대체 */
  subtitle?: string

  helperTitle?: string

  /** 강제로 주면 tipBox 문구를 통째로 대체 */
  helperLabel?: string

  defaultOpen?: boolean
  withSlotPadding?: boolean
}

export function BasicTargetSummaryCard({
  title,
  subtitle,
  helperTitle = '함께 알아두면 좋아요!',
  helperLabel,
  defaultOpen = false,
  withSlotPadding = false,
}: Props) {
  const sp = useSearchParams()

  const category = normalizeCategory(sp.get('category'))
  const target = normalizeTarget(sp.get('target'))

  const content = React.useMemo(() => {
    return getBasicTargetCardContent({ category, target })
  }, [category, target])

  const resolvedTitle = title ?? content.title
  const resolvedDesktopSubtitle = subtitle ?? content.desktopSubtitle
  const resolvedHelperLabel = helperLabel ?? content.helperLabel

  const [open, setOpen] = React.useState(defaultOpen)
  const [isDesktop, setIsDesktop] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(min-width: 740px)')
    const apply = () => setIsDesktop(mq.matches)
    apply()

    const onChange = () => apply()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const isOpen = isDesktop ? true : open

  const card = (
    <section className={styles.card} aria-label="기본 및 대상 요약">
      <div className={styles.content}>
        {isDesktop ? (
          <div className={styles.header}>
            <span className={`typo-h3 text-fg-basic-accent ${styles.title}`}>{resolvedTitle}</span>
          </div>
        ) : (
          <button
            type="button"
            className={styles.header}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={isOpen}
          >
            <span className={`typo-h5 text-fg-basic-accent ${styles.title}`}>{resolvedTitle}</span>

            <span className={isOpen ? styles.moreIconOpen : styles.moreIcon} aria-hidden="true">
              <Image src={iconMore} alt="" width={24} height={24} />
            </span>
          </button>
        )}

        {/* intro/note(또는 타겟 avgComposition)는 데스크탑에서만 보여야 함 */}
        {(isDesktop || isOpen) && (
          <span className={`typo-b3 text-fg-basic-primary ${styles.subtitle}`}>
            {resolvedDesktopSubtitle}
          </span>
        )}
      </div>

      {isOpen && (
        <div className={styles.tipBox}>
          <Image src={iconGuide} alt="" width={20} height={20} />

          <div className={styles.tipTexts}>
            <span className={`typo-b3 text-fg-info-primary ${styles.helperTitle}`}>
              {helperTitle}
            </span>

            <span className={`typo-b4 text-fg-basic-accent ${styles.helperLabel}`}>
              {resolvedHelperLabel}
            </span>
          </div>
        </div>
      )}
    </section>
  )

  if (!withSlotPadding) return card
  return <div className={styles.slot}>{card}</div>
}
