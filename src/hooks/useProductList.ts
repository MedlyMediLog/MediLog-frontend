import { useQuery } from '@tanstack/react-query'
import type { Category, Target, ProductListResponse } from '@/types/product'

export function useProductList(params: { category: Category; target?: Target }) {
  const { category, target } = params

  return useQuery<ProductListResponse>({
    queryKey: ['productList', category],
    staleTime: 30_000,

    queryFn: async () => {
      const res = await fetch(`/api/v1/products?category=${category}`)
      console.log('res', res)
      if (!res.ok) {
        throw new Error('Failed to fetch product list')
      }

      return res.json()
    },
  })
}
