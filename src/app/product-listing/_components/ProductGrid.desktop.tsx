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
    <div
      className={[
        'w-full',
        // ✅ flex-wrap 대신 grid로: 컬럼/행 정렬이 설계서처럼 안정적으로 맞음
        'grid',
        // ✅ 740~1380+ 반응형: 가능한 만큼 채우되, 최소 카드 폭을 보장
        // - minmax(260px, 1fr): 카드가 너무 좁아지지 않게
        // - auto-fit: 화면 넓어질수록 컬럼 수 증가
        '[grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]',
        // ✅ 간격(기존 gap-x-4 / gap-y-10 유지)
        'gap-x-4',
        'gap-y-10',
        // ✅ 그리드 아이템이 위에서부터 쌓이도록
        'items-start',
      ].join(' ')}
    >
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/products/${item.id}`}
          // ✅ grid 아이템이 폭을 꽉 채우도록
          className="block w-full"
          aria-label={`${item.name} 상세로 이동`}
          onMouseDown={() => {
            console.log('[PL][Desktop] click item', {
              id: item.id,
              name: item.name,
              brand: item.brand,
              status: item.status,
            })
          }}
        >
          {/* ✅ 카드도 컨테이너 폭을 자연스럽게 따라가게 */}
          <div className="w-full">
            <ProductCard item={item} showStatus={showStatus} />
          </div>
        </Link>
      ))}
    </div>
  )
}
