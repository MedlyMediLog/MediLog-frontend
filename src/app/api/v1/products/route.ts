// src/app/api/v1/products/route.ts
import { NextResponse } from 'next/server'
import { MOCK_PRODUCTS, type Category } from '@/types/product'

function isCategory(v: string | null): v is Category {
  return (
    v === 'EYE' ||
    v === 'BONE' ||
    v === 'IMMUNE' ||
    v === 'ENERGY' ||
    v === 'STRESS' ||
    v === 'GUT' ||
    v === 'BLOOD' ||
    v === 'SKIN' ||
    v === 'MUSCLE' ||
    v === 'LIVER'
  )
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const rawCategory = searchParams.get('category')

  if (!rawCategory) {
    return NextResponse.json({ message: 'category is required' }, { status: 400 })
  }

  if (!isCategory(rawCategory)) {
    return NextResponse.json({ message: `invalid category: ${rawCategory}` }, { status: 400 })
  }

  const categoryData = MOCK_PRODUCTS[rawCategory]

  if (!categoryData) {
    return NextResponse.json({ message: `no data for category: ${rawCategory}` }, { status: 404 })
  }

  // ✅ 핵심: categoryData 전체를 그대로 응답
  return NextResponse.json(categoryData)
}
