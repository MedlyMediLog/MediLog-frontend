// src/app/product-listing/_components/desktop/ProductGrid.desktop.tsx
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
        <ProductCard key={item.id} item={item} showStatus={showStatus} />
      ))}
    </div>
  )
}
