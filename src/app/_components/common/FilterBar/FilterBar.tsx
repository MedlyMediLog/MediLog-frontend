//src/app/_components/common/FilterBar/FilterBar.tsx 
import React from 'react'
import './FilterBar.css'
import { SearchInput } from '@/app/_components/common/SearchInput'
import type { SearchInputProps } from '@/app/_components/common/SearchInput'
import Button from '@/app/_components/common/Button'

export type FilterBarVariant = 'select' | 'mobile' | 'searching'

export type FilterOption = {
  label: string
  value: string
}

export type FilterBarProps = {
  /** 피그마 형태: select / 모바일 / 검색중 */
  variant: FilterBarVariant

  /** 칩 목록 */
  options: FilterOption[]
  /** 선택된 value (단일 선택) */
  selectedValue: string
  onSelect: (value: string) => void

  /** 검색 input value */
  searchValue?: string
  onSearchChange?: (value: string) => void
  onSearchSubmit?: () => void

  searchPlaceholder?: string
  disabled?: boolean

  /** 모바일(아이콘만) 클릭 */
  onIconClick?: () => void

  /** aria */
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
  if (variant === 'select') {
    return (
      <div className={`medly-filterbar medly-filterbar--select ${className}`}>
        <div className="medly-filtergroup">
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

        <div className="medly-filterbar__search medly-filterbar__search--select">
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

  if (variant === 'mobile') {
    return (
      <div className={`medly-filterbar medly-filterbar--mobile ${className}`}>
        <div className="medly-filterbar__icon">
          <SearchInput
            variant="mobile"
            disabled={disabled}
            onSubmit={disabled ? undefined : onIconClick}
          />
        </div>

        <div className="medly-filtergroup medly-filtergroup--fixed" aria-label="필터 선택">
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

  // searching
  return (
    <div className={`medly-filterbar medly-filterbar--searching ${className}`}>
      <div className="medly-filterbar__search medly-filterbar__search--searching">
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

      <div className="medly-filtergroup medly-filtergroup--fixed" aria-label="필터 선택">
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
