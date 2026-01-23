'use client'
import hambugi from '@/assets/hambugi.png'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import { useState } from 'react'
import MobileSidebar from '@/app/_components/MobileSidebar'
import Link from 'next/link'

export default function PrivacyHeader() {
  const [open, setOpen] = useState(false)
  return (
    <div className="w-full flex h-[56px] p-[16px]  bg-gray-100 gap-30 desktop:py-4 desktop:px-5 desktop:h-auto">
      <div className="w-full flex justify-between items-center desktop:p-1">
        <Link href={'/'}>
          <Image
            src={logo}
            alt="logo"
            width={80}
            height={40}
            className="flex items-center py-[10px] pr-[23px]"
          />
        </Link>

        <div className="absolute left-1/2 -translate-x-1/2 desktop:hidden">
          <span className="typo-h5 text-fg-basic-accent">개인정보 처리 방침</span>
        </div>

        <button
          type="button"
          aria-label="메뉴 열기"
          className="w-10 h-10 flex items-center justify-center rounded-[12px] desktop:hidden"
          onClick={() => setOpen(true)}
        >
          <span className="relative w-[21.33px] h-[18.67px]">
            <Image src={hambugi} alt="" fill className="object-contain" priority />
          </span>
        </button>
        <MobileSidebar open={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  )
}
