import React from 'react'
import './FilterBar.css'
import { SearchInput } from '../SearchInput'
import type { SearchInputProps } from '../SearchInput'

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

function Chip({
  active,
  children,
  onClick,
  disabled,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      className={`medly-chip ${active ? 'medly-chip--active' : ''}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-pressed={active}
    >
      {children}
    </button>
  )
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
          {options.map((opt) => (
            <Chip
              key={opt.value}
              active={opt.value === selectedValue}
              onClick={() => onSelect(opt.value)}
              disabled={disabled}
            >
              {opt.label}
            </Chip>
          ))}
        </div>

        {/* ✅ 피그마: min 260 / max 350 / flex 1 0 0 */}
        <div style={{ flex: '1 0 0', minWidth: 260, maxWidth: 350 }}>
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
        {/* ✅ 피그마: 아이콘만 (search.png) */}
        <div style={{ flex: '0 0 auto' }}>
          <SearchInput
            variant="mobile"
            disabled={disabled}
            onSubmit={disabled ? undefined : onIconClick}
          />
        </div>

        {/* ✅ 칩 영역만 가로 스와이프 */}
        <div className="medly-filtergroup medly-filtergroup--fixed" aria-label="필터 선택">
          {options.map((opt) => (
            <Chip
              key={opt.value}
              active={opt.value === selectedValue}
              onClick={() => onSelect(opt.value)}
              disabled={disabled}
            >
              {opt.label}
            </Chip>
          ))}
        </div>
      </div>
    )
  }

  // searching
  return (
    <div className={`medly-filterbar medly-filterbar--searching ${className}`}>
      {/* ✅ 피그마: min 330 / max 560 / flex 1 0 0 */}
      <div style={{ flex: '1 0 0', minWidth: 330, maxWidth: 560 }}>
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

      {/* ✅ 칩 영역만 가로 스와이프 */}
      <div className="medly-filtergroup medly-filtergroup--fixed" aria-label="필터 선택">
        {options.map((opt) => (
          <Chip
            key={opt.value}
            active={opt.value === selectedValue}
            onClick={() => onSelect(opt.value)}
            disabled={disabled}
          >
            {opt.label}
          </Chip>
        ))}
      </div>
    </div>
  )
}
