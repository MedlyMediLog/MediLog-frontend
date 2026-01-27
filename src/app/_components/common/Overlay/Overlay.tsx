//src/app/_components/common/Overlay/Overlay.tsx
'use client'

import React from 'react'

export type OverlayProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  closeOnBackdrop?: boolean
  className?: string
}

export default function Overlay({
  open,
  onClose,
  children,
  closeOnBackdrop = true,
  className = '',
}: OverlayProps) {

  React.useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={['fixed inset-0 z-[9999]', className].join(' ')} role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="오버레이 닫기"
        className="absolute inset-0 bg-[rgba(0,0,0,0.35)]"
        onClick={() => {
          if (!closeOnBackdrop) return
          onClose()
        }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="pointer-events-auto">{children}</div>
      </div>
    </div>
  )
}
