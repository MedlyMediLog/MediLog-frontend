// src/app/(with-footer)/(with-sidebar)/products/_components/shared/FloatingTopButton/FloatingTopButton.tsx

'use client'

import React from 'react'
import Image from 'next/image'
import Button from '@/app/_components/common/Button'
import styles from './FloatingTopButton.module.css'

import iconArrowUp from '@/assets/product-listing/icons/icon-arrow-up.svg'

type Props = {
  visible: boolean
  onClick: () => void
}

export function FloatingTopButton({ visible, onClick }: Props) {
  if (!visible) return null

  return (
    <div className={styles.wrapper}>
      <Button
        variant="primary"
        shape="rounded"
        onClick={onClick}
        aria-label="최상단으로 이동"
      >
        <Image src={iconArrowUp} alt="" width={24} height={24} priority />
      </Button>
    </div>
  )
}