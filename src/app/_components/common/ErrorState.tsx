// src/app/_components/common/ErrorState.tsx
'use client'
import Image from 'next/image'
import Button from './Button'
import error from '@/assets/error.png'

interface ErrorStateProps {
  /** 예: "5XX errors", "404 error" */
  code: string

  /** 에러 설명 (줄바꿈 가능) */
  description: string

  /** 버튼 텍스트 */
  actionLabel: string

  /** 버튼 클릭 핸들러 */
  onAction?: () => void
}

export function ErrorState({ code, description, actionLabel, onAction }: ErrorStateProps) {
  return (
    <div className="w-full flex flex-col items-center py-[60px] gap-[24px] max-w-[295px] rounded-[12px]">
      {/* 에러 묶음 */}
      <div className="flex flex-col items-center gap-[4px]">
        <div className="typo-d1 text-gray-300">ERROR</div>

        <span className="relative w-[150px] h-[150px]">
          <Image src={error} alt="" fill className="object-contain" priority />
        </span>

        <div className="typo-b1 text-fg-basic-accent whitespace-pre-line text-center">
          {description}
        </div>
      </div>

      {/* 버튼 */}
      <Button variant="primary" shape="rounded" onClick={onAction}>
        {actionLabel}
      </Button>
    </div>
  )
}
