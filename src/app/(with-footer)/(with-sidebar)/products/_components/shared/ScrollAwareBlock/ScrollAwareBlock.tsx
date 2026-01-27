'use client'

import React from 'react'
import styles from './ScrollAwareBlock.module.css'

type Props = {
  hidden: boolean
  children: React.ReactNode
  className?: string
}

export function ScrollAwareBlock({ hidden, children, className }: Props) {
  return (
    <div
      className={[
        styles.block,
        hidden ? styles.blockHidden : styles.blockShown,
        className ?? '',
      ].join(' ')}
      aria-hidden={hidden}
    >
      {children}
    </div>
  )
}


