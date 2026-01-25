'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import LoginModal from '@/app/(no-footer)/login/_components/LoginModal'
import HeroSection from './_components/HeroSection'

import { startFunnelSessionOnLanding } from '@/lib/analytics/funnelSession'

export default function LandingPage() {
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const refreshAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me', {
        method: 'GET',
        cache: 'no-store',
        credentials: 'include',
        headers: { accept: 'application/json' },
      })

      setIsLoggedIn(res.ok)
    } catch {
      setIsLoggedIn(false)
    } finally {
    }
  }, [])

  useEffect(() => {
    // landing 진입 = 세션 시작점
    // - sessionId 발급
    // - startedAt 기록
    // - clickCount 0 초기화
    startFunnelSessionOnLanding()

    // 로그인 상태 갱신
    refreshAuth()
  }, [refreshAuth])

  const handleLoginClick = () => {
    if (isLoggedIn) return

    const isDesktop =
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 740px)').matches

    if (isDesktop) {
      setIsLoginOpen(true) // 데스크탑: 오버레이
    } else {
      router.push('/login') // 모바일: /login 이동
    }
  }

  const handleLogoutClick = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        cache: 'no-store',
        credentials: 'include',
      })
    } catch {
      // ignore
    } finally {
      setIsLoginOpen(false)
      await refreshAuth()
      router.refresh()
    }
  }

  const handleCloseLogin = async () => {
    setIsLoginOpen(false)
    await refreshAuth()
    router.refresh()
  }

  return (
    <>
      {/* 로그인 모달 */}
      {isLoginOpen && <LoginModal onClose={handleCloseLogin} />}

      <HeroSection
        isLoggedIn={isLoggedIn}
        onLoginClick={handleLoginClick}
        onLogoutClick={handleLogoutClick}
        
      />
    </>
  )
}
