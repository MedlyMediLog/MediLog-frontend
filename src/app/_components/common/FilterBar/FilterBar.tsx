import React from 'react'
import { SearchInput } from '@/app/_components/common/SearchInput'
import type { SearchInputProps } from '@/app/_components/common/SearchInput'
import Button from '@/app/_components/common/Button'
import clsx from 'clsx'

export type FilterBarVariant = 'select' | 'mobile' | 'searching'

export type FilterOption = {
  label: string
  value: string
}

export type FilterBarProps = {
  variant: FilterBarVariant
  options: FilterOption[]
  selectedValue: string
  onSelect: (value: string) => void

  searchValue?: string
  onSearchChange?: (value: string) => void
  onSearchSubmit?: () => void
  searchPlaceholder?: string
  disabled?: boolean
  onIconClick?: () => void
  ariaLabelSearch?: SearchInputProps['aria-label']
  className?: string
}

export function FilterBar({
  variant,
  options,
  selectedValue,
  onSelect,
  searchValue = '',
  onSearchChange,
  onSearchSubmit,
  searchPlaceholder = '제조사/브랜드명으로 검색해보세요.',
  disabled = false,
  onIconClick,
  ariaLabelSearch = '검색어 입력',
  className = '',
}: FilterBarProps) {
  /* desktop */
  if (variant === 'select') {
    return (
      <div
        className={clsx(
          'flex w-full items-center justify-between gap-3 box-border',
          className
        )}
      >
        <div className="flex items-center gap-2 pr-2 rounded-[12px] py-2.5">
          {options.map((opt) => {
            const active = opt.value === selectedValue
            return (
              <Button
                key={opt.value}
                shape="square"
                variant={active ? 'primary' : 'secondary'}
                disabled={disabled}
                onClick={() => onSelect(opt.value)}
              >
                {opt.label}
              </Button>
            )
          })}
        </div>

        <div className="flex-1 min-w-[260px] max-w-[350px]">
          <SearchInput
            variant="desktop"
            value={searchValue}
            onChange={(v) => onSearchChange?.(v)}
            onSubmit={onSearchSubmit}
            placeholder={searchPlaceholder}
            disabled={disabled}
            aria-label={ariaLabelSearch}
          />
        </div>
      </div>
    )
  }

  /* mobile */
  if (variant === 'mobile') {
    return (
      <div className={clsx('flex w-full items-center gap-3', className)}>
        {/* 검색 아이콘 */}
        <div className="shrink-0">
          <SearchInput
            variant="mobile"
            disabled={disabled}
            onSubmit={disabled ? undefined : onIconClick}
          />
        </div>

        {/* 칩 스크롤 영역 */}
        <div
          className="
            flex-1 min-w-0
            flex items-center gap-2
            overflow-x-auto overflow-y-hidden
            whitespace-nowrap
            [-webkit-overflow-scrolling:touch]
            scrollbar-none
            py-2.5
          "
          aria-label="필터 선택"
        >
          {options.map((opt) => {
            const active = opt.value === selectedValue
            return (
              <Button
                key={opt.value}
                shape="square"
                variant={active ? 'primary' : 'secondary'}
                disabled={disabled}
                onClick={() => onSelect(opt.value)}
           
              >
                {opt.label}
              </Button>
            )
          })}
        </div>
      </div>
    )
  }

  /* searching */
  return (
    <div className={clsx('flex w-full items-center gap-3', className)}>
      <div className="flex-1 min-w-[330px] max-w-[560px]">
        <SearchInput
          variant="desktop"
          value={searchValue}
          onChange={(v) => onSearchChange?.(v)}
          onSubmit={onSearchSubmit}
          placeholder={searchPlaceholder}
          disabled={disabled}
          aria-label={ariaLabelSearch}
        />
      </div>

      <div
        className="
          flex-1 min-w-0
          flex items-center gap-2
          overflow-x-auto overflow-y-hidden
          whitespace-nowrap
          [-webkit-overflow-scrolling:touch]
          scrollbar-none
        "
        aria-label="필터 선택"
      >
        {options.map((opt) => {
          const active = opt.value === selectedValue
          return (
            <Button
              key={opt.value}
              shape="square"
              variant={active ? 'primary' : 'secondary'}
              disabled={disabled}
              onClick={() => onSelect(opt.value)}
            
            >
              {opt.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
