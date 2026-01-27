import type { StaticImageData } from 'next/image'

export type TargetKey = 'pregnant' | 'teen' | 'dieter'
export type SelectedKey = 'all' | TargetKey

export type ProductStatus = '섭취 가능' | '섭취 고려' | '주의사항' | '섭취 금지'

/**
 * 이미지 타입
 * - StaticImageData: PNG/JPG 같은 정적 import (next/image가 만들어주는 타입)
 * - string: URL 문자열(예: API에서 내려오는 이미지 주소) 또는 SVG가 URL로 import되는 경우
 *
 * 주의:
 * - 만약 SVG를 React 컴포넌트(SVGR)로 import하는 설정이면 string이 아니라 컴포넌트가 되는데,
 *   그 경우는 next/image src로 못 넣고 <Icon />처럼 렌더링해야 함.
 */
export type ImageSrc = StaticImageData | string

export type ProductItem = {
  id: string
  brand: string
  name: string
  tags?: string[]
  status?: ProductStatus
  image?: ImageSrc
}

export type ProductItemWithMeta = ProductItem & {
  targets: TargetKey[]
  status: ProductStatus
}
