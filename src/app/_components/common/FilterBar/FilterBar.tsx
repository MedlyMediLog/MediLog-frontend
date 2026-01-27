import React from 'react'
import { SearchInput } from '@/app/_components/common/SearchInput'
import type { SearchInputProps } from '@/app/_components/common/SearchInput'
import Button from '@/app/_components/common/Button'
import { trackClick } from '@/lib/analytics/clickCounter'

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
  searchPlaceholder = '제조사/제조명으로 검색해보세요.',
  disabled = false,
  onIconClick,
  autoFocusSearch = false,
  ariaLabelSearch = '검색어 입력',
  className = '',
}: FilterBarProps) {
  const shouldShowSearching = variant === 'searching' || (variant === 'mobile' && isSearching)

  const handleSelect = (value: string) => {
    if (disabled) return
    if (value !== selectedValue) {
      trackClick('filter_change')
    }
    onSelect(value)
  }

 
  const renderDesktopSearchInput = (opts?: { autoFocus?: boolean }) => {
    return (
      <SearchInput
        variant="desktop"
        value={searchValue}
        onChange={(v: string) => onSearchChange?.(v)}
        onSubmit={onSearchSubmit}
        placeholder={searchPlaceholder}
        disabled={disabled}
        aria-label={ariaLabelSearch}
        autoFocus={opts?.autoFocus ?? false}
      />
    )
  }

 if (variant === 'select') {
    return (
      <div
        className={[
          'box-border w-full',
          'flex w-full justify-between items-center py-[6px] gap-[var(--Number-12,12px)]',
          className,
        ].join(' ')}
      >
         <div
        className={[
          'flex items-center min-w-0',
          'py-[var(--Number-10,10px)] pr-[10px]',
          'gap-[8px]',
          'rounded-[var(--Number-gap-12,12px)]',
          '[&>button]:whitespace-nowrap [&>button]:flex-none',
        ].join(' ')}
      >
          {options.map((opt) => {
            const active = opt.value === selectedValue
            return (
              <Button
                key={opt.value}
                shape="square"
                variant={active ? 'primary' : 'secondary'}
                disabled={disabled}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </Button>
            )
          })}
        </div>

        <div
        className={[
          'min-w-0',
          'min-w-0 max-w-[350px] flex-1',
        ].join(' ')}
      >
          {renderDesktopSearchInput()}
        </div>
      </div>
    )
  }

 if (shouldShowSearching) {
  const isMobileSearching = variant === 'mobile' && isSearching

  return (
    <div className={['box-border w-full', className].join(' ')}>
      <div
        className={[
          'items-center gap-[var(--Number-12,12px)] flex-[1_0_0] min-w-0',
          isMobileSearching ? 'inline-flex w-full' : 'flex justify-center',
        ].join(' ')}
      >
        <div
          className={[
            'min-w-0',
            'max-w-[560px] flex-1',
            isMobileSearching ? 'w-[330px]' : 'self-stretch',
          ].join(' ')}
        >
          {renderDesktopSearchInput({ autoFocus: autoFocusSearch })}
        </div>

        {!hideOptionsWhenSearching && (
          <div
            className={[
              'flex items-center min-w-0',
              'py-[var(--Number-10,10px)] pr-[10px]',
              'gap-[8px]',
              'rounded-[var(--Number-gap-12,12px)]',
              '[&>button]:whitespace-nowrap [&>button]:flex-none',
              'flex-none min-w-0',
              'overflow-x-auto overflow-y-hidden',
              '[-webkit-overflow-scrolling:touch]',
              '[scrollbar-width:none]',
              '[&::-webkit-scrollbar]:hidden',
            ].join(' ')}
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
                  onClick={() => handleSelect(opt.value)}
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
    <div
      className={[
        'box-border w-full flex items-center gap-[var(--Number-12,12px)]',
        className,
      ].join(' ')}
    >
      <div>
        <SearchInput
          variant="mobile"
          disabled={disabled}
          onOpen={disabled ? undefined : onIconClick}
        />
      </div>

      <div className="
            flex items-center min-w-0
            py-[var(--Number-10,10px)] pr-[10px]
            gap-[8px] rounded-[var(--Number-gap-12,12px)]
            [&>button]:whitespace-nowrap [&>button]:flex-none
            flex-none overflow-x-auto overflow-y-hidden
            [-webkit-overflow-scrolling:touch]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          " aria-label="필터 선택">
        {options.map((opt) => {
          const active = opt.value === selectedValue
          return (
            <Button
              key={opt.value}
              shape="square"
              variant={active ? 'primary' : 'secondary'}
              disabled={disabled}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}