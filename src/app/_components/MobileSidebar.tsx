'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import profile from '@/assets/profile.png'
import close from '@/assets/close.svg'
import home from '@/assets/home.png'

const NAV = [{ href: '/', label: '홈', icon: home }] as const

type Me = {
  name?: string
  email?: string
  provider?: string
  imageUrl?: string
}

type Props = {
  open: boolean
  onClose: () => void
}

export default function MobileSidebar({ open, onClose }: Props) {
  const pathname = usePathname()

  const [me, setMe] = useState<Me | null>(null)
  const [meLoading, setMeLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function run() {
      try {
        setMeLoading(true)
        const res = await fetch('/api/me', { cache: 'no-store' })
        if (!res.ok) {
          if (!cancelled) setMe(null)
          return
        }
        const data = await res.json()
        if (!cancelled) setMe(data)
      } catch {
        if (!cancelled) setMe(null)
      } finally {
        if (!cancelled) setMeLoading(false)
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      {/* 🌫 Dim */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/40 z-40 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
        aria-hidden
      />

      {/* 📱 Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 right-0 h-full w-[320px] bg-[#edf2f6] z-50 flex flex-col',
          'transform transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-label="모바일 사이드바"
      >
        {/* 상단 */}
        <div className="h-20 px-5 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="메뉴 닫기"
            className="w-10 h-10 flex items-center justify-center rounded-[12px]"
          >
            <Image src={close} alt="" width={24} height={24} />
          </button>
        </div>

        {/* 메뉴 */}
        <div className="px-3 gap-10 flex flex-col">
          <nav className="flex flex-col gap-2 items-center">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="w-full px-[8px] py-[10px] rounded-[12px] flex items-center gap-[8px] bg-layer-secondary"
              >
                <Image src={item.icon} alt={item.label} width={24} height={24} />
                <span className="typo-h5 text-fg-basic-primary">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* 최근 본 제품 */}
          <div className="flex flex-col gap-1">
            <div className="flex p-2 gap-2.5 text-gray-1000 typo-h5">최근 본 제품</div>
            <div className="flex flex-col text-fg-basic-primary typo-b3">
              <Link href="/login" onClick={onClose} className="py-2.5 px-2 rounded-[8px] typo-b3">
                [&quot;PRODUCT&quot;]
              </Link>
            </div>
          </div>
        </div>

        {/* 하단 프로필 */}
        <div className="mt-auto h-20 border-t border-gray-300 px-5 flex items-center">
          <div className="flex items-center gap-3 w-full">
            <Image src={profile} width={40} height={40} alt="profile" className="shrink-0" />
            <div className="flex flex-col min-w-0">
              <div className="typo-b3 text-fg-basic-accent truncate">
                {meLoading ? '불러오는 중…' : me?.name ?? '게스트'}
              </div>
              <div className="text-fg-basic-primary typo-b5 truncate">
                {meLoading ? '' : me?.email ?? me?.provider ?? '로그인이 필요해요'}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
