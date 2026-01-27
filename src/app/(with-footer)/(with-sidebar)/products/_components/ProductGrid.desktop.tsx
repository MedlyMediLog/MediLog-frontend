import Link from 'next/link'
import { ProductCard } from './ProductCard'
import type { ProductItem } from './shared/types'
import { trackClick } from '@/lib/analytics/clickCounter'

type Props = {
  items: ProductItem[]
  showStatus?: boolean
}

export default function ProductGridDesktop({ items, showStatus = false }: Props) {
  return (
    <div
      className={[
        'w-full',
        'grid',

        // 카드 폭 고정 (302px) + auto-fit
        '[grid-template-columns:repeat(auto-fit,302px)]',

        // gap은 16px 고정 (Tailwind gap-x-4 = 16px)
        'gap-x-4',
        'gap-y-10',

        'items-start',

        // 핵심: 남는 공간을 오른쪽에 몰지 않고 "그리드 전체를 가운데로"
        'justify-start',
      ].join(' ')}
    >
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/products/${item.id}`}
          className="block"
          aria-label={`${item.name} 상세로 이동`}
          onClick={() => trackClick('product_card')}
        >
          <ProductCard item={item} showStatus={showStatus} />
        </Link>
      ))}
    </div>
  )
}
