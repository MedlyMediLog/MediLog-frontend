'use client'

import * as React from 'react'
import Image from 'next/image'
import searchIcon from '@/assets/search.png'

import { trackClick } from '@/lib/analytics/clickCounter'

export type SearchInputVariant = 'desktop' | 'mobile'

export type SearchInputProps = {
  variant?: SearchInputVariant
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  onSubmit?: () => void
  onOpen?: () => void
  className?: string
  inputClassName?: string
  'aria-label'?: string
  autoFocus?: boolean
}

export function SearchIcon({ className = '' }: { className?: string }) {
  return <Image src={searchIcon} alt="" width={24} height={24} className={className} />
}

export function SearchInput({
  variant = 'desktop',
  value = '',
  onChange = () => {},
  placeholder = '제조사/브랜드명으로 검색해보세요.',
  disabled = false,
  onSubmit,
  onOpen,
  className = '',
  inputClassName = '',
  'aria-label': ariaLabel = '검색어 입력',
  autoFocus = false,
}: SearchInputProps) {
  const isMobile = variant === 'mobile'

  if (isMobile) {
    return (
      <button
        type="button"
        aria-label="검색 열기"
        disabled={disabled}
        onClick={() => {
          if (disabled) return
          onOpen?.()
        }}
        className={[
          'grid place-items-center w-10 h-10 rounded-full bg-layer-primary',
          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
          className,
        ].join(' ')}
        style={{
          border: '1px solid var(--Color-gray-300, #C1CAD6)',
          background: 'var(--Color-Role-bg-layer-primary, #FBFDFD)',
        }}
      >
        <SearchIcon />
      </button>
    )
  }

  // 데스크탑 검색바
  return (
    <div
      className={[
        'flex items-center p-1 gap-1 rounded-full',
        'w-full',
        disabled ? 'opacity-60 cursor-not-allowed' : '',
        className,
      ].join(' ')}
      style={{
        border: '1px solid var(--Color-gray-300, #C1CAD6)',
        background: 'var(--Color-Role-bg-layer-primary, #FBFDFD)',
      }}
    >
      {/* 검색 버튼 클릭 = search_submit */}
      <button
        type="button"
        aria-label="검색"
        disabled={disabled}
        onClick={() => {
          if (disabled) return
          trackClick('search_submit')
          onSubmit?.()
        }}
        className={[
          'grid place-items-center w-8 h-8 rounded-[50px]',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        <SearchIcon />
      </button>

      <input
        aria-label={ariaLabel}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        autoFocus={autoFocus}
        type="search"
        inputMode="search"
        enterKeyHint="search"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !disabled) {
            trackClick('search_submit')
            onSubmit?.()
          }
        }}
        className={[
          'w-full bg-transparent outline-none typo-b3',
          'text-fg-basic-primary placeholder:text-fg-basic-week',
          inputClassName,
        ].join(' ')}
      />
    </div>
  )
}
