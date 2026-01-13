//src/app/product-listing/_compnents/shared/mock.ts
import type { ProductItemWithMeta } from './types'

import bottleCapsules from '@/assets/product-listing/mock/bottle-capsules.png'
import bottleTablets from '@/assets/product-listing/mock/bottle-tablets.png'
import boxStick from '@/assets/product-listing/mock/box-stick.png'
import dropper from '@/assets/product-listing/mock/dropper.png'
import placeholderCard from '@/assets/product-listing/placeholder/product-listing.png'

/**
 * ✅ mock 구성 원칙
 * - 임산부(pregnant) / 청소년(teen): 여러 개 노출
 * - 다이어터(diet): 항상 EmptyResult 노출
 *
 * 👉 이유:
 * 현재 로직에서 `섭취 금지`는 결과에서 제거됨
 * → diet 대상 제품을 전부 '섭취 금지'로 두면
 * → diet 탭은 항상 filtered.length === 0
 */
export const mockProducts: ProductItemWithMeta[] = [
  /* ===============================
   * 임산부 / 청소년 (정상 노출용)
   * =============================== */

  {
    id: 'p01',
    brand: '일양약품',
    name: '루테인 골드',
    tags: ['루테인', '아연'],
    image: bottleCapsules,
    targets: ['pregnant', 'teen'],
    status: '섭취 가능',
  },
  {
    id: 'p02',
    brand: '네이처메이드',
    name: '징코 빌로바',
    tags: ['은행잎추출물', '비타민E', '아연'],
    image: bottleTablets,
    targets: ['teen'],
    status: '섭취 고려',
  },
  {
    id: 'p03',
    brand: '솔가(Solgar)',
    name: '비타민 D3 1000 IU',
    tags: ['비타민D'],
    image: boxStick,
    targets: ['pregnant'],
    status: '주의사항',
  },
  {
    id: 'p04',
    brand: '고려은단',
    name: '비타민C 1000',
    tags: ['비타민C', '아연'],
    image: bottleTablets,
    targets: ['pregnant', 'teen'],
    status: '섭취 가능',
  },
  {
    id: 'p05',
    brand: '뉴트리원',
    name: '알티지 오메가3',
    tags: ['오메가3', 'EPA/DHA', '비타민E'],
    image: dropper,
    targets: ['pregnant'],
    status: '섭취 고려',
  },
  {
    id: 'p06',
    brand: 'GNC',
    name: '루테인 20mg',
    tags: ['루테인', '비타민A', '아연'],
    image: bottleCapsules,
    targets: ['teen'],
    status: '주의사항',
  },
  {
    id: 'p07',
    brand: '센트룸',
    name: '멀티비타민',
    tags: ['비타민D', '비타민B군'],
    image: boxStick,
    targets: ['pregnant', 'teen'],
    status: '섭취 가능',
  },
  {
    id: 'p08',
    brand: '종근당건강',
    name: '아이클리어 루테인 지아잔틴 (무태그)',
    tags: [],
    image: bottleCapsules,
    targets: ['teen'],
    status: '섭취 가능',
  },
  {
    id: 'p09',
    brand: '테스트브랜드',
    name: '프로바이오틱스 (placeholder)',
    tags: ['유산균', '프리바이오틱스', '아연', '비타민D'],
    image: placeholderCard,
    targets: ['pregnant'],
    status: '주의사항',
  },

  /* ===============================
   * 다이어터(diet) – 전부 금지
   * → EmptyResult 강제 노출용
   * =============================== */

  {
    id: 'p10',
    brand: '닥터린',
    name: '밀크씨슬 (다이어터)',
    tags: ['실리마린', '비타민B'],
    image: bottleTablets,
    targets: ['diet'],
    status: '섭취 금지',
  },
  {
    id: 'p11',
    brand: '테스트브랜드',
    name: '다이어트 보조제 A',
    tags: ['카페인', '가르시니아'],
    image: dropper,
    targets: ['diet'],
    status: '섭취 금지',
  },
  {
    id: 'p12',
    brand: '테스트브랜드',
    name: '다이어트 보조제 B',
    tags: ['L-카르니틴', '카페인'],
    image: boxStick,
    targets: ['diet'],
    status: '섭취 금지',
  },
]
