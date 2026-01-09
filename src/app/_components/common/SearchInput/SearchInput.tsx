'use client'

import * as React from 'react'
import Image from 'next/image'
import searchIcon from '@/assets/search.png'

export type SearchInputVariant = 'desktop' | 'mobile'

export type SearchInputProps = {
  variant?: SearchInputVariant

  /** desktop에서만 입력값 사용 (mobile은 아이콘 버튼만) */
  value?: string
  onChange?: (value: string) => void

  placeholder?: string
  disabled?: boolean

  /** 검색 실행(아이콘 클릭/Enter) */
  onSubmit?: () => void

  className?: string
  inputClassName?: string
  'aria-label'?: string
}

function SearchIcon({ className = '' }: { className?: string }) {
  return (
    <Image
      src={searchIcon}
      alt=""
      width={24}
      height={24}
      className={className}
      priority={false}
    />
  )
}

export function SearchInput({
  variant = 'desktop',
  value = '',
  onChange = () => {},
  placeholder = '제조사/브랜드명으로 검색해보세요.',
  disabled = false,
  onSubmit,
  className = '',
  inputClassName = '',
  'aria-label': ariaLabel = '검색어 입력',
}: SearchInputProps) {
  const isMobile = variant === 'mobile'

  if (isMobile) {
    return (
      <button
        type="button"
        aria-label="검색"
        disabled={disabled}
        onClick={disabled ? undefined : onSubmit}
        className={[
          'grid place-items-center',
          'w-8 h-8 rounded-[50px]',
          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
          className,
        ].join(' ')}
      >
        <SearchIcon />
      </button>
    )
  }

  const containerClass = [
    'flex items-center',
    'p-1',
    'gap-1',
    'rounded-full',
    'bg-layer-primary',
    'w-[348px] max-w-[560px]',
    disabled ? 'opacity-60 cursor-not-allowed' : '',
    className,
  ].join(' ')

  const iconWrapClass = [
    'grid place-items-center',
    'w-8 h-8',
    'rounded-[50px]',
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
  ].join(' ')

  return (
    <div
      className={containerClass}
      style={{
        border: '1px solid var(--color-gray-300)',
        background: 'var(--bg-layer-primary)',
      }}
    >
      <button
        type="button"
        aria-label="검색"
        disabled={disabled}
        onClick={disabled ? undefined : onSubmit}
        className={iconWrapClass}
      >
        <SearchIcon />
      </button>

      <input
        aria-label={ariaLabel}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !disabled) onSubmit?.()
        }}
        className={[
          'w-full bg-transparent outline-none',
          'typo-b3',
          'text-fg-basic-primary',
          'placeholder:text-fg-basic-week',
          inputClassName,
        ].join(' ')}
      />
    </div>
  )
}
