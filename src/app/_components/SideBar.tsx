'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import sidebar from '@/assets/sidebar.png'
import home from '@/assets/home.png'

const NAV = [{ href: '/', label: '홈', icon: home }] as const

const EXTRA_NAV = [
  { href: '/category', label: '카테고리' },
  { href: '/recent', label: '최근 본 상품' },
] as const

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className={clsx(
        'sticky top-0 h-[1080px] bg-[#edf2f6] border-r border-[#c1cad6] flex flex-col',
        'overflow-hidden transition-[width] duration-300 ease-out',
        isOpen ? 'w-[320px]' : 'w-[80px]',
      )}
      aria-label="Sidebar"
    >
      {/* 상단 토글 */}
      <div className="py-4 px-5 h-20 w-full flex items-center justify-end">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="p-2"
          aria-expanded={isOpen}
          aria-label={isOpen ? '사이드바 닫기' : '사이드바 열기'}
        >
          <div
            className={clsx(
              'flex items-center justify-center rounded-[12px]',
              isOpen && 'bg-layer-secondary p-2',
            )}
          >
            <div className="w-6 h-6 relative shrink-0">
              <Image src={sidebar} fill alt="sidebar" className="object-contain" />
            </div>
          </div>
        </button>
      </div>

      {/* 기본 메뉴 */}
      <nav className="flex flex-col px-5 gap-2">
        {NAV.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'px-2 py-2.5 rounded-[8px] gap-2 flex items-center',
                'hover:bg-layer-secondary',
                isActive && 'bg-layer-secondary',
              )}
            >
              <div className="w-6 h-6 relative shrink-0">
                <Image src={item.icon} fill alt={item.label} className="object-contain" />
              </div>

              {isOpen && (
                <span className="min-w-0 truncate typo-h5 text-fg-basic-accent">{item.label}</span>

              )}
            </Link>
          )
        })}
      </nav>

      {/* ✅ isOpen일 때만 추가 리스트 */}
      {isOpen && (
        <div className="flex flex-col px-3 gap-10">
          <nav className="px-3 flex flex-col">
            {EXTRA_NAV.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'px-3 py-2 rounded-[8px] typo-b4',
                    'text-fg-basic-accent hover:bg-layer-secondary',
                    isActive && 'bg-layer-secondary',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* 최근 본 영양제 */}
          <div className='flex flex-col gap-1'>
            <div className='flex p-2 gap-2.5 text-gray-1000 typo-h5'>최근 본 제품</div>

          </div>
        </div>
      )}
    </aside>
  )
}
