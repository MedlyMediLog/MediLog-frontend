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
  minHeight, 
}: InfoMessageProps) {
  const shouldShowDefault = !icon && showDefaultIcon;

  return (
    <div
      className={[
        'w-full',
        'flex items-center',
        className ?? '',
      ].join(' ')}
      style={minHeight ? { minHeight } : undefined}
      role="status"
      aria-live="polite"
    >
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

        <span className="typo-b4 text-fg-info-primary break-keep">
          {message}
        </span>
      </div>
    </div>
  );
}
