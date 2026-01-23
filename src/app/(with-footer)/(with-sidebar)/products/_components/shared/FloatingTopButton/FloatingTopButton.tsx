// src/app/(with-footer)/(with-sidebar)/products/_components/shared/FloatingTopButton/FloatingTopButton.tsx

'use client'

import React from 'react'
import styles from './FloatingTopButton.module.css'

type Props = {
  visible: boolean
  onClick: () => void
}

/**
 * ✅ footer가 버튼과 겹치기 시작하면
 * 겹치는 만큼만 위로 올려서 “피그마처럼” footer 위에 떠있게 함
 */
const FOOTER_SAFE_GAP = 20

function ArrowUpIcon() {
  return (
    <svg
      className={styles.icon}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 12L12 5L19 12"
        stroke="#FBFDFD"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 19V5"
        stroke="#FBFDFD"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function FloatingTopButton({ visible, onClick }: Props) {
  const [extraBottom, setExtraBottom] = React.useState(0)

  React.useEffect(() => {
    if (!visible) return

    const update = () => {
      const footer = document.querySelector('footer')
      if (!footer) {
        setExtraBottom(0)
        return
      }

      const rect = footer.getBoundingClientRect()
      const overlap = window.innerHeight - rect.top

      // footer가 화면에 들어오면 overlap > 0
      setExtraBottom(Math.max(0, overlap + FOOTER_SAFE_GAP))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      className={styles.wrapper}
      style={{ '--floating-extra-bottom': `${extraBottom}px` } as React.CSSProperties}
    >
      <button
        type="button"
        className={styles.button}
        onClick={onClick}
        aria-label="최상단으로 이동"
      >
        <ArrowUpIcon />
      </button>
    </div>
  )
}
