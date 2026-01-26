import { useQuery } from '@tanstack/react-query'
import type { Category, Target, ProductListResponse } from '@/types/product'

export function useProductList(params: { category: Category; target?: Target }) {
  const { category, target } = params

  return useQuery<ProductListResponse>({
    queryKey: ['productList', category, target ?? null],

    queryFn: async () => {
      const url = new URL('/api/v1/products', window.location.origin)
      url.searchParams.set('category', category)
      if (target) url.searchParams.set('target', target)

      const res = await fetch(url.toString(), {
      
      })
      if (!res.ok) throw new Error('Failed to fetch product list')
      return (await res.json()) as ProductListResponse
    },

    // 자동 리패치 트리거 전부 끄기
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,

    staleTime: Infinity,

    gcTime: Infinity, 

    retry: false,
  })
}
