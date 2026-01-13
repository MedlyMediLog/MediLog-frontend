import { getProducts } from '@/lib/api/products'
import { CATEGORY_MAP, type Category } from '../_components/category.constants'

type Props = {
  params: Promise<{
    category: string
  }>
}

export default async function Page({ params }: Props) {
  const { category: rawCategory } = await params
  console.log(rawCategory)
  const category = CATEGORY_MAP[rawCategory as keyof typeof CATEGORY_MAP]

  if (!category) {
    throw new Error(`Invalid category: ${rawCategory}`)
  }

  const data = await getProducts(category)

  console.log('CATEGORY:', category)
  console.log('DATA:', data)

  return <pre className="p-20 text-sm">{JSON.stringify(data, null, 2)}</pre>
}
