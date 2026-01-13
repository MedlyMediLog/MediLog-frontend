export type Category =
  | 'EYE'
  | 'BONE'
  | 'IMMUNE'
  | 'ENERGY'
  | 'STRESS'
  | 'GUT'
  | 'BLOOD'
  | 'SKIN'
  | 'MUSCLE'
  | 'LIVER'

export type Target = 'PREGNANT' | 'TEEN' | 'DIETER'

export interface ProductListItem {
  productId: number
  name: string
  manufacturer: string
  ingredients: string[]
  level: number | null
  imageUrl: string
}

export interface ProductListResponse {
  category: Category
  target: Target | null
  items: ProductListItem[] | null
  allowed: ProductListItem[] | null
  caution: ProductListItem[] | null
}
