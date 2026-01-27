'use client'
import Image from 'next/image'
import Button from './Button'
import error from '@/assets/error.png'

interface ErrorStateProps {
  code: string
  description: string
  actionLabel: string
  onAction?: () => void
}

export function ErrorState({ code, description, actionLabel, onAction }: ErrorStateProps) {
  return (
    <div className="w-full flex flex-col items-center py-[60px] gap-[24px] max-w-[295px] rounded-[12px]">
      <div className="flex flex-col items-center gap-[4px]">
        <div className="typo-d1 text-gray-300">ERROR</div>
        <span className="relative w-[150px] h-[150px]">
          <Image src={error} alt="" fill className="object-contain" priority />
        </span>

        <div className="typo-b1 text-fg-basic-accent whitespace-pre-line text-center">
          {description}
        </div>
      </div>
      <Button variant="primary" shape="rounded" onClick={onAction}>
        {actionLabel}
      </Button>
    </div>
  )
}
