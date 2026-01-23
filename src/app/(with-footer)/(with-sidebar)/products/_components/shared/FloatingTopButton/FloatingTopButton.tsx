// src/app/(with-footer)/(with-sidebar)/products/_components/shared/FloatingTopButton/FloatingTopButton.tsx

'use client'

import React from 'react'
import Image from 'next/image'
import styles from './FloatingTopButton.module.css'

import iconScrollTop from '@/assets/product-listing/icons/icon-scroll-top.svg'

type Props = {
  visible: boolean
  onClick: () => void
}

const FOOTER_SAFE_GAP = 20

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

      // footer가 화면에 들어오면 겹치는 만큼 위로 이동
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
        <Image
          src={iconScrollTop}
          alt=""
          width={48}
          height={48}
          className={styles.icon}
          priority
        />
      </button>
    </div>
  )
}
