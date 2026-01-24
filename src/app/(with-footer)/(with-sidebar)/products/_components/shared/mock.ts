//src/app/(with-footer)/(with-sidebar)/products/_components/shared/mock.ts
import type { ProductItemWithMeta } from './types'
import type { StaticImageData } from 'next/image'

import bottleCapsules from '@/assets/product-listing/mock/bottle-capsules.png'
import bottleTablets from '@/assets/product-listing/mock/bottle-tablets.png'
import boxStick from '@/assets/product-listing/mock/box-stick.png'
import dropper from '@/assets/product-listing/mock/dropper.png'
import placeholderCard from '@/assets/product-listing/placeholder/product-listing.png'

/**
 * mock 구성 원칙
 * - 임산부(pregnant) / 청소년(teen): 여러 개 노출 (더보기/스크롤 테스트용 대량 생성)
 * - 다이어터(diet): 항상 EmptyResult 노출 유지(전부 '섭취 금지'로 두면 필터에서 제거됨)
 */

/**
 * PNG + SVG 모두 커버하는 이미지 타입
 * - PNG 같은 정적 import: StaticImageData
 * - SVG가 문자열 URL로 들어오는 설정: string
 *
 * (만약 SVGR로 React 컴포넌트 형태의 SVG를 쓰는 프로젝트면,
 *  next/image src로는 못 쓰고 컴포넌트로 렌더링해야 함)
 */
type ImageSrc = StaticImageData | string

type ImgKey = 'capsules' | 'tablets' | 'stick' | 'dropper' | 'placeholder'

const IMAGES: Record<ImgKey, ImageSrc> = {
  capsules: bottleCapsules,
  tablets: bottleTablets,
  stick: boxStick,
  dropper,
  placeholder: placeholderCard,
}

const BRANDS = [
  '일양약품',
  '네이처메이드',
  '솔가(Solgar)',
  '고려은단',
  '뉴트리원',
  'GNC',
  '센트룸',
  '종근당건강',
  '닥터린',
  '테스트브랜드',
  'GNM자연의품격',
  '락토핏',
  '정관장',
  '뉴트리코어',
  '종근당',
  '대웅제약',
] as const

const NAMES = [
  '루테인 골드',
  '징코 빌로바',
  '비타민 D3 1000 IU',
  '비타민C 1000',
  '알티지 오메가3',
  '프로바이오틱스',
  '멀티비타민',
  '마그네슘',
  '밀크씨슬',
  '콜라겐',
  '아연',
  '비타민B군',
  '철분',
  '엽산',
  '칼슘',
  '오메가3 프리미엄',
  '루테인 지아잔틴',
  '유산균 패밀리',
] as const

const TAG_POOL = [
  '루테인',
  '아연',
  '비타민D',
  '비타민C',
  '비타민E',
  '비타민A',
  '비타민B군',
  '오메가3',
  'EPA/DHA',
  '은행잎추출물',
  '유산균',
  '프리바이오틱스',
  '칼슘',
  '마그네슘',
  '철분',
  '엽산',
  '콜라겐',
  '코엔자임Q10',
  '밀크씨슬',
  '프로폴리스',
] as const

const SAFE_STATUSES: Array<ProductItemWithMeta['status']> = [
  '섭취 가능',
  '섭취 고려',
  '주의사항',
]

function pick<T>(arr: readonly T[], idx: number) {
  return arr[idx % arr.length]
}

/** 태그 0~4개 정도 랜덤처럼 보이게 생성(결과는 고정/결정적) */
function buildTags(seed: number) {
  const count = seed % 5 // 0~4개
  const tags: string[] = []
  for (let i = 0; i < count; i++) {
    tags.push(pick(TAG_POOL, seed + i * 3))
  }
  return Array.from(new Set(tags))
}

function buildImageKey(seed: number): ImgKey {
  const keys: ImgKey[] = ['capsules', 'tablets', 'stick', 'dropper', 'placeholder']
  return pick(keys, seed)
}

function buildTargets(seed: number): ProductItemWithMeta['targets'] {
  // 임산부/청소년이 많이 나오도록 분포
  const r = seed % 8
  if (r === 0 || r === 3 || r === 6) return ['teen']
  if (r === 1 || r === 4 || r === 7) return ['pregnant']
  return ['pregnant', 'teen']
}

function makeProduct(idNum: number): ProductItemWithMeta {
  const seed = idNum * 7 + 13

  const brand = pick(BRANDS, seed)
  const nameBase = pick(NAMES, seed + 2)
  const status = pick(SAFE_STATUSES, seed + 4)
  const tags = buildTags(seed)
  const imageKey = buildImageKey(seed)

  // 테스트 편하게 이름에 번호 붙이기
  const name = `${nameBase} ${idNum}`

  return {
    id: `p${String(idNum).padStart(2, '0')}`,
    brand,
    name,
    tags,
    image: IMAGES[imageKey],
    targets: buildTargets(seed),
    status,
  }
}

const baseProducts: ProductItemWithMeta[] = [
  /* ===============================
   * 임산부 / 청소년 (기본 샘플)
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
   * 다이어터(diet) – 전부 금지 (EmptyResult 유지)
   * =============================== */
  {
    id: 'p10',
    brand: '닥터린',
    name: '밀크씨슬 (다이어터)',
    tags: ['실리마린', '비타민B'],
    image: bottleTablets,
    targets: ['dieter'],
    status: '섭취 금지',
  },
  {
    id: 'p11',
    brand: '테스트브랜드',
    name: '다이어트 보조제 A',
    tags: ['카페인', '가르시니아'],
    image: dropper,
    targets: ['dieter'],
    status: '섭취 금지',
  },
  {
    id: 'p12',
    brand: '테스트브랜드',
    name: '다이어트 보조제 B',
    tags: ['L-카르니틴', '카페인'],
    image: boxStick,
    targets: ['dieter'],
    status: '섭취 금지',
  },
]

/**
 * 추가 생성 데이터(더보기/스크롤 테스트용)
 * - p13 ~ p72 까지 60개 생성
 * - targets는 pregnant/teen 위주로 분포
 * - status는 '섭취 가능/섭취 고려/주의사항'만 사용(금지 없음)
 */
const generatedProducts: ProductItemWithMeta[] = Array.from(
  { length: 60 },
  (_, i) => makeProduct(13 + i),
)

export const mockProducts: ProductItemWithMeta[] = [
  ...baseProducts,
  ...generatedProducts,
]
