"use client";

import ProductDeatilHeader from "./ProductDetailHeader";
import IngredientsSection from "./IngredientsSection";
import ProductSummarySection from "./ProductSummarySection";
import SafetyGuideSection from "./SafetyGuideSection";
import IntakeStorageSection from "./IntakeStorageSection";
import GeneralUsageSection from "./GeneralUsageSection";

import { useProductDetail } from "@/hooks/useProductDetail";
import { Target } from "@/lib/api/types";

type Props = {
  productId: number;
  target: Target | null;
};

export default function ProductDetailClient({ productId, target }: Props) {
  const { data, isLoading, isError } = useProductDetail({ productId, target });

  if (isLoading) return <div className="p-5">로딩중...</div>;
  if (isError || !data) return <div className="p-5">상세 정보를 불러오지 못했어요.</div>;

  return (
    <div className="flex flex-col bg-gray-100 relative">
      {/* 상단바: 제목/레벨/타겟 등 필요하면 data로 표시 */}
      <ProductDeatilHeader />

      <div className="w-full flex flex-col pt-5 pb-15 gap-5 desktop:pt-0 items-center">
        <div className="flex flex-col px-5 gap-5 desktop:flex-row desktop:gap-4">
          <div>
            <ProductSummarySection
              name={data.name}
              manufacturer={data.manufacturer}
              appearanceForm={data.appearanceForm}
              text={data.text}
            />
          </div>

          <div className="flex-col flex gap-5 desktop:w-155">
            <IngredientsSection ingredients={data.ingredients} />
            <GeneralUsageSection functionText={data.functionText} />
            <IntakeStorageSection
              howToEat={data.howToEat}
              expiration={data.expiration}
              storageMethod={data.storageMethod}
            />
            <SafetyGuideSection cautionRaw={data.cautionRaw} />
          </div>
        </div>
      </div>
    </div>
  );
}
