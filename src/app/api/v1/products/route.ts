import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const category = searchParams.get('category')
  const target = searchParams.get('target')

  if (!category) {
    return NextResponse.json({ message: 'category is required' }, { status: 400 })
  }

  const backendUrl = new URL('https://api.medilog.today/v1/products')
  backendUrl.searchParams.set('category', category)
  if (target) backendUrl.searchParams.set('target', target)

  const res = await fetch(backendUrl.toString(), {
    // 필요 시 인증 헤더 추가
  })

  const data = await res.json()
  console.log(data)

  return NextResponse.json(data, { status: res.status })
}
