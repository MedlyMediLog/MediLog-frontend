import Image from "next/image"
import question from "@/assets/question.png"
import { Card, CardContent } from "@/app/_components/common/Card"
import CardTitle from "@/app/_components/common/CardTitle/CardTitle"
import intake_24 from "@/assets/intake_24.svg"
import intake_32 from "@/assets/intake_32.svg"

export default function IntakeStorageSection() {
  return (
    <>
      <Card className="flex-col flex rounded-[20px] py-5 px-4 gap-4  desktop:py-7.5 desktop:px-6 desktop:gap-6">
        <CardTitle
        icon={
          <>
            <Image
              src={intake_24}
              width={24}
              height={24}
              alt="ingredient"
              className="desktop:hidden"
            />
            <Image
              src={intake_32}
              width={32}
              height={32}
              alt="ingredient"
              className="hidden desktop:block"
            />
          </>
        }
        title="섭취 ∙ 보관 방법"
       
      />
        <CardContent className="gap-3 flex flex-col">
            {/* 유의사항 */}
        <div className="w-full flex border-[1px] p-[8px] gap-[10px] bg-gray-0 border-gray-200 rounded-[8px] desktop:rounded-[12px] desktop:p-4">
          <div className="typo-b3 text-fg-basic-accent desktop:typo-b2">
            1일 3회, 1회 1스푼(3.2g)씩 물에 녹여 섭취 하세요. [“SRV_USE”]
          </div>
        </div>
        {/* 유의사항 */}
        {/* 유의사항 */}
        <div className="w-full flex border-[1px] p-[8px] gap-[10px] bg-gray-0 border-gray-200 rounded-[8px] desktop:rounded-[12px] desktop:p-4">
          <div className="typo-b3 text-fg-basic-accent desktop:typo-b2">
            직사광선을 피해 건조하고 서늘한 곳에서 보관해야해요. [“PRSRV_PD”]
          </div>
        </div>
        {/* 유의사항 */}
        {/* 유의사항 */}
        <div className="w-full flex border-[1px] p-[8px] gap-[10px] bg-gray-0 border-gray-200 rounded-[8px] desktop:rounded-[12px] desktop:p-4">
          <div className="typo-b3 text-fg-basic-accent desktop:typo-b2">
            제조일 부터 24개월이내 사용되어야해요. [“DISTB_PD”]
          </div>
        </div>
        {/* 유의사항 */}
        </CardContent>
      </Card>
    </>
  )
}
