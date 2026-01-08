import ProductCard from './ProductCard';
import { type ProductItem } from '@/app/product-listing/_components/types';

type Props = {
  items: ProductItem[];
};

export default function ProductGrid({ items }: Props) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8 desktop:grid-cols-4">
      {items.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}
