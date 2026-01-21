'use client'

import * as React from 'react'
import Image from 'next/image'
import searchIcon from '@/assets/search.png'

export type SearchInputVariant = 'desktop' | 'mobile'

export type SearchInputProps = {
  variant?: SearchInputVariant
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  onSubmit?: () => void
  className?: string
  inputClassName?: string
  'aria-label'?: string
}

export default function SearchIcon({ className = '' }: { className?: string }) {
  return <Image src={searchIcon} alt="" width={24} height={24} className={className} />
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

  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    if (isMobile && open) inputRef.current?.focus()
  }, [isMobile, open])

  // 데스크탑은 기존 그대로
  if (!isMobile) {
    return (
      <div
        className={[
          'flex items-center p-1 gap-1 rounded-full bg-layer-primary',
          'w-[348px] max-w-[560px]',
          disabled ? 'opacity-60 cursor-not-allowed' : '',
          className,
        ].join(' ')}
        style={{
          border: '1px solid var(--color-gray-300)',
          background: 'bg-layer-primary',
        }}
      >
        <button
          type="button"
          aria-label="검색"
          disabled={disabled}
          onClick={disabled ? undefined : onSubmit}
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
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !disabled) onSubmit?.()
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

  // ✅ 모바일: 아이콘 버튼 → 330px 인풋으로 확장
  return (
    <div
      className={[
        'flex items-center p-1 gap-1 rounded-full bg-layer-primary',
        'transition-[width] duration-200 ease-out overflow-hidden',
        open ? 'w-[330px]' : 'w-10', // 40px=아이콘만, 열리면 330px
        disabled ? 'opacity-60' : '',
        className,
      ].join(' ')}
      style={{
        border: '1px solid var(--color-gray-300)',
        background: 'var(--bg-layer-primary)',
      }}
    >
      <button
        type="button"
        aria-label={open ? '검색 실행' : '검색 열기'}
        disabled={disabled}
        onClick={() => {
          if (disabled) return
          if (!open) {
            setOpen(true)
            return
          }
          onSubmit?.()
        }}
        className={[
          'grid place-items-center w-8 h-8 rounded-[50px] shrink-0',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        <SearchIcon />
      </button>

      <input
        ref={inputRef}
        aria-label={ariaLabel}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !disabled) onSubmit?.()
          if (e.key === 'Escape') setOpen(false)
        }}
        onBlur={() => {
          // 값 없으면 닫기(원하는 UX에 맞게)
          if (!value) setOpen(false)
        }}
        className={[
          'bg-transparent outline-none typo-b3',
          'text-fg-basic-primary placeholder:text-fg-basic-week',
          'min-w-0 flex-1', // ✅ 폭 계산 안정화
          open ? 'opacity-100' : 'opacity-0 pointer-events-none',
          'transition-opacity duration-150',
          inputClassName,
        ].join(' ')}
      />
    </div>
  )
}
