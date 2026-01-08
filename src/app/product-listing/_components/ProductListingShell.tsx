'use client';

import { useMemo, useState } from 'react';
import { SearchInput } from '@/app/_components/common/SearchInput/SearchInput';

import TargetTabs, { type TargetTabKey } from './TargetTabs';
import ProductGrid from './ProductGrid';
import type { ProductItem } from './types';

import bottleCapsules from '@/assets/product-listing/mock/bottle-capsules.png';
import bottleTablets from '@/assets/product-listing/mock/bottle-tablets.png';
import boxStick from '@/assets/product-listing/mock/box-stick.png';
import dropper from '@/assets/product-listing/mock/dropper.png';
import productListingPlaceholder from '@/assets/product-listing/placeholder/product-listing.png';

const MOCK_PRODUCTS: ProductItem[] = [
  {
    id: 'p1',
    brand: '제조사 혹은 브랜드명',
    name: '상품명 자리 상품명 자리 상품명 자리 상품명 자리',
    tags: ['포함 성분', '포함 성분'],
    status: '섭취 가능',
    image: bottleCapsules,
  },
  {
    id: 'p2',
    brand: '제조사 혹은 브랜드명',
    name: '상품명 자리 상품명 자리 상품명 자리',
    tags: ['포함 성분'],
    status: '주의사항',
    image: dropper,
  },
  {
    id: 'p3',
    brand: '제조사 혹은 브랜드명',
    name: '상품명 자리 상품명 자리 상품명 자리',
    tags: ['포함 성분', '포함 성분'],
    status: '섭취 금지',
    image: boxStick,
  },
  {
    id: 'p4',
    brand: '제조사 혹은 브랜드명',
    name: '상품명 자리 상품명 자리',
    tags: ['포함 성분', '포함 성분', '포함 성분'],
    status: '섭취 가능',
    image: bottleTablets,
  },
  {
    id: 'p5',
    brand: '제조사 혹은 브랜드명',
    name: '상품명 자리 상품명 자리',
    tags: ['포함 성분'],
    status: '섭취 가능',
    image: bottleCapsules,
  },
  {
    id: 'p6',
    brand: '제조사 혹은 브랜드명',
    name: '상품명 자리 상품명 자리',
    tags: ['포함 성분'],
    status: '주의사항',
    image: dropper,
  },
  {
    id: 'p7',
    brand: '제조사 혹은 브랜드명',
    name: '상품명 자리 상품명 자리',
    tags: ['포함 성분'],
    status: '섭취 금지',
    image: boxStick,
  },
  {
    id: 'p8',
    brand: '제조사 혹은 브랜드명',
    name: '상품명 자리 상품명 자리',
    tags: ['포함 성분'],
    status: '섭취 가능',
    image: productListingPlaceholder, // ✅ 일부는 플레이스홀더도 섞어보기
  },
];

export default function ProductListingShell() {
  const [tab, setTab] = useState<TargetTabKey>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    // TODO: 탭 필터링은 추후 확정
    const byTab = tab === 'all' ? MOCK_PRODUCTS : MOCK_PRODUCTS;

    if (!q) return byTab;
    return byTab.filter((p) => (p.name + p.brand).toLowerCase().includes(q));
  }, [query, tab]);

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1380px] px-5 desktop:px-20 py-10 desktop:py-15">
        <div className="flex flex-col gap-6">
          <h1 className="typo-d2 text-[#3d3d3d]">‘눈 건강’ 제품 정보 한눈에 보기</h1>

          <div className="flex flex-col gap-4 desktop:flex-row desktop:items-center desktop:justify-between">
            <TargetTabs value={tab} onChange={setTab} />

            <div className="w-full desktop:w-[420px]">
              <SearchInput
                value={query}
                onChange={(value: string) => setQuery(value)} // ✅ string onChange로 수정
                placeholder="제조사/브랜드명으로 검색해보세요!"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <span className="typo-b5 text-[#838c97]">조회 결과 {filtered.length}개</span>
          </div>

          <ProductGrid items={filtered} />
        </div>
      </div>
    </section>
  );
}
