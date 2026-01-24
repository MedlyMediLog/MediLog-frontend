'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import profile from '@/assets/profile.svg'
import sidebar from '@/assets/sidebar.svg'
import navigate from "@/assets/navigate.svg"
import finding from '@/assets/finding.png'

import { logout } from '@/lib/api/logout'
import { useRecentProducts } from '@/hooks/useRecentProducts'
import { useMe } from '@/hooks/useMe'

import ProfileMenuPopover from './ProfileMenuPopover'

const NAV = [{ href: '/category', label: '건강주제 탐색하기', icon: navigate }] as const

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const router = useRouter()
  const qc = useQueryClient()

  const { data: me, isLoading: meLoading } = useMe()

  // 프로필 팝오버 상태 (SideBar는 “상태/좌표/닫기”만 관리)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const profileMenuWrapRef = useRef<HTMLDivElement | null>(null)
  const profileBtnRef = useRef<HTMLButtonElement | null>(null)
  const [menuPos, setMenuPos] = useState<{ left: number; top: number } | null>(null)

  const canFetchRecent = isOpen && !meLoading && !!me
  const { data: recent = [], isLoading: recentLoading } = useRecentProducts(canFetchRecent)

  const onLogout = async () => {
    try {
      await logout()
      qc.removeQueries({ queryKey: ['me'] })
      qc.removeQueries({ queryKey: ['recent-products'] })
      qc.removeQueries({ queryKey: ['productDetail'] })

      router.replace('/')
      router.refresh()
    } catch (e) {
      console.error(e)
      alert('로그아웃에 실패했어요')
    } finally {
      setIsProfileMenuOpen(false)
    }
  }

  const closeProfileMenu = () => setIsProfileMenuOpen(false)

  useEffect(() => {
    if (!isProfileMenuOpen) return

    const onMouseDown = (e: MouseEvent) => {
      const el = profileMenuWrapRef.current
      if (!el) return
      if (e.target instanceof Node && !el.contains(e.target)) closeProfileMenu()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProfileMenu()
    }


    document.addEventListener('keydown', onKeyDown)
    return () => {
     
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isProfileMenuOpen])

  // 사이드바 닫히면 메뉴도 닫기
  useEffect(() => {
    if (!isOpen) closeProfileMenu()
  }, [isOpen])

  // 메뉴 열릴 때 버튼 기준 좌표 계산
  useEffect(() => {
    if (!isProfileMenuOpen) return
    const btn = profileBtnRef.current
    if (!btn) return

    const update = () => {
      const r = btn.getBoundingClientRect()
      setMenuPos({
        left: 8,
        top: r.top - 10,
      })
    }

    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [isProfileMenuOpen])

  return (
    <aside
      className={clsx(
        'sticky top-0 h-screen bg-[#edf2f6] border-r border-[#c1cad6] flex flex-col relative',
        'overflow-hidden transition-[width] duration-300 ease-out',
        isOpen ? 'w-[280px]' : 'w-[80px]',
      )}
      aria-label="Sidebar"
      data-pathname={pathname}
    >
      {/* 상단 토글 */}
      <div className="py-4 px-5 h-20 w-full flex items-center justify-end shrink-0">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="p-2 gap-2 hover:bg-layer-secondary rounded-[12px] cursor-pointer"
          aria-expanded={isOpen}
          aria-label={isOpen ? '사이드바 닫기' : '사이드바 열기'}
        >
          <div className="flex items-center justify-center rounded-[12px]">
            <div className="w-6 h-6 relative shrink-0">
              <Image src={sidebar} fill alt="sidebar" className="object-contain" />
            </div>
          </div>
        </button>
      </div>

      {/* 메뉴/본문 */}
      <div className={clsx('px-3 gap-10 flex flex-col', 'pb-[96px]')}>
        <nav className="flex flex-col gap-2 items-center">
          {NAV.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={clsx(
                  'rounded-[12px] flex items-center transition-colors hover:bg-layer-secondary',
                  isOpen ? 'w-60 p-2 gap-2 justify-start' : 'w-10 h-10 justify-center',
                  
                )}
              >
                <div className="w-6 h-6 relative shrink-0">
                  <Image src={item.icon} fill alt={item.label} className="object-contain" />
                </div>

                {isOpen && (
                  <span className="min-w-0 truncate typo-h5 text-fg-basic-accent">
                    {item.label}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {isOpen && (
          <div className="flex flex-col gap-1">
            <div className="flex p-2 gap-2.5 text-gray-1000 typo-h5">최근 본 제품</div>

            <div className="flex flex-col text-fg-basic-primary typo-b3">
              <div className="flex flex-col">
                {!meLoading && !me ? (
                  <Link href="/login" className="py-2.5 px-2 rounded-[8px] gap-2 typo-b3">
                    로그인하면 최근 본 제품이 보여요
                  </Link>
                ) : recentLoading ? (
                  <div className="py-2.5 px-2 text-fg-basic-secondary">불러오는 중…</div>
                ) : recent.length === 0 ? (
                  <div className="py-2.5 px-2 text-fg-basic-secondary">최근 본 제품이 없어요</div>
                ) : (
                  recent.map((p) => {
                    const href = `/products/${p.productCode}`
                    const isActive = pathname === href
                    return (
                      <Link
                        key={p.productCode}
                        href={href}
                        className={clsx(
                          'py-2.5 px-2 rounded-[8px] gap-2 typo-b3 hover:bg-layer-secondary truncate',
                          isActive && 'bg-layer-secondary',
                        )}
                        title={p.name}
                      >
                        {p.name}
                      </Link>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 하단 */}
      <div className="absolute bottom-0 left-0 w-full border-t border-gray-300 px-2.5 py-2 flex flex-col gap-2 bg-[#edf2f6]">
        <div ref={profileMenuWrapRef} className="relative">
          <button
            ref={profileBtnRef}
            type="button"
            onClick={() => setIsProfileMenuOpen((v) => !v)}
          className={clsx(
              'w-full rounded-[8px] px-2 py-2.5 gap-3 flex items-center hover:bg-layer-secondary',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
            isOpen ? 'justify-start' : 'justify-center',
          )}
            aria-haspopup="menu"
            aria-expanded={isProfileMenuOpen}
            aria-label="프로필 메뉴 열기"
        >
          <Image src={profile} width={40} height={40} alt="profile" className="shrink-0" />

          {isOpen && (
              <div className="flex flex-col min-w-0 text-left">
              <div className="typo-b3 text-fg-basic-accent truncate">
                  {meLoading ? '불러오는 중…' : (me?.name ?? '게스트')}
              </div>
              <div className="text-fg-basic-primary typo-b5 truncate">
                  {meLoading ? '' : '로그인 됨'}
              </div>
            </div>
          )}
          </button>

          <ProfileMenuPopover
            open={isProfileMenuOpen}
            pos={menuPos}
            meLoading={meLoading}
            me={(me as unknown) ?? null}
            onClose={closeProfileMenu}
            onLogout={onLogout}
          />
        </div>
      </div>
    </aside>
  )
}
