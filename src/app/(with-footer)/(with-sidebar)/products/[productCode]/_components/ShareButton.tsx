'use client'

import Image from 'next/image'
import { useCallback } from 'react'
import Button from '@/app/_components/common/Button'
import share from '@/assets/share.svg'
import { toast } from '@/app/_components/common/toastStore'

export default function ShareButton() {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('URL이 복사되었습니다')
    } catch {
      toast.error('URL 복사에 실패했어요')
    }
  }

  return (
    <Button
      variant="secondary"
      shape="square"
      onClick={handleShare}
      className="flex h-[48px] justify-center items-center flex-[1_0_0] py-[12px] gap-2 cursor-pointer"
    >
      <Image src={share} alt="share" width={24} height={24} />
      <div className="typo-h5 text-fg-basic-accent">이 페이지 공유하기</div>
    </Button>
  )
}
