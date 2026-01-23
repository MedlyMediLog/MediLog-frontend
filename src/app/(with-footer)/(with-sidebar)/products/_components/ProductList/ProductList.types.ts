// src/app/(with-footer)/(with-sidebar)/products/_components/ProductList/ProductList.types.ts
import type { Target } from '@/types/product'

export type ApiProduct = {
  productCode: string | number
  name: string
  manufacturer: string
  ingredients: string[]
  level: number | null
  imageUrl: string | null
}

export type ProductListApiResponse = {
  category: string
  target: Target | null
  items: ApiProduct[] | null
  allowed: ApiProduct[] | null
  caution: ApiProduct[] | null
}
