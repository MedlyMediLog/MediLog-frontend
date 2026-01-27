'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { logout } from '@/lib/api/logout'

type Options = {
  onAfterSuccess?: () => void
  redirectTo?: string | null
  refresh?: boolean
  onError?: (e: unknown) => void
}

export function useLogout(options: Options = {}) {
  const router = useRouter()
  const qc = useQueryClient()

  const {
    onAfterSuccess,
    redirectTo = null,
    refresh = true,
    onError,
  } = options

  return useCallback(async () => {
    try {
      await logout()

      qc.removeQueries({ queryKey: ['me'] })
      qc.removeQueries({ queryKey: ['recent-products'] })
      qc.removeQueries({ queryKey: ['productDetail'] })

      onAfterSuccess?.()

      if (redirectTo) router.replace(redirectTo)
      if (refresh) router.refresh()
    } catch (e) {
      onError?.(e)
      if (!onError) {
        console.error(e)
        alert('로그아웃에 실패했어요')
      }
    }
  }, [qc, router, onAfterSuccess, redirectTo, refresh, onError])
}
