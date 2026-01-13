import { getProducts } from '@/lib/api/products'
import { CATEGORY_MAP, type Category } from '../_components/category.constants'
import { Target } from '@/types/product'

type Props = {
  params: Promise<{ category: string }>
  searchParams?: Promise<{ target?: Target }>
}

export default async function Page({ params, searchParams }: Props) {
  const { category: rawCategory } = await params
  const { target } = (await searchParams) ?? {}
  console.log(rawCategory)
  const category = CATEGORY_MAP[rawCategory as keyof typeof CATEGORY_MAP]

  if (!category) {
    throw new Error(`Invalid category: ${rawCategory}`)
  }

  const data = await getProducts(category, target)

  console.log('CATEGORY:', category)
  console.log('DATA:', data)

  return <pre className="p-20 text-sm">{JSON.stringify(data, null, 2)}</pre>
}
