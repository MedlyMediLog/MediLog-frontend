import { useQuery } from '@tanstack/react-query'
import type { ProductDetail, Target } from '@/lib/api/types'

export function useProductDetail(params: { productId: number; target?: Target | null }) {
  const { productId, target } = params

  return useQuery({
    queryKey: ['productDetail', productId, target ?? null],
    enabled: Number.isFinite(productId),
    staleTime: 30_000,
    queryFn: async () => {
      // 브라우저 → Next 프록시로 고정
      const path = target
        ? `/v1/products/${productId}?target=${encodeURIComponent(target)}`
        : `/v1/products/${productId}`

      const res = await fetch(path, {
        method: 'GET',
        credentials: 'include', // 브라우저 쿠키를 Next로 보냄
        headers: {
          accept: 'application/json',
        },
        cache: 'no-store',
      })

      if (!res.ok) {
        const contentType = res.headers.get('content-type') ?? ''
        const text = contentType.includes('application/json')
          ? JSON.stringify(await res.json().catch(() => ({})))
          : await res.text().catch(() => '')

        throw new Error(text || `Request failed: ${res.status}`)
      }

      return (await res.json()) as ProductDetail
    },
  })
}
