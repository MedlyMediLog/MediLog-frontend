import { useQuery } from '@tanstack/react-query'
import type { ProductDetail, Target } from '@/lib/api/types'

export function useProductDetail(params: { productCode: number; target?: Target | null }) {
  const { productCode, target } = params

  return useQuery({
    queryKey: ['productDetail', productCode, target ?? null],
    enabled: Number.isFinite(productCode),
    staleTime: 30_000,
    queryFn: async () => {
      // ✅ 브라우저 → Next route.ts(/api) → 백엔드로 고정
      const path = target
        ? `/api/v1/products/${productCode}?target=${encodeURIComponent(target)}`
        : `/api/v1/products/${productCode}`

      const res = await fetch(path, {
        method: 'GET',
        credentials: 'include',
        headers: { accept: 'application/json' },
        cache: 'no-store',
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || `Request failed: ${res.status}`)
      }

      return (await res.json()) as ProductDetail
    },
  })
}
