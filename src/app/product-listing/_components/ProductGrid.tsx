// src/app/product-listing/_components/ProductGrid.tsx
import { ProductCard } from './ProductCard';
import { type ProductItem } from './types';

type Props = {
  items: ProductItem[];
  showStatus?: boolean;
};

export default function ProductGrid({ items, showStatus = false }: Props) {
  return (
    <div
      className={[
        // ✅ 피그마 상품목록
        // display:flex; flex-wrap:wrap; gap: 40px 16px;
        'w-full flex flex-wrap',
        'gap-x-4 gap-y-10', // 16 / 40
        // ✅ 피그마에는 center가 찍혀있지만 실제는 왼쪽부터 채우는게 자연스러움
        // (원하면 items-center content-center로 변경 가능)
        'items-start content-start',
      ].join(' ')}
    >
      {items.map((item) => (
        <ProductCard key={item.id} item={item} showStatus={showStatus} />
      ))}
    </div>
  );
}
