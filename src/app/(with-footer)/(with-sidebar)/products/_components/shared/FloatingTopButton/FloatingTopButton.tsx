'use client'

import React from 'react'

type Props = {
  visible: boolean
  onClick: () => void
  mode?: 'fixed' | 'absolute'
}


const FOOTER_SAFE_GAP = 20

function ArrowUpIcon() {
  return (
    <svg
      className="w-6 h-6 shrink-0 block"
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

export function FloatingTopButton({ visible, onClick, mode = 'fixed' }: Props) {
  const [extraBottom, setExtraBottom] = React.useState(0)

  React.useEffect(() => {
    if (!visible || mode !== 'fixed') return

    const update = () => {
      const footer = document.querySelector('footer')
      if (!footer) {
        setExtraBottom(0)
        return
      }

      const rect = footer.getBoundingClientRect()
      const overlap = window.innerHeight - rect.top

      setExtraBottom(Math.max(0, overlap + FOOTER_SAFE_GAP))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [visible, mode])

  if (!visible) return null

  return (
    <div className="sticky bottom-5 ml-auto z-10 flex justify-end">
      <button
        type="button"
        className="
          w-12 h-12
          flex items-center justify-center
          rounded-full
          bg-[var(--Color-Role-bg-layer-accent,#242a30)]
          shadow-[0_0_8px_rgba(36,42,48,0.12)]
          border-0 p-0
          cursor-pointer
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
          focus-visible:outline-[rgba(251,253,253,0.6)]
        "
        onClick={onClick}
        aria-label="최상단으로 이동"
      >
        <ArrowUpIcon />
      </button>
    </div>
  )
}