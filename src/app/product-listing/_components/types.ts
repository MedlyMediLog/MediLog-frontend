import type { StaticImageData } from 'next/image';

export type ProductStatus = '섭취 가능' | '주의사항' | '섭취 금지';

export type ProductItem = {
  id: string;
  brand: string;
  name: string;
  tags?: string[];
  status?: ProductStatus;
  image?: StaticImageData;
};
