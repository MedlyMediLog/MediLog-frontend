'use client';

import React from 'react';
import Image from 'next/image';
import type { InfoMessageProps } from './InfoMessage.types';
import infoCirclePng from '@/assets/infocircle.png';

export function InfoMessage({
  message,
  icon,
  showDefaultIcon = true,
  className,
  minHeight = 100,
}: InfoMessageProps) {
  const shouldShowDefault = !icon && showDefaultIcon;

  return (
    <div
      className={[
        // ✅ globals.css 토큰 기반
        'bg-layer-week rounded-[5px]',
        // ✅ 반응형: 부모 폭에 맞춰 늘어남
        'w-full',
        // ✅ 피그마 높이(100)는 최소 높이로 유지
        'flex items-center justify-center',
        className ?? '',
      ].join(' ')}
      style={{ minHeight }}
      role="status"
      aria-live="polite"
    >
      {/* ✅ 피그마: inline-flex / gap 4px / padding 10px 0 */}
      <div className="inline-flex items-center gap-[4px] py-[10px] px-4">
        {icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : shouldShowDefault ? (
          <Image
            src={infoCirclePng}
            alt=""
            width={20}
            height={20}
            className="flex-shrink-0"
          />
        ) : null}

        {/* ✅ typo-b5 + fg-basic-accent (globals.css 유틸) */}
        <span className="typo-b5 text-fg-basic-accent text-center break-keep">
          {message}
        </span>
      </div>
    </div>
  );
}
