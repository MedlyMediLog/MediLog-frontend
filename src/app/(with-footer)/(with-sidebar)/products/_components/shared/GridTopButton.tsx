'use client'

import React from 'react'
import arrow from '@/assets/product-listing/icons/arrow.svg'
import Image from 'next/image'
import Button from '@/app/_components/common/Button'
const FOOTER_SAFE_GAP = 20

type Props = {
  visible: boolean
  onClick: () => void
}

export function GridTopButton({ visible, onClick }: Props) {
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
    <Button
      variant="primary"
      shape="rounded"
      onClick={onClick}
      className="
      absolute
      !bg-fg-basic-accent
        right-[20px]
        bottom-[20px]
        z-[100]
        rounded-full
        bg-fg-basic-accent
        flex
        items-center
        justify-center
        w-[48px]
        h-[48px]"
    >
      <Image src={arrow} width={24} height={24} alt="arrow" />
    </Button>
  )
}
