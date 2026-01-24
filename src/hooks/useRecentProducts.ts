import { useQuery } from '@tanstack/react-query'

export type RecentProduct = {
  productCode: string
  name: string
}

export function useRecentProducts(enabled = true) {
  return useQuery({
    queryKey: ['recent-products'],
    enabled,
    staleTime: 10_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    queryFn: async () => {
      const res = await fetch('/api/v1/products/users/me/recent-products', {
        method: 'GET',
        credentials: 'include',
      })

      // 401이면 로그인 안 한 상태 → 빈 배열로 처리(UX 편함)
      if (res.status === 401) return [] as RecentProduct[]

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || `Request failed: ${res.status}`)
      }

      return (await res.json()) as RecentProduct[]
    },
  })
}
