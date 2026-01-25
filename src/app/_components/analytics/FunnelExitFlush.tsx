'use client'

import { useEffect } from 'react'
import { ensureFunnelSessionExists, flushFunnelSession, hasFlushed } from '@/lib/analytics/funnelSession'

export default function FunnelExitFlush() {
  useEffect(() => {
    ensureFunnelSessionExists()

    const flushIfNeeded = () => {
      if (hasFlushed()) return
      flushFunnelSession({ reachedDetail: false })
    }

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flushIfNeeded()
    }

    const onBeforeUnload = () => {
      flushIfNeeded()
    }

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('beforeunload', onBeforeUnload)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [])

  return null
}
