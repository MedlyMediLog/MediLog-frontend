'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import LoginModal from '@/app/(no-footer)/login/_components/LoginModal'
import HeroSection from './_components/HeroSection'

export default function LandingPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const handleLoginClick = () => {
    const isDesktop = window.matchMedia('(min-width: 740px)').matches

    if (isDesktop) {
      setIsLoginOpen(true) // ✅ 데스크탑: 오버레이로 띄우기
    } else {
      router.push('/login') // ✅ 모바일: /login 이동
    }
  }

  const handleLogoutClick = async () => {
    setIsLoggedIn(false)
    router.refresh()
  }

  return (
    <>
      {/* 로그인 모달 */}
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}

      <HeroSection
        isLoggedIn={isLoggedIn}
        onLoginClick={handleLoginClick}
        onLogoutClick={handleLogoutClick}
      />
    </>
  )
}
