// src/app/product-listing/_components/ProductCard.tsx
import Image from 'next/image';
import { Label } from '@/app/_components/common/Label/Label';
import { type ProductItem } from '@/app/product-listing/_components/types';

function statusToLabelVariant(status: ProductItem['status']) {
  // TODO: Label 컴포넌트 variant 규칙에 맞춰 조정 필요
  // 지금은 텍스트만 맞춰두고 스타일은 Label 구현에 맡기는 방향
  if (status === '섭취 가능') return 'success';
  if (status === '주의사항') return 'warning';
  return 'danger';
}

type Props = {
  item: ProductItem;
};

export default function ProductCard({ item }: Props) {
  return (
    <article className="flex flex-col gap-3">
      {/* 이미지 */}
      <div className="relative w-full overflow-hidden rounded-[12px] bg-[#ffffff] aspect-[302/202]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 302px, 100vw"
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#f5f7fa]">
            {/* 제공된 제품 placeholder 이미지로 교체 가능 */}
            <div className="h-[120px] w-[65px] rounded-[10px] bg-[#d9dfe7]" />
          </div>
        )}
      </div>

      {/* 브랜드 */}
      <p className="typo-b5 text-[#838c97]">{item.brand}</p>

      {/* 상품명 */}
      <p className="typo-b4 text-[#3d3d3d] line-clamp-2">
        {item.name}
      </p>

      {/* 라벨 / 태그 */}
      <div className="flex flex-wrap items-center gap-2">
        <Label variant={item.status === '섭취 가능' ? 'positive' : 'attention'}>
          {item.status}
        </Label>

        {item.tags?.slice(0, 2).map((t) => (
          <span
            key={t}
            className="rounded-full bg-[#dce4ed] px-2 py-1 typo-b5 text-[#3d3d3d]"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
