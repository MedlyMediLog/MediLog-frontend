'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import LoginModal from '@/app/(no-footer)/login/_components/LoginModal'
import HeroSection from './_components/HeroSection'

export default function LandingPage() {
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  const refreshAuth = useCallback(async () => {
    setAuthLoading(true)
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
      setAuthLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshAuth()
  }, [refreshAuth])

  const handleLoginClick = () => {
    if (isLoggedIn) return

    const isDesktop =
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 740px)').matches

    if (isDesktop) {
      setIsLoginOpen(true) // ✅ 데스크탑: 오버레이
    } else {
      router.push('/login') // ✅ 모바일: /login 이동
    }
  }

  const handleLogoutClick = async () => {
    try {
      // ✅ 로그아웃 호출 (너희 프로젝트 경로에 맞게 수정)
      await fetch('/api/auth/logout', {
        method: 'POST',
        cache: 'no-store',
        credentials: 'include',
      })
    } catch {
      // 네트워크 에러여도 일단 UI는 로그아웃처럼 처리
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
