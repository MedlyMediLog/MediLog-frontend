//src/app/product-listing/_compnents/shared/types.ts
import type { StaticImageData } from 'next/image'

export type TargetKey = 'pregnant' | 'teen' | 'diet'
export type SelectedKey = 'all' | TargetKey

export type ProductStatus = '섭취 가능' | '섭취 고려' | '주의사항' | '섭취 금지'

export type ProductItem = {
  id: string
  brand: string
  name: string
  tags?: string[]
  status?: ProductStatus
  image?: StaticImageData
}

export type ProductItemWithMeta = ProductItem & {
  targets: TargetKey[]
  status: ProductStatus
}
