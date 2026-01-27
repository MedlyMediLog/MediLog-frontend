'use client'

import React from 'react'

type Props = {
  hidden: boolean
  children: React.ReactNode
  className?: string
}

export function ScrollAwareBlock({ hidden, children, className }: Props) {
  return (
    <div
      className={[
        'origin-top will-change-[opacity,transform] transition-[opacity,transform,visibility] duration-180 ease-in-out',
        hidden
          ? 'opacity-0 -translate-y-2 pointer-events-none invisible delay-[180ms]'
          : 'opacity-100 translate-y-0 pointer-events-auto visible delay-0',
        className ?? '',
      ].join(' ')}
      aria-hidden={hidden}
    >
      {children}
    </div>
  )
}