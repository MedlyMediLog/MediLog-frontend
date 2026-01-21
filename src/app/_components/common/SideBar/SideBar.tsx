'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import profile from '@/assets/profile.png'

import sidebar from '@/assets/sidebar.png'
import home from '@/assets/home.png'

const NAV = [{ href: '/', label: '홈', icon: home }] as const

type Me = {
  name?: string
  email?: string
  provider?: string // "google" 같은거
  imageUrl?: string // 있으면 사용
}

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const [me, setMe] = useState<Me | null>(null)
  const [meLoading, setMeLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function run() {
      try {
        setMeLoading(true)
        const res = await fetch('/api/auth/me', { cache: 'no-store' })

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
    <aside
      className={clsx(
        'sticky top-0 h-[1080px] bg-[#edf2f6] border-r border-[#c1cad6] flex flex-col',
        'overflow-hidden transition-[width] duration-300 ease-out',
        isOpen ? 'w-[280px]' : 'w-[80px]',
      )}
      aria-label="Sidebar"
    >
      {/* 상단 토글 */}
      <div className="py-4 px-5 h-20 w-full flex items-center justify-end">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="p-2 gap-2"
          aria-expanded={isOpen}
          aria-label={isOpen ? '사이드바 닫기' : '사이드바 열기'}
        >
          <div
            className={clsx(
              'flex items-center justify-center rounded-[12px]',
              isOpen ? 'bg-layer-secondary p-2' : '',
            )}
          >
            <div className="w-6 h-6 relative shrink-0">
              <Image src={sidebar} fill alt="sidebar" className="object-contain" />
            </div>
          </div>
        </button>
      </div>

      {/* 메뉴 */}
      <div className="px-3 gap-10 flex flex-col">
        <nav className="flex flex-col gap-2 items-center">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'rounded-[12px] flex items-center transition-colors',
                isOpen ? 'w-60 p-2 gap-2 justify-start bg-layer-secondary' : 'w-10 h-10 justify-center',
              )}
            >
              <div className="w-6 h-6 relative shrink-0">
                <Image src={item.icon} fill alt={item.label} className="object-contain" />
              </div>

              {isOpen && (
                <span className="min-w-0 truncate typo-h5 text-fg-basic-primary">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {isOpen && (
          <div className="flex flex-col gap-1">
            <div className="flex p-2 gap-2.5 text-gray-1000 typo-h5">최근 본 제품</div>
            <div className="flex flex-col text-fg-basic-primary typo-b3">
              <div className="flex gap-2.5 flex-col">
                {/* TODO: 최근 본 제품 데이터 연결 */}
                <Link href="/login" className="py-2.5 px-2 rounded-[8px] gap-2 typo-b3">[&quot;PRODUCT&quot;]</Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto w-full h-20 border-t border-gray-300 px-2.5 flex items-center">
        <div
          className={clsx(
            'w-full rounded-[8px] px-2 py-2.5 gap-3 flex items-center',
            isOpen ? 'justify-start' : 'justify-center',
          )}
        >
          <Image
            src={profile}
            width={40}
            height={40}
            alt="profile"
            className="shrink-0"
          />

          {isOpen && (
            <div className="flex flex-col min-w-0">
              <div className="typo-b3 text-fg-basic-accent truncate">
                {meLoading ? '불러오는 중…' : (me?.name ?? '게스트')}
              </div>
              <div className="text-fg-basic-primary typo-b5 truncate">
                {meLoading ? '' : (me?.email ?? me?.provider ?? '로그인이 필요해요')}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
