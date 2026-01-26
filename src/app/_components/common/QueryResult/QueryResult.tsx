'use client'

import React from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { QueryResultProps } from './QueryResult.types'
import refreshPng from '@/assets/icon_refresh.svg'

function cn(...inputs: Array<string | undefined | null | false>) {
  return twMerge(clsx(inputs))
}

export function QueryResult({
  count,
  label = '조회 결과',
  unit = '개',
  onRefresh,
  showRefresh = true,
  disabled = false,
  className,
  refreshAriaLabel = '새로고침',
  iconSize = 20,
}: QueryResultProps) {
  const canRefresh = !disabled && typeof onRefresh === 'function'

  const formattedCount = count.toLocaleString('ko-KR')

  const handleRefreshClick = () => {
    window.location.reload()
  }

  return (
    <div className={cn('inline-flex items-center justify-end gap-[4px] py-[10px]', className)}>
      <span className="typo-b3 text-fg-basic-primary">
        {label} {formattedCount}
        {unit}
      </span>

      {showRefresh && (
        <button
          type="button"
          onClick={handleRefreshClick}
          disabled={!canRefresh}
          aria-label={refreshAriaLabel}
          className={cn(
            'inline-flex items-center justify-center cursor-pointer',
            'rounded-[5px]',
            'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
            'focus-visible:outline-[color:var(--fg-basic-accent)]',
            !canRefresh && 'opacity-50 cursor-not-allowed',
          )}
        >
          <Image src={refreshPng} alt="" width={iconSize} height={iconSize} />
        </button>
      )}
    </div>
  )
}
