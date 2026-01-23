// src/app/_components/common/FilterBar/FilterBar.tsx
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

  /** ✅ 오버레이 열릴 때 바로 포커스 */
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
      <div
        className={[
          'medly-filterbar',
          'medly-filterbar--searching',
          variant === 'mobile' && isSearching ? 'medly-filterbar--mobileSearching' : '',
          className,
        ].join(' ')}
      >
        <div className="medly-filterbar__searchRow">
          <div className="medly-filterbar__search medly-filterbar__search--searching">
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

          {!hideOptionsWhenSearching && (
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
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`medly-filterbar medly-filterbar--mobile ${className}`}>
      <div className="medly-filterbar__icon">
        <SearchInput variant="mobile" disabled={disabled} onOpen={disabled ? undefined : onIconClick} />
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
