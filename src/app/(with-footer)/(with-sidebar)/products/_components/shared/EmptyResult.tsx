//src/app/(with-footer)/(with-sidebar)/products/_components/shared/EmptyResult.tsx
'use client'

import React from 'react'
import Image from 'next/image'

import Button from '@/app/_components/common/Button'
import errorImg from '@/assets/product-listing/icons/EmptyResult.png'

type EmptyResultProps = {
  title?: string
  message: string
  buttonText?: string
  onClick?: () => void
  className?: string
}

export function EmptyResult({
  title = '1XX errors',
  message,
  buttonText = '다시 찾아보기',
  onClick,
  className = '',
}: EmptyResultProps) {
  return (
    <div
      className={[
        'flex flex-col items-center',
        'py-[60px]',
        'gap-[24px]',
        'rounded-[12px]',
        className,
      ].join(' ')}
    >
      <p
        className={[
          'text-center',
          'font-[700]',
          'text-[60px]',
          'leading-[90px]',
          'tracking-[-1.2px]',
          'text-[var(--Color-gray-300,#C1CAD6)]',
        ].join(' ')}
      >
        {title}
      </p>

      <div className="flex items-center justify-center w-[150px] h-[150px] rounded-[20px] overflow-hidden">
        <Image
          src={errorImg}
          alt="에러 상태 이미지"
          width={150}
          height={150}
          className="h-full w-full object-cover"
        />
      </div>

      <p
        className={[
          'text-center',
          'whitespace-pre-line',
          'font-[500]',
          'text-[18px]',
          'leading-[27px]',
          'tracking-[-0.36px]',
          'text-[var(--Color-Role-fg-basic-accent,#242A30)]',
        ].join(' ')}
      >
        {message}
      </p>

      <Button variant="primary" shape="rounded" onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  )
}
