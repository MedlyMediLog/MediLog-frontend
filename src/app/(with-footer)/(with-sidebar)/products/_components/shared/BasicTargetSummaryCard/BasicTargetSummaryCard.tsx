'use client'

import React from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

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

type ToggleButtonProps = {
  placement: 'top' | 'bottom'
  isOpen: boolean
  onToggle: () => void
}

function ToggleButton({ placement, isOpen, onToggle }: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className={[
        'flex items-center gap-[6px]',
        'h-[24px]',
        'bg-transparent border-0 p-0',
        'text-left cursor-pointer',
        placement === 'bottom' ? 'self-start' : '',
      ].join(' ')}
    >
      <span className="typo-b4 text-fg-basic-primary">
        {isOpen ? '숨기기' : '자세히보기'}
      </span>

      <span
        aria-hidden="true"
        className={[
          'flex items-center justify-center flex-none',
          'transition-transform duration-[160ms] ease-[ease]',
          isOpen ? 'rotate-180' : 'rotate-0',
        ].join(' ')}
      >
        <Image src={iconMore} alt="" width={24} height={24} />
      </span>
    </button>
  )
}

type Props = {
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
    const mq = window.matchMedia('(min-width: 740px)')
    const apply = () => setIsDesktop(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const isOpen = isDesktop ? true : open

  const card = (
    <section
      aria-label="기본 및 대상 요약"
      className={[
        'flex w-full max-w-full min-w-0 flex-col items-start justify-center',
        'box-border py-[10px] gap-[12px] rounded-[12px]',
      ].join(' ')}
    >
      <div className="flex w-full min-w-0 flex-col items-start gap-[4px]">
        <div className="flex flex-col w-full min-w-0 gap-[6px]">
          <div className="flex w-full items-center">
            <span className="typo-h2 text-gray-1000">{resolvedTitle}</span>
          </div>

          {!isDesktop && !isOpen && (
            <ToggleButton
              placement="top"
              isOpen={isOpen}
              onToggle={() => setOpen((v) => !v)}
            />
          )}
        </div>

        {(isDesktop || isOpen) && (
          <span className="typo-b3 text-fg-basic-primary min-w-0 self-stretch block overflow-visible">
            {resolvedDesktopSubtitle}
          </span>
        )}
      </div>

      {isOpen && (
        <div
          className={[
            'flex w-full min-w-0 items-start self-stretch bg-blue-200',
            'px-[8px] py-[10px] gap-[4px] rounded-[8px]',
          ].join(' ')}
        >
          <Image src={iconGuide} alt="" width={20} height={20} />
          <div className="flex flex-1 min-w-0 flex-col items-start gap-[4px]">
            <span className="typo-b3 text-fg-info-primary min-w-0">
              {helperTitle}
            </span>
            <span className="typo-b4 text-fg-basic-accent min-w-0 self-stretch overflow-hidden max-h-[42px]">
              {resolvedHelperLabel}
            </span>
          </div>
        </div>
      )}

      {!isDesktop && isOpen && (
        <ToggleButton
          placement="bottom"
          isOpen={isOpen}
          onToggle={() => setOpen((v) => !v)}
        />
      )}
    </section>
  )

  if (!withSlotPadding) return card
  return <div className="w-full box-border">{card}</div>
}
