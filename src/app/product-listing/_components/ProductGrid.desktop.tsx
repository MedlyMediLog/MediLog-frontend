// src/app/product-listing/_components/desktop/ProductGrid.desktop.tsx
import Link from 'next/link'
import { ProductCard } from './ProductCard'
import type { ProductItem } from './shared/types'

type Props = {
  items: ProductItem[]
  showStatus?: boolean
}

export default function ProductGridDesktop({ items, showStatus = false }: Props) {
  return (
    <div className={['w-full flex flex-wrap', 'gap-x-4 gap-y-10', 'items-start content-start'].join(' ')}>
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/products/${item.id}`}
          className="block"
          aria-label={`${item.name} 상세로 이동`}
        >
          <ProductCard item={item} showStatus={showStatus} />
        </Link>
      ))}
    </div>
  )
}
