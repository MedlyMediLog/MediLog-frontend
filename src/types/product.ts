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

export const CATEGORY_MAP = {
  eye: 'EYE',
  bone: 'BONE',
  immune: 'IMMUNE',
  energy: 'ENERGY',
  stress: 'STRESS',
  gut: 'GUT',
  blood: 'BLOOD',
  skin: 'SKIN',
  muscle: 'MUSCLE',
  liver: 'LIVER',
} as const

type CategoryProductMap = {
  default: ProductListResponse
  PREGNANT?: ProductListResponse
  TEEN?: ProductListResponse
  DIETER?: ProductListResponse
}

export const MOCK_PRODUCTS: Record<Category, CategoryProductMap> = {
  EYE: {
    default: {
      category: 'EYE',
      target: null,
      items: [
        {
          productId: 1,
          name: '루테인 지아잔틴',
          manufacturer: 'OO제약',
          ingredients: ['루테인', '지아잔틴'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/1.png',
        },
        {
          productId: 2,
          name: '비타민A',
          manufacturer: 'XX헬스',
          ingredients: ['비타민A'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/2.png',
        },
      ],
      allowed: null,
      caution: null,
    },
    PREGNANT: {
      category: 'EYE',
      target: 'PREGNANT',
      items: null,
      allowed: [
        {
          productId: 1,
          name: '루테인 지아잔틴',
          manufacturer: 'OO제약',
          ingredients: ['루테인', '지아잔틴'],
          level: 1,
          imageUrl: 'https://cdn.medilog.today/images/products/1.png',
        },
      ],
      caution: [
        {
          productId: 2,
          name: '비타민A',
          manufacturer: 'XX헬스',
          ingredients: ['비타민A'],
          level: 2,
          imageUrl: 'https://cdn.medilog.today/images/products/2.png',
        },
      ],
    },
  },

  BONE: {
    default: {
      category: 'BONE',
      target: null,
      items: [
        {
          productId: 3,
          name: '칼슘 마그네슘 비타민D',
          manufacturer: 'BB헬스',
          ingredients: ['칼슘', '마그네슘', '비타민D'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/3.png',
        },
        {
          productId: 4,
          name: '비타민D 고함량',
          manufacturer: 'KK헬스',
          ingredients: ['비타민D'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/4.png',
        },
      ],
      allowed: null,
      caution: null,
    },
    PREGNANT: {
      category: 'BONE',
      target: 'PREGNANT',
      items: null,
      allowed: [
        {
          productId: 3,
          name: '칼슘 마그네슘 비타민D',
          manufacturer: 'BB헬스',
          ingredients: ['칼슘', '마그네슘', '비타민D'],
          level: 1,
          imageUrl: 'https://cdn.medilog.today/images/products/3.png',
        },
      ],
      caution: [
        {
          productId: 4,
          name: '비타민D 고함량',
          manufacturer: 'KK헬스',
          ingredients: ['비타민D'],
          level: 2,
          imageUrl: 'https://cdn.medilog.today/images/products/4.png',
        },
      ],
    },
  },

  IMMUNE: {
    default: {
      category: 'IMMUNE',
      target: null,
      items: [
        {
          productId: 5,
          name: '비타민C 1000',
          manufacturer: 'CC뉴트리',
          ingredients: ['비타민C'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/5.png',
        },
        {
          productId: 6,
          name: '아연',
          manufacturer: 'LL뉴트리',
          ingredients: ['아연'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/6.png',
        },
      ],
      allowed: null,
      caution: null,
    },
    PREGNANT: {
      category: 'IMMUNE',
      target: 'PREGNANT',
      items: null,
      allowed: [
        {
          productId: 5,
          name: '비타민C 1000',
          manufacturer: 'CC뉴트리',
          ingredients: ['비타민C'],
          level: 1,
          imageUrl: 'https://cdn.medilog.today/images/products/5.png',
        },
      ],
      caution: [
        {
          productId: 6,
          name: '아연',
          manufacturer: 'LL뉴트리',
          ingredients: ['아연'],
          level: 2,
          imageUrl: 'https://cdn.medilog.today/images/products/6.png',
        },
      ],
    },
  },

  ENERGY: {
    default: {
      category: 'ENERGY',
      target: null,
      items: [
        {
          productId: 7,
          name: '비타민B 컴플렉스',
          manufacturer: 'DD랩',
          ingredients: ['비타민B1', '비타민B2', '비타민B6'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/7.png',
        },
        {
          productId: 8,
          name: '철분',
          manufacturer: 'MM케어',
          ingredients: ['철'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/8.png',
        },
      ],
      allowed: null,
      caution: null,
    },
    PREGNANT: {
      category: 'ENERGY',
      target: 'PREGNANT',
      items: null,
      allowed: [
        {
          productId: 7,
          name: '비타민B 컴플렉스',
          manufacturer: 'DD랩',
          ingredients: ['비타민B1', '비타민B2', '비타민B6'],
          level: 1,
          imageUrl: 'https://cdn.medilog.today/images/products/7.png',
        },
      ],
      caution: [
        {
          productId: 8,
          name: '철분',
          manufacturer: 'MM케어',
          ingredients: ['철'],
          level: 2,
          imageUrl: 'https://cdn.medilog.today/images/products/8.png',
        },
      ],
    },
  },

  STRESS: {
    default: {
      category: 'STRESS',
      target: null,
      items: [
        {
          productId: 9,
          name: '테아닌 홍경천',
          manufacturer: 'EE바이오',
          ingredients: ['L-테아닌', '홍경천추출물'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/9.png',
        },
        {
          productId: 10,
          name: '마그네슘',
          manufacturer: 'NN미네랄',
          ingredients: ['마그네슘'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/10.png',
        },
      ],
      allowed: null,
      caution: null,
    },
    PREGNANT: {
      category: 'STRESS',
      target: 'PREGNANT',
      items: null,
      allowed: [
        {
          productId: 9,
          name: '테아닌 홍경천',
          manufacturer: 'EE바이오',
          ingredients: ['L-테아닌', '홍경천추출물'],
          level: 1,
          imageUrl: 'https://cdn.medilog.today/images/products/9.png',
        },
      ],
      caution: [
        {
          productId: 10,
          name: '마그네슘',
          manufacturer: 'NN미네랄',
          ingredients: ['마그네슘'],
          level: 2,
          imageUrl: 'https://cdn.medilog.today/images/products/10.png',
        },
      ],
    },
  },

  GUT: {
    default: {
      category: 'GUT',
      target: null,
      items: [
        {
          productId: 11,
          name: '프로바이오틱스',
          manufacturer: 'FF유산균',
          ingredients: ['프로바이오틱스'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/11.png',
        },
        {
          productId: 12,
          name: '차전자피',
          manufacturer: 'OO식이섬유',
          ingredients: ['차전자피'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/12.png',
        },
      ],
      allowed: null,
      caution: null,
    },
    PREGNANT: {
      category: 'GUT',
      target: 'PREGNANT',
      items: null,
      allowed: [
        {
          productId: 11,
          name: '프로바이오틱스',
          manufacturer: 'FF유산균',
          ingredients: ['프로바이오틱스'],
          level: 1,
          imageUrl: 'https://cdn.medilog.today/images/products/11.png',
        },
      ],
      caution: [
        {
          productId: 12,
          name: '차전자피',
          manufacturer: 'OO식이섬유',
          ingredients: ['차전자피'],
          level: 2,
          imageUrl: 'https://cdn.medilog.today/images/products/12.png',
        },
      ],
    },
  },

  BLOOD: {
    default: {
      category: 'BLOOD',
      target: null,
      items: [
        {
          productId: 13,
          name: '오메가3',
          manufacturer: 'GG오일',
          ingredients: ['EPA', 'DHA'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/13.png',
        },
        {
          productId: 14,
          name: '비타민K',
          manufacturer: 'PP케어',
          ingredients: ['비타민K'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/14.png',
        },
      ],
      allowed: null,
      caution: null,
    },
    PREGNANT: {
      category: 'BLOOD',
      target: 'PREGNANT',
      items: null,
      allowed: [
        {
          productId: 13,
          name: '오메가3',
          manufacturer: 'GG오일',
          ingredients: ['EPA', 'DHA'],
          level: 1,
          imageUrl: 'https://cdn.medilog.today/images/products/13.png',
        },
      ],
      caution: [
        {
          productId: 14,
          name: '비타민K',
          manufacturer: 'PP케어',
          ingredients: ['비타민K'],
          level: 2,
          imageUrl: 'https://cdn.medilog.today/images/products/14.png',
        },
      ],
    },
  },

  SKIN: {
    default: {
      category: 'SKIN',
      target: null,
      items: [
        {
          productId: 15,
          name: '콜라겐 비오틴',
          manufacturer: 'HH뷰티',
          ingredients: ['콜라겐', '비오틴'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/15.png',
        },
        {
          productId: 16,
          name: '비타민E',
          manufacturer: 'QQ뷰티',
          ingredients: ['비타민E'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/16.png',
        },
      ],
      allowed: null,
      caution: null,
    },
    PREGNANT: {
      category: 'SKIN',
      target: 'PREGNANT',
      items: null,
      allowed: [
        {
          productId: 15,
          name: '콜라겐 비오틴',
          manufacturer: 'HH뷰티',
          ingredients: ['콜라겐', '비오틴'],
          level: 1,
          imageUrl: 'https://cdn.medilog.today/images/products/15.png',
        },
      ],
      caution: [
        {
          productId: 16,
          name: '비타민E',
          manufacturer: 'QQ뷰티',
          ingredients: ['비타민E'],
          level: 2,
          imageUrl: 'https://cdn.medilog.today/images/products/16.png',
        },
      ],
    },
  },

  MUSCLE: {
    default: {
      category: 'MUSCLE',
      target: null,
      items: [
        {
          productId: 17,
          name: '단백질 아미노산',
          manufacturer: 'II스포츠',
          ingredients: ['BCAA', '단백질'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/17.png',
        },
        {
          productId: 18,
          name: '크레아틴',
          manufacturer: 'RR스포츠',
          ingredients: ['크레아틴'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/18.png',
        },
      ],
      allowed: null,
      caution: null,
    },
    PREGNANT: {
      category: 'MUSCLE',
      target: 'PREGNANT',
      items: null,
      allowed: [
        {
          productId: 17,
          name: '단백질 아미노산',
          manufacturer: 'II스포츠',
          ingredients: ['BCAA', '단백질'],
          level: 1,
          imageUrl: 'https://cdn.medilog.today/images/products/17.png',
        },
      ],
      caution: [
        {
          productId: 18,
          name: '크레아틴',
          manufacturer: 'RR스포츠',
          ingredients: ['크레아틴'],
          level: 2,
          imageUrl: 'https://cdn.medilog.today/images/products/18.png',
        },
      ],
    },
  },

  LIVER: {
    default: {
      category: 'LIVER',
      target: null,
      items: [
        {
          productId: 19,
          name: '밀크시슬',
          manufacturer: 'JJ케어',
          ingredients: ['실리마린'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/19.png',
        },
        {
          productId: 20,
          name: 'NAC',
          manufacturer: 'SS케어',
          ingredients: ['N-아세틸시스테인'],
          level: null,
          imageUrl: 'https://cdn.medilog.today/images/products/20.png',
        },
      ],
      allowed: null,
      caution: null,
    },
    PREGNANT: {
      category: 'LIVER',
      target: 'PREGNANT',
      items: null,
      allowed: [
        {
          productId: 19,
          name: '밀크시슬',
          manufacturer: 'JJ케어',
          ingredients: ['실리마린'],
          level: 1,
          imageUrl: 'https://cdn.medilog.today/images/products/19.png',
        },
      ],
      caution: [
        {
          productId: 20,
          name: 'NAC',
          manufacturer: 'SS케어',
          ingredients: ['N-아세틸시스테인'],
          level: 2,
          imageUrl: 'https://cdn.medilog.today/images/products/20.png',
        },
      ],
    },
  },
} as const
