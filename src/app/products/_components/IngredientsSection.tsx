import Image from "next/image"
import ingredients from "@/assets/ingredients.png"
import see_more from "@/assets/see_more.png"
import { Card, CardHeader, CardContent } from "@/app/_components/common/Card"

export default function IngredientsSection() {
  return (
    <Card className="flex flex-col gap-[20px] py-[20px] px-[16px] desktop:py-7.5 desktop:px-6 desktop:gap-7.5">
      <CardHeader className="gap-2">
        <span className="w-6 h-6 relative shrink-0 desktop:w-8 desktop:h-8">
          <Image src={ingredients} fill alt="ingredients" className="object-contain" />
        </span>

        <div className="typo-b1 text-[#323c48] desktop:typo-h4">포함 성분</div>

        <button
          type="button"
          aria-label="포함 성분 더보기"
          className=" w-5 h-5 relative shrink-0 desktop:w-6 desktop:h-6"
        >
          <Image src={see_more} fill alt="see_more" className="object-contain" />
        </button>
      </CardHeader>

      <CardContent className="flex flex-col w-full gap-[12px]">
        <div className="flex border-b border-[#dce4ed] pb-[12px]">
          <div className="w-[148px] p-[10px] desktop:w-60 desktop:px-5 desktop:py-2.5">
            <div className="typo-b3 whitespace-nowrap">프로바이옥틱스(유산균)</div>
          </div>
          <div className="w-[148px] p-[10px] desktop:w-[223px] desktop:py-2.5 desktop:pr-5 desktop:pl-2.5 desktop:gap-2.5">
            <div className="typo-b3 whitespace-nowrap text-[#59636e]">혈중 콜레스테롤 개선</div>
          </div>
          <div className="text-center rounded-[999px] pt-1 px-3 pb-[5px] gap-2.5 bg-[#edf2f6] typo-b4 text-[#59636e] hidden desktop:flex items-center">1,000mg</div>
        </div>

        <div className="flex border-b border-[#dce4ed] pb-[12px]">
          <div className="w-[148px] p-[10px] desktop:w-60 desktop:px-5 desktop:py-2.5">
            <div className="typo-b3 whitespace-nowrap">프로바이옥틱스(유산균)</div>
          </div>
          <div className="w-[148px] p-[10px] desktop:w-[223px] desktop:py-2.5 desktop:pr-5 desktop:pl-2.5 desktop:gap-2.5">
            <div className="typo-b3 whitespace-nowrap text-[#59636e]">혈중 콜레스테롤 개선</div>
          </div>
          <div className="text-center rounded-[999px] pt-1 px-3 pb-[5px] gap-2.5 bg-[#edf2f6] typo-b4 text-[#59636e] hidden desktop:flex items-center">1,000mg</div>
        </div>

        <div className="flex border-b border-[#dce4ed] pb-[12px]">
          <div className="w-[148px] p-[10px] desktop:w-60 desktop:px-5 desktop:py-2.5">
            <div className="typo-b3 whitespace-nowrap">프로바이옥틱스(유산균)</div>
          </div>
          <div className="w-[148px] p-[10px] desktop:w-[223px] desktop:py-2.5 desktop:pr-5 desktop:pl-2.5 desktop:gap-2.5">
            <div className="typo-b3 whitespace-nowrap text-[#59636e]">혈중 콜레스테롤 개선</div>
          </div>
          <div className="text-center rounded-[999px] pt-1 px-3 pb-[5px] gap-2.5 bg-[#edf2f6] typo-b4 text-[#59636e] hidden desktop:flex items-center">1,000mg</div>
        </div>
      </CardContent>
    </Card>
  )
}
