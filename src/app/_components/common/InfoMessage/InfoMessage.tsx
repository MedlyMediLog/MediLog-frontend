//src/app/_components/common/InfoMessage/InfoMessage.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import type { InfoMessageProps } from './InfoMessage.types';
import infoPng from '@/assets/product-listing/icons/icon-info.png';

export function InfoMessage({
  message,
  icon,
  showDefaultIcon = true,
  className,
  minHeight, // (필요하면 외부에서 줄 수 있게 유지)
}: InfoMessageProps) {
  const shouldShowDefault = !icon && showDefaultIcon;

  return (
    <div
      className={[
        // ✅ 피그마: 배경 없는 인라인 안내
        'w-full',
        'flex items-center',
        className ?? '',
      ].join(' ')}
      style={minHeight ? { minHeight } : undefined}
      role="status"
      aria-live="polite"
    >
      {/* ✅ 피그마: height 28 / padding 10px 0 / gap 4px / max-width 485 */}
      <div className="inline-flex items-center gap-[4px] py-[10px] max-w-[485px]">
        {icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : shouldShowDefault ? (
          <Image
            src={infoPng}
            alt=""
            width={20}
            height={20}
            className="flex-shrink-0"
          />
        ) : null}

        {/* ✅ 피그마: B4, 파란색(Info Primary) */}
        <span className="typo-b4 text-fg-info-primary break-keep">
          {message}
        </span>
      </div>
    </div>
  );
}
