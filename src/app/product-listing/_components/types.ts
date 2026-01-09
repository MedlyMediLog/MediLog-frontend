//src/app/product-listing/_components/types.ts
import type { StaticImageData } from 'next/image';

export type ProductStatus = '섭취 가능' | '섭취 고려' | '주의사항' | '섭취 금지';

export type ProductItem = {
  id: string;
  brand: string;
  name: string;
  tags?: string[]; // 포함 성분 등
  status?: ProductStatus; // 검색 후에만 보여줄 예정(렌더링에서 제어)
  image?: StaticImageData;
};
