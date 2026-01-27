'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import profile from '@/assets/profile.svg'
import close from '@/assets/close.svg'
import navigate from '@/assets/navigate.svg'

import { logout } from '@/lib/api/logout'
import { useRecentProducts } from '@/hooks/useRecentProducts'
import { useMe } from '@/hooks/useMe'
import ProfileMenuPopover from './common/SideBar/ProfileMenuPopover'
import { useLogout } from '@/hooks/useLogout'

const NAV = [{ href: '/category', label: '건강주제 탐색하기', icon: navigate }] as const

type Props = {
  open: boolean
  onClose: () => void
}

export default function MobileSidebar({ open, onClose }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const qc = useQueryClient()

  const { data: me, isLoading: meLoading } = useMe()

  const canFetchRecent = open && !meLoading && !!me
  const { data: recent = [], isLoading: recentLoading } = useRecentProducts(canFetchRecent)

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const profileMenuWrapRef = useRef<HTMLDivElement | null>(null)
  const profileBtnRef = useRef<HTMLButtonElement | null>(null)
  const [menuPos, setMenuPos] = useState<{ right: number; top: number } | null>(null)

  // 사이드바가 닫혀있으면(open=false) 팝오버는 "열려있지 않은 것"으로 취급
  const effectiveProfileMenuOpen = open && isProfileMenuOpen

  // 모바일: 열리면 body 스크롤 잠금 + ESC 닫기
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  // 메뉴 열릴 때 버튼 기준 좌표 계산
  useEffect(() => {
    if (!effectiveProfileMenuOpen) return
    const btn = profileBtnRef.current
    if (!btn) return

    const update = () => {
      const r = btn.getBoundingClientRect()
      setMenuPos({
        right: 28,
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
  }, [effectiveProfileMenuOpen])

  const onLogout = useLogout({
    onAfterSuccess: () => {
      setIsProfileMenuOpen(false)
      onClose()
    },

    refresh: true,
  })

  return (
    <>
      {/* Dim */}
      <button
        type="button"
        className={clsx(
          'fixed inset-0 bg-black/40 z-40 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
        aria-label="메뉴 닫기"
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 right-0 h-full w-[320px] bg-[#edf2f6] z-50 flex flex-col',
          'transform transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="모바일 사이드바"
        data-pathname={pathname}
      >
        {/* 상단 */}
        <div className="h-20 px-5 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            aria-label="메뉴 닫기"
            className={clsx(
              'w-10 h-10 flex items-center justify-center rounded-[12px]',
              'hover:bg-layer-secondary focus:outline-none focus:ring-2 focus:ring-blue-500',
            )}
          >
            <Image src={close} alt="" width={24} height={24} />
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
                  onClick={onClose}
                  aria-current={isActive ? 'page' : undefined}
                  className={clsx(
                    'w-full rounded-[12px] flex items-center p-2 gap-2 justify-start',
                    'transition-colors hover:bg-layer-secondary',
                    // isActive && 'bg-layer-secondary',
                  )}
                >
                  <div className="w-6 h-6 relative shrink-0">
                    <Image src={item.icon} fill alt={item.label} className="object-contain" />
                  </div>
                  <span className="min-w-0 truncate typo-h5 text-fg-basic-accent">
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* 최근 본 제품 */}
          <div className="flex flex-col gap-1">
            <div className="flex p-2 gap-2.5 text-gray-1000 typo-h5">최근 본 제품</div>

            <div className="flex flex-col text-fg-basic-primary typo-b3">
              {!meLoading && !me ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(false)
                    onClose()
                    router.push('/login')
                  }}
                  className="py-2.5 px-2 typo-b3 text-left"
                >
                  <span className="underline underline-offset-2 hover:opacity-80 cursor-pointer">
                    로그인
                  </span>{' '}
                  후 확인할 수 있어요
                </button>
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
                      onClick={onClose}
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

        {/* 하단 */}
        <div className="absolute bottom-0 left-0 w-full border-t border-gray-300 px-2.5 py-2 flex flex-col gap-2 bg-[#edf2f6]">
          <div ref={profileMenuWrapRef} className="relative">
            <button
              ref={profileBtnRef}
              type="button"
              onClick={() => {
                if (!open) return
                setIsProfileMenuOpen((v) => !v)
              }}
              className={clsx(
                'w-full rounded-[8px] px-2 py-2.5 gap-3 flex items-center justify-start hover:bg-layer-secondary',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
              )}
              aria-haspopup="menu"
              aria-expanded={effectiveProfileMenuOpen}
              aria-label="프로필 메뉴 열기"
            >
              <Image src={profile} width={40} height={40} alt="profile" className="shrink-0" />

              <div className="flex flex-col min-w-0 text-left">
                <div className="typo-b3 text-fg-basic-accent truncate">
                  {meLoading ? '불러오는 중…' : me?.name ?? '게스트'}
                </div>
                <div className="text-fg-basic-primary typo-b5 truncate">
                  {meLoading ? '' : me ? '로그인 됨' : '둘러보는중'}
                </div>
              </div>
            </button>

            <ProfileMenuPopover
              open={effectiveProfileMenuOpen}
              pos={menuPos}
              meLoading={meLoading}
              me={(me as unknown) ?? null}
              onClose={() => setIsProfileMenuOpen(false)}
              onLogout={onLogout}
              onLogin={() => {
                setIsProfileMenuOpen(false)
                onClose()
                router.push('/login')
              }}
            />
          </div>
        </div>
      </aside>
    </>
  )
}
