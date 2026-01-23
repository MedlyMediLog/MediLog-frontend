'use client'

import { useEffect, useRef } from 'react'
import { useMe } from '@/hooks/useMe'
import { getOrCreateAnonId } from '@/lib/analytics/identity'

export function LinkAnonOnLogin() {
  const { data: me } = useMe()
  const doneRef = useRef(false)

  useEffect(() => {
    if (!me) return
    if (doneRef.current) return
    doneRef.current = true

    const anonId = getOrCreateAnonId()

    fetch('https://api.medilog.today/api/auth/link-anon', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ anonId }),
      credentials: 'include',
    }).catch(() => {})
  }, [me])

  return null
}
