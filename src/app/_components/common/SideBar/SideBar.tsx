'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import sidebar from '@/assets/sidebar.png'
import home from '@/assets/home.png'

const NAV = [{ href: '/', label: '홈', icon: home }] as const

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
      <div className="py-4 px-5 h-20 w-full flex items-center justify-center">
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
      <nav className="flex flex-col px-5 gap-2">
        {NAV.map((item) => {
          

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'w-full rounded-[12px] flex items-center gap-2',
                isOpen ? 'gap-2 p-2 justify-start bg-layer-secondary ' : 'py-2 justify-center',
               
              )}
            >
              <div className="w-6 h-6 relative shrink-0">
                <Image src={item.icon} fill alt={item.label} className="object-contain" />
              </div>

              {/* ✅ 닫힌 상태에서는 라벨 자체를 렌더링하지 않음 */}
              {isOpen ? (
                <span className="min-w-0 truncate typo-h5 text-fg-basic-primary">{item.label}</span>
              ) : null}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
