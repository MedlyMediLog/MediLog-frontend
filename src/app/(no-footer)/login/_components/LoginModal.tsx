'use client'

import { useEffect } from 'react'
import LoginContent from './LoginContent'

type Props = {
  onClose: () => void
}

export default function LoginModal({ onClose }: Props) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center px-5"
      role="dialog"
      aria-modal="true"
      aria-label="로그인"
    >
      {/* dim */}
      <button
        type="button"
        aria-label="로그인 닫기"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="h-full overflow-y-auto relative">
        {/* content */}
        <div className='flex items-center justify-center min-h-full'>
          <div className="relative z-[1000] ">
            <LoginContent onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  )
}
