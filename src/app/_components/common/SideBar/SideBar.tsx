// src/app/_components/common/SideBar/SideBar.tsx
'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import profile from '@/assets/profile.png'
import sidebar from '@/assets/sidebar.png'
import home from '@/assets/home.png'

import { logout } from '@/lib/api/logout'
import { useRecentProducts } from '@/hooks/useRecentProducts'
import { useMe } from '@/hooks/useMe'

const NAV = [{ href: '/category', label: '홈', icon: home }] as const

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const router = useRouter()
  const qc = useQueryClient()

  const { data: me, isLoading: meLoading } = useMe()

  // ✅ 사이드바 열렸고 + 로그인 상태일 때만 최근본 요청
  const canFetchRecent = isOpen && !meLoading && !!me
  const { data: recent = [], isLoading: recentLoading } = useRecentProducts(canFetchRecent)

  const onLogout = async () => {
    try {
      await logout()

      // ✅ 로그인 기반 캐시/상태 정리
      qc.removeQueries({ queryKey: ['me'] })
      qc.removeQueries({ queryKey: ['recent-products'] })
      qc.removeQueries({ queryKey: ['productDetail'] })

      // ✅ UI 갱신
      router.replace('/')
      router.refresh()
    } catch (e) {
      console.error(e)
      alert('로그아웃에 실패했어요')
    }
  }

  return (
    <aside
      className={clsx(
        // ✅ 화면 하단 고정처럼 보이게 하려면 h-screen + relative가 핵심
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
          className="p-2 gap-2"
          aria-expanded={isOpen}
          aria-label={isOpen ? '사이드바 닫기' : '사이드바 열기'}
        >
          <div
            className={clsx(
              'flex items-center justify-center rounded-[12px]',
              isOpen ? '' : '',
            )}
          >
            <div className="w-6 h-6 relative shrink-0">
              <Image src={sidebar} fill alt="sidebar" className="object-contain" />
            </div>
          </div>
        </button>
      </div>

      {/* 메뉴/본문 */}
      <div
        className={clsx(
          'px-3 gap-10 flex flex-col',
          // ✅ 하단 absolute 영역 높이만큼 바닥 패딩(겹침 방지)
          'pb-[96px]',
        )}
      >
        {/* 메뉴 */}
        <nav className="flex flex-col gap-2 items-center">
          {NAV.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={clsx(
                  'rounded-[12px] flex items-center transition-colors',
                  isOpen ? 'w-60 p-2 gap-2 justify-start' : 'w-10 h-10 justify-center',
                  isActive ? 'bg-layer-secondary' : '',
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
            )
          })}
        </nav>

        {/* 최근 본 제품 (열렸을 때만) */}
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

      {/* ✅ 하단: fixed 대신 absolute (부모 relative 기준으로 화면 하단에 붙음) */}
      <div className="absolute bottom-0 left-0 w-full border-t border-gray-300 px-2.5 py-2 flex flex-col gap-2 bg-[#edf2f6]">
        {/* 프로필 */}
        <div
          className={clsx(
            'w-full rounded-[8px] px-2 py-2.5 gap-3 flex items-center',
            isOpen ? 'justify-start' : 'justify-center',
          )}
        >
          <Image src={profile} width={40} height={40} alt="profile" className="shrink-0" />

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

        {/* 로그아웃 버튼: 로그인 상태에서만 */}
        {/* {isOpen && !meLoading && me && (
          <button
            type="button"
            onClick={onLogout}
            className="w-full px-2 py-2.5 rounded-[8px] text-left typo-b3 hover:bg-layer-secondary"
          >
            로그아웃
          </button>
        )} */}
      </div>
    </aside>
  )
}
