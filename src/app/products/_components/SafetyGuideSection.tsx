import Image from 'next/image'
import warning from '@/assets/warning.png'
import { Card, CardHeader, CardContent } from '@/app/_components/common/Card'
import CardTitle from '@/app/_components/common/CardTitle/CardTitle'
import caution_red_24 from "@/assets/caution_red_24.png"
import caution_red_32 from "@/assets/caution_red_32.png"

export default function SafetyGuideSection() {
  return (
    <Card className="flex flex-col gap-4 py-5 px-4 desktop:py-7.5 desktop:px-6 desktop:gap-6">
      {/* Header */}
      <CardHeader className="gap-2">
        <CardTitle
        icon={
          <>
            <Image
              src={caution_red_24}
              width={24}
              height={24}
              alt="caution"
              className="desktop:hidden "
            />
            <Image
              src={caution_red_32}
              width={32}
              height={32}
              alt="caution"
              className="hidden desktop:block "
            />
          </>
        }
        title="주의 사항"
       
      />
        
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-col gap-2.5 desktop:gap-3">
        <div className="w-full flex border-[1px] p-[8px] gap-[10px] bg-gray-0 border-gray-200 rounded-[8px] desktop:rounded-[12px] desktop:p-4">
          <p className="typo-b3 text-[#242a30] desktop:typo-b2">
            직사광선을 피해 건조하고 서늘한 곳에서 보관해야해요.
          </p>
        </div>

        <div className="w-full flex border-[1px] p-[8px] gap-[10px] bg-gray-0 border-gray-200 rounded-[8px] desktop:rounded-[12px] desktop:p-4">
          <p className="typo-b3 text-fg-basic-accent desktop:typo-b2">
            특이체질등 알레르기 체질의 경우 제품 성분을 확인이 필요해요.
          </p>
        </div>

        <div className="w-full flex border-[1px] p-[8px] gap-[10px] bg-gray-0 border-gray-200 rounded-[8px] desktop:rounded-[12px] desktop:p-4">
          <p className="typo-b3 text-fg-basic-accent desktop:typo-b2">
            15세 이하의 어린이는 상기 섭취량의 절반 정도를 섭취하세요.
          </p>
        </div>

        <div className="w-full flex border-[1px] p-[8px] gap-[10px] bg-gray-0 border-gray-200 rounded-[8px] desktop:rounded-[12px] desktop:p-4">
          <p className="typo-b3 text-fg-basic-accent desktop:typo-b2">
            15세 이하의 어린이는 상기 섭취량의 절반 정도를 섭취하세요.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
