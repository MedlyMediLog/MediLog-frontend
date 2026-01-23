// src/app/_components/common/FilterBar/FilterBar.tsx
import React from 'react'
import { SearchInput } from '@/app/_components/common/SearchInput'
import type { SearchInputProps } from '@/app/_components/common/SearchInput'
import Button from '@/app/_components/common/Button'

export type FilterBarVariant = 'select' | 'mobile' | 'searching'

export type FilterOption = {
  label: string
  value: string
}

export type FilterBarProps = {
  variant: FilterBarVariant
  isSearching: boolean
  hideOptionsWhenSearching?: boolean

  options: FilterOption[]
  selectedValue: string
  onSelect: (value: string) => void

  searchValue?: string
  onSearchChange?: (value: string) => void
  onSearchSubmit?: () => void

  searchPlaceholder?: string
  disabled?: boolean
  onIconClick?: () => void

  autoFocusSearch?: boolean

  ariaLabelSearch?: SearchInputProps['aria-label']
  className?: string
}

export function FilterBar({
  variant,
  isSearching,
  hideOptionsWhenSearching = false,
  options,
  selectedValue,
  onSelect,
  searchValue = '',
  onSearchChange,
  onSearchSubmit,
  searchPlaceholder = '제조사/브랜드명으로 검색해보세요.',
  disabled = false,
  onIconClick,
  autoFocusSearch = false,
  ariaLabelSearch = '검색어 입력',
  className = '',
}: FilterBarProps) {
  const shouldShowSearching = variant === 'searching' || (variant === 'mobile' && isSearching)

  const OptionGroup = () => (
    <div
      className={[
        'flex items-center gap-2',
        'min-w-0',
        'shrink-0',
        'overflow-x-auto whitespace-nowrap',
        '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
      ].join(' ')}
      aria-label="필터 선택"
    >
      {options.map((opt) => {
        const active = opt.value === selectedValue
        return (
          <div key={opt.value} className="shrink-0">
            <Button
              shape="square"
              variant={active ? 'primary' : 'secondary'}
              disabled={disabled}
              onClick={() => onSelect(opt.value)}
            >
              {opt.label}
            </Button>
          </div>
        )
      })}
    </div>
  )

  const base = `box-border w-full ${className}`

  if (variant === 'select') {
    return (
      <div className={`${base} flex items-center justify-between gap-3`}>
        <OptionGroup />

        <div className="flex-1 basis-0 min-w-0 min-w-[260px] max-w-[350px]">
          <SearchInput
            variant="desktop"
            value={searchValue}
            onChange={(v: string) => onSearchChange?.(v)}
            onSubmit={onSearchSubmit}
            placeholder={searchPlaceholder}
            disabled={disabled}
            aria-label={ariaLabelSearch}
          />
        </div>
      </div>
    )
  }

  if (shouldShowSearching) {
    return (
      <div className={`${base} flex items-center gap-3`}>
        <div className="flex items-center gap-3 flex-1 basis-0 min-w-0">
          {/* ✅ 피그마 스펙: min 330 / max 560 / stretch */}
          <div className="flex-1 basis-0 min-w-0 min-w-[330px] max-w-[560px] self-stretch">
            <SearchInput
              variant="desktop"
              value={searchValue}
              onChange={(v: string) => onSearchChange?.(v)}
              onSubmit={onSearchSubmit}
              placeholder={searchPlaceholder}
              disabled={disabled}
              aria-label={ariaLabelSearch}
              autoFocus={autoFocusSearch}
            />
          </div>

          {!hideOptionsWhenSearching && <OptionGroup />}
        </div>
      </div>
    )
  }

  return (
    <div className={`${base} flex items-center gap-3`}>
      {/* 검색 아이콘 영역 */}
      <div className="shrink-0">
        <SearchInput
          variant="mobile"
          disabled={disabled}
          onOpen={disabled ? undefined : onIconClick}
        />
      </div>

      <OptionGroup />
    </div>
  )
}
