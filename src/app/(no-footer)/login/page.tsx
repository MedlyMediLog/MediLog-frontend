'use client'

import { useRouter } from 'next/navigation'
import LoginContent from './_components/LoginContent'

export default function LoginPage() {
  const router = useRouter()

  return (
    <LoginContent
      onClose={() => {
        // 모바일: X 누르면 이전 화면으로
        router.back()
      }}
    />
  )
}
