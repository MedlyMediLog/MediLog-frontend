// src/app/product-listing/_components/EmptyResult.tsx
'use client'

import React from 'react'
import Image from 'next/image'

// ✅ 공통 컴포넌트 Button 사용
import Button from '@/app/_components/common/Button'

// ✅ 에러 이미지 (현재 저장 위치 기준)
import errorImg from '@/assets/product-listing/icons/EmptyResult.png'

type EmptyResultProps = {
  /** D1 타이틀 (피그마: 1XX errors) */
  title?: string
  /** B1 설명 문구 (두 줄 가능) */
  message: string
  /** 버튼 텍스트 (피그마: 다시 찾아보기) */
  buttonText?: string
  /** 버튼 클릭 */
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
        /**
         * ✅ 에러문구(피그마)
         * display:flex;
         * padding: 60px 0;
         * flex-direction:column;
         * align-items:center;
         * gap:24px;
         * border-radius:12px;
         */
        'flex flex-col items-center',
        'py-[60px]',
        'gap-[24px]',
        'rounded-[12px]',
        className,
      ].join(' ')}
    >
      {/* ✅ D1 타이틀 */}
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

      {/* ✅ 에러 이미지: 150x150 / radius 20 / aspect 1:1 */}
      <div
        className={[
          'flex items-center justify-center',
          'w-[150px] h-[150px]',
          'rounded-[20px]',
          'overflow-hidden',
        ].join(' ')}
      >
        <Image
          src={errorImg}
          alt="에러 상태 이미지"
          width={150}
          height={150}
          className="h-full w-full object-cover"
          priority={false}
        />
      </div>

      {/* ✅ 문구 (B1) - 두 줄 개행 처리 */}
      <p
        className={[
          'text-center',
          'whitespace-pre-line', // ✅ \n을 실제 줄바꿈으로 렌더
          'font-[500]',
          'text-[18px]',
          'leading-[27px]',
          'tracking-[-0.36px]',
          'text-[var(--Color-Role-fg-basic-accent,#242A30)]',
        ].join(' ')}
      >
        {message}
      </p>

      {/* ✅ 버튼: 공통 Button + 피그마 padding/radius는 공통 컴포넌트의 rounded가 그대로 충족 */}
      <Button variant="primary" shape="rounded" onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  )
}
