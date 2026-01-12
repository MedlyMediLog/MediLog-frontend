//src/app/_components/common/QueryResult/QueryResult.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { QueryResultProps } from './QueryResult.types';
import refreshPng from '@/assets/icon_refresh.png';

function cn(...inputs: Array<string | undefined | null | false>) {
  return twMerge(clsx(inputs));
}

// NOTE:
// QueryResult는 페이지/섹션 배경 위에 사용되는 메타 정보 컴포넌트입니다.
// 배경, 패딩, 레이아웃은 상위 컨테이너에서 처리하는 것을 전제로 합니다.

export function QueryResult({
  count,
  label = '조회 결과',
  unit = '개',
  onRefresh,
  showRefresh = true,
  disabled = false,
  className,
  refreshAriaLabel = '새로고침',
  iconSize = 20,
}: QueryResultProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-end gap-[4px] py-[10px]',
        className,
      )}
    >
      <span className="typo-b3 text-fg-basic-primary">
        {label} {count}
        {unit}
      </span>

      {showRefresh && (
        <button
          type="button"
          onClick={onRefresh}
          disabled={disabled}
          aria-label={refreshAriaLabel}
          className={cn(
            'inline-flex items-center justify-center',
            'p-[2.5px] rounded-[5px]',
            // tokens 기반 포커스 (outline 색상을 fg-basic-accent로)
            'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
            'focus-visible:outline-[color:var(--fg-basic-accent)]',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          <Image
            src={refreshPng}
            alt=""
            width={iconSize}
            height={iconSize}
            style={{ width: iconSize, height: iconSize }}
          />
        </button>
      )}
    </div>
  );
}
