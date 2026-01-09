import { NextResponse } from 'next/server'

type Params = {
  params: {
    productId: string
  }
}

export async function GET(request: Request, { params }: Params) {
  const { productId } = await params

  // 더미 데이터
  const product = {
    productId: 20040020006107,
    category: 'EYE',
    name: '루테인 지아잔틴',
    manufacturer: 'OO제약',
    target: 'PREGNANT',
    level: 'CAUTION',
    appearanceForm: '캡슐',
    text: '고유의 향미가 있고 노랑 입자성을 띄는 성상을 가지고 있어요',
    ingredients: ['루테인', '지아잔틴'],
    functionText: ['눈 건강에 도움을 줄 수 있음', '항산화에 도움을 줄 수 있음'],
    howToEat: '1일 1회 1캡슐',
    expiration: '제조일로부터 24개월',
    storageMethod: '직사광선을 피해 서늘한 곳 보관',
    cautionRaw: [
      '특정 질환자는 전문가와 상담하세요',
      '임산부/수유부는 섭취 전 전문가와 상담하세요',
    ],
    imageUrl: 'https://cdn.medilog.today/images/products/20040020006107.png',
  }

  return NextResponse.json({
    data: product,
  })
}
