'use client'

import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import ttakLoading from '@/assets/lottie/ttak_loading.json'

export default function LoadingSpinner({
  message = '정보 불러오는 중이에요',
}: {
  message?: string
}) {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === '') return '.'
        if (prev === '.') return '..'
        if (prev === '..') return '...'
        return ''
      })
    }, 500) // 👈 0.5초

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full flex flex-col items-center justify-center py-[80px] gap-[10px]">
      <Lottie animationData={ttakLoading} loop autoplay style={{ width: 120, height: 120 }} />
      <p className="typo-b3 text-gray-600">
        {message}
        <span className="inline-block w-[1.5em]">{dots}</span>
      </p>
    </div>
  )
}
