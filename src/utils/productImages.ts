import type { StaticImageData } from 'next/image'

// 프로젝트에 이미 있던 mock 이미지 4개
import bottleCapsules from '@/assets/product-listing/mock/bottle-capsules.png'
import bottleTablets from '@/assets/product-listing/mock/bottle-tablets.png'
import boxStick from '@/assets/product-listing/mock/box-stick.png'
import dropper from '@/assets/product-listing/mock/dropper.png'

import placeholder from '@/assets/product-listing/placeholder/product-listing.png'

const ROTATE_IMAGES: StaticImageData[] = [
  bottleCapsules,
  bottleTablets,
  boxStick,
  dropper,
]

/**
 * productId를 기준으로 4개 이미지를 순환해서 반환
 * - productId가 없거나 이상하면 placeholder
 */
export function getProductImageById(productId: number | string | undefined | null): StaticImageData {
  const n =
    typeof productId === 'number'
      ? productId
      : typeof productId === 'string'
        ? Number(productId)
        : NaN

  if (!Number.isFinite(n) || n <= 0) return placeholder

  // 1번 상품은 0번 인덱스부터 시작하도록 -1
  const idx = (n - 1) % ROTATE_IMAGES.length
  return ROTATE_IMAGES[idx] ?? placeholder
}
