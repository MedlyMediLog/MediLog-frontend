// src/lib/hooks/useMe.ts
import { useQuery } from '@tanstack/react-query'

export type Me = {
  name?: string
  email?: string
  provider?: string // google
  imageUrl?: string
}

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    queryFn: async () => {
      const res = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include', 
        cache: 'no-store',
        headers: {
          accept: 'application/json',
        },
      })
      if (res.status === 401) {
        return null
      }

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || `Request failed: ${res.status}`)
      }

      return (await res.json()) as Me
    },
  })
}
