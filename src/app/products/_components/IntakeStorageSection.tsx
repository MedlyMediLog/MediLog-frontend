import Image from "next/image"
import question from "@/assets/question.png"
import { Card, CardContent } from "@/app/_components/common/Card"

export default function IntakeStorageSection() {
  return (
    <>
      <Card className="flex-col flex rounded-[20px] py-[20px] px-[16px] gap-[16px] bg-[#fbfdfd] desktop:py-7.5 desktop:px-6 desktop:gap-6">
        <div className="flex gap-[8px]">
          <div className="w-[24px] h-[24px] relative shrink-0 desktop:w-8 desktop:h-8">
            <Image src={question} fill alt="question" className="object-contain" />
          </div>
          <div className="typo-h5 text-[#323c48] desktop:typo-h4">섭취 ∙ 보관 방법</div>
        </div>
        <CardContent className="gap-3 flex flex-col">
            {/* 유의사항 */}
        <div className="w-full flex border-[1px] p-[8px] gap-[10px] bg-[#fbfdfd] border-[#dce4ed] rounded-[8px] desktop:rounded-[12px] desktop:p-4">
          <div className="typo-b3 text-[#242a30] desktop:typo-b2">
            1일 3회, 1회 1스푼(3.2g)씩 물에 녹여 섭취 하세요. [“SRV_USE”]
          </div>
        </div>
        {/* 유의사항 */}
        {/* 유의사항 */}
        <div className="w-full flex border-[1px] p-[8px] gap-[10px] bg-[#fbfdfd] border-[#dce4ed] rounded-[8px] desktop:rounded-[12px] desktop:p-4">
          <div className="typo-b3 text-[#242a30] desktop:typo-b2">
            직사광선을 피해 건조하고 서늘한 곳에서 보관해야해요. [“PRSRV_PD”]
          </div>
        </div>
        {/* 유의사항 */}
        {/* 유의사항 */}
        <div className="w-full flex border-[1px] p-[8px] gap-[10px] bg-[#fbfdfd] border-[#dce4ed] rounded-[8px] desktop:rounded-[12px] desktop:p-4">
          <div className="typo-b3 text-[#242a30] desktop:typo-b2">
            제조일 부터 24개월이내 사용되어야해요. [“DISTB_PD”]
          </div>
        </div>
        {/* 유의사항 */}
        </CardContent>
      </Card>
    </>
  )
}
