import Image from 'next/image';
import { Label } from '@/app/_components/common/Label/Label';
import type { ProductItem } from './types';

type Props = {
  item: ProductItem;
};

function statusToVariant(status?: ProductItem['status']) {
  // Label variant: 'default' | 'positive' | 'attention'
  if (status === '섭취 가능') return 'positive';
  if (status === '주의사항') return 'attention';
  if (status === '섭취 금지') return 'attention';
  return 'default';
}

export default function ProductCard({ item }: Props) {
  return (
    <article className="flex flex-col gap-3">
      {/* 이미지 */}
      <div className="relative w-full overflow-hidden rounded-[12px] bg-layer-week aspect-[302/202]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 302px, 100vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-[120px] w-[65px] rounded-[10px] bg-layer-secondary" />
          </div>
        )}
      </div>

      {/* 브랜드 */}
      <p className="typo-b5 text-fg-basic-accent">{item.brand}</p>

      {/* 상품명 */}
      <p className="typo-b4 text-fg-basic-primary line-clamp-2">{item.name}</p>

      {/* 라벨 + 태그 */}
      <div className="flex flex-wrap items-center gap-2">
        {item.status ? (
          <Label variant={statusToVariant(item.status)}>{item.status}</Label>
        ) : null}

        {item.tags?.slice(0, 2).map((t, idx) => (
          <span
            key={`${item.id}-${t}-${idx}`} // ✅ 중복 방지
            className="rounded-full bg-layer-secondary px-2 py-1 typo-b5 text-fg-basic-primary"
          >
            {t}
          </span>
        ))}

        {/* +N 표기(태그가 2개 초과면) */}
        {item.tags && item.tags.length > 2 ? (
          <span className="typo-b5 text-fg-basic-primary">+{item.tags.length - 2}</span>
        ) : null}
      </div>
    </article>
  );
}
