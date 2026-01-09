import { NextResponse } from 'next/server'

export async function GET() {
  // 지금은 더미 데이터
  const products = [
    {
      category: 'EYE',
      target: 'PREGNANT',
      allowed: [
        {
          productId: 20040020006107,
          name: '루테인 지아잔틴',
          manufacturer: 'OO제약',
          ingredients: ['루테인', '지아잔틴'],
          level: '1',
          imageUrl: 'https://cdn.medilog.today/images/products/20040020006107.png',
        },
      ],
      caution: [
        {
          productId: 20040020006108,
          name: '비타민A',
          manufacturer: 'XX헬스',
          ingredients: ['비타민A'],
          level: '2',
          imageUrl: 'https://cdn.medilog.today/images/products/20040020006108.png',
        },
      ],
    },
  ]

  return NextResponse.json({
    data: products,
  })
}
