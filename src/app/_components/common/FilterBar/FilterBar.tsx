import React from 'react';
import './FilterBar.css';

export type FilterBarVariant = 'select' | 'mobile' | 'searching';

export type FilterOption = {
  label: string;
  value: string;
};

export type FilterBarProps = {
  /** 피그마 형태: select / 모바일 / 검색중 */
  variant: FilterBarVariant;

  /** 칩 목록 */
  options: FilterOption[];
  /** 선택된 value (단일 선택으로 구현했지만, 필요하면 배열로 바꿔도 됨) */
  selectedValue: string;
  onSelect: (value: string) => void;

  /** 검색 UI가 필요한 형태에서 사용 */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;

  /** 모바일 형태에서 아이콘 버튼 클릭(필요 없으면 안 넣어도 됨) */
  onIconClick?: () => void;

  /** 접근성 */
  ariaLabelSearch?: string;
};

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`medly-chip ${active ? 'medly-chip--active' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function SearchBox({
  className,
  value,
  onChange,
  placeholder,
  ariaLabel,
}: {
  className: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  ariaLabel: string;
}) {
  return (
    <div className={className}>
      <span aria-hidden="true" style={{ width: 20, height: 20, display: 'inline-flex', alignItems: 'center' }}>
        🔍
      </span>
      <input
        className="medly-searchinput"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
    </div>
  );
}

export function FilterBar({
  variant,
  options,
  selectedValue,
  onSelect,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = '제조사/브랜드명으로 검색해보세요.',
  onIconClick,
  ariaLabelSearch = '검색어 입력',
}: FilterBarProps) {
  if (variant === 'select') {
    return (
      <div className="medly-filterbar--select">
        <div className="medly-filtergroup">
          {options.map((opt) => (
            <Chip
              key={opt.value}
              active={opt.value === selectedValue}
              onClick={() => onSelect(opt.value)}
            >
              {opt.label}
            </Chip>
          ))}
        </div>

        <SearchBox
          className="medly-searchbox"
          value={searchValue}
          onChange={(v) => onSearchChange?.(v)}
          placeholder={searchPlaceholder}
          ariaLabel={ariaLabelSearch}
        />
      </div>
    );
  }

  if (variant === 'mobile') {
    return (
      <div className="medly-filterbar--mobile">
        <button
          type="button"
          className="medly-iconbutton"
          onClick={onIconClick}
          aria-label="검색 열기"
        >
          🔍
        </button>

        <div className="medly-filtergroup medly-filtergroup--fixed">
          {options.map((opt) => (
            <Chip
              key={opt.value}
              active={opt.value === selectedValue}
              onClick={() => onSelect(opt.value)}
            >
              {opt.label}
            </Chip>
          ))}
        </div>
      </div>
    );
  }

  // searching
  return (
    <div className="medly-filterbar--searching">
      <SearchBox
        className="medly-searchbox--searching"
        value={searchValue}
        onChange={(v) => onSearchChange?.(v)}
        placeholder={searchPlaceholder}
        ariaLabel={ariaLabelSearch}
      />

      <div className="medly-filtergroup medly-filtergroup--fixed">
        {options.map((opt) => (
          <Chip
            key={opt.value}
            active={opt.value === selectedValue}
            onClick={() => onSelect(opt.value)}
          >
            {opt.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
