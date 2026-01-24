'use client'

import React from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import styles from './BasicTargetSummaryCard.module.css'

import iconGuide from '@/assets/product-listing/icons/mobile/icon-guide.svg'
import iconMore from '@/assets/product-listing/icons/mobile/icon-more.svg'

import { getTargetSummaryContent } from '@/lib/utils/targetSummaryByCategory'

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

type Props = {
  /** 외부에서 강제로 주고 싶으면 그대로 덮어쓸 수 있게 유지 */
  title?: string
  subtitle?: string
  helperTitle?: string
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

  // URL에서 category 읽기 (없으면 null)
  const rawCategory = sp.get('category')
  const normalizedCategory = normalizeCategory(rawCategory)

  // 파일에 있는 매핑 데이터로 문구 가져오기
  const content = React.useMemo(() => {
    return getTargetSummaryContent(normalizedCategory)
  }, [normalizedCategory])

  // props가 들어오면 우선 사용, 없으면 content 사용
  const resolvedTitle = title ?? content.title
  const resolvedSubtitle =
    subtitle ?? `${content.sentenceIntro} ${content.sentenceNote}`
  const resolvedHelperLabel = helperLabel ?? content.sentenceAvgComposition

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

  // 데스크탑은 항상 열린 상태(설계 유지)
  const isOpen = isDesktop ? true : open

  const card = (
    <section className={styles.card} aria-label="기본 및 대상 요약">
      <div className={styles.content}>
        {isDesktop ? (
          <div className={styles.header}>
            <span className={`typo-h3 text-fg-basic-accent ${styles.title}`}>
              {resolvedTitle}
            </span>
          </div>
        ) : (
          <button
            type="button"
            className={styles.header}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={isOpen}
          >
            <span className={`typo-h5 text-fg-basic-accent ${styles.title}`}>
              {resolvedTitle}
            </span>

            <span className={isOpen ? styles.moreIconOpen : styles.moreIcon} aria-hidden="true">
              <Image src={iconMore} alt="" width={24} height={24} />
            </span>
          </button>
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

            {/* 필요하면 disclaimer도 여기 한 줄로 붙일 수 있음
            <span className={`typo-b4 text-fg-basic-secondary ${styles.disclaimer}`}>
              {content.disclaimer}
            </span>
            */}
          </div>
        </div>
      )}
    </section>
  )

  if (!withSlotPadding) return card
  return <div className={styles.slot}>{card}</div>
}
