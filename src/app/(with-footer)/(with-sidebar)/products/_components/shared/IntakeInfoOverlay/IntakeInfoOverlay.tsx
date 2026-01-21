// src/app/product-listing/_components/shared/IntakeInfoOverlay/IntakeInfoOverlay.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import Button from '@/app/_components/common/Button'

import iconSafe from '@/assets/product-listing/icons/mobile/icon-safety.svg'
import iconCaution from '@/assets/product-listing/icons/mobile/icon-status-warning.svg'

type Props = {
  open: boolean
  onClose: () => void
}

export function IntakeInfoOverlay({ open, onClose }: Props) {
  // ✅ ESC로 닫기
  React.useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  // ✅ 열려있을 때 body 스크롤 잠금(모바일 UX)
  React.useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return (
    // ✅ 모바일에서만 렌더링
    <div className="md:hidden fixed inset-0 z-[100]">
      {/* ✅ Frame 112: overlay 배경 (피그마 토큰/값 반영) */}
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 bg-[var(--Color-Role-bg-layer-overlay,rgba(50,60,72,0.80))]"
      />

      {/* Center */}
      <div className="absolute inset-0 flex items-center justify-center px-[35px]">
        {/* ✅ 안내 문구 영역(피그마: 305x197 / radius 20 / bg primary) */}
        <div
          className={[
            'w-[305px] h-[197px]',
            'flex flex-col items-center justify-end',
            'rounded-[20px]',
            'bg-[var(--Color-Role-bg-layer-primary,#FBFDFD)]',
            'overflow-hidden',
          ].join(' ')}
        >
          {/* 상단: 아이콘 + 텍스트 */}
          <div className="w-full px-[20px] pb-[16px] flex flex-col items-center">
            {/* ✅ 아이콘 영역 (피그마: 아이콘 32x32 / padding 상하 8, 좌우 24) */}
            <div className="flex items-center justify-center px-[24px] py-[8px] gap-[8px]">
              <Image src={iconSafe} alt="섭취 가능" width={32} height={32} />
              <Image src={iconCaution} alt="섭취 고려" width={32} height={32} />
            </div>

            {/* ✅ 텍스트(피그마 B3) + '섭취 가능'만 bold */}
            <p
              className={[
                'self-stretch',
                'text-center whitespace-pre-line',
                'text-[var(--Color-Role-fg-basic-accent,#242A30)]',
                'text-[14px]',
                'font-[400]',
                'leading-[150%]',
                'tracking-[-0.28px]',
              ].join(' ')}
            >
              위 아이콘은 각각 <span className="font-[700]">섭취 가능</span>과 섭취 고려
              표시에요.{'\n'}
              섭취 고려 제품은 주의사항이 있으니 꼭 확인하세요.
            </p>
          </div>

          {/* ✅ 버튼 영역(피그마: height 65 / padding 10 / gap 12 / border 0.5 / stretch) */}
          <div
            className={[
              'w-full',
              'h-[65px]',
              'flex items-center justify-center',
              'gap-[12px]',
              'p-[10px]',
              'flex-shrink-0',
              'self-stretch',
              // 0.5px 라인 느낌: inset shadow로 처리
              'shadow-[inset_0_0.5px_0_var(--Color-gray-200,#DCE4ED)]',
            ].join(' ')}
          >
            {/* ✅ 버튼(공통 Button: primary + square) → 피그마 값과 일치 */}
            <Button variant="primary" shape="square" onClick={onClose}>
              닫기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}