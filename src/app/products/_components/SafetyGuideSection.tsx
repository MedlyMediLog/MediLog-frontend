import Image from 'next/image'
import warning from '@/assets/warning.png'
import { Card, CardHeader, CardContent } from '@/app/_components/common/Card'

export default function SafetyGuideSection() {
  return (
    <Card className="flex flex-col gap-[16px] py-[20px] px-[16px] desktop:py-7.5 desktop:px-6 desktop:gap-6">
      {/* Header */}
      <CardHeader className="gap-2">
        <div className="w-6 h-6 desktop:w-8 desktop:h-8 relative shrink-0">
          <Image src={warning} fill alt="warning" className="object-contain" />
        </div>
        <div className="typo-h5 desktop:typo-h4 text-[#323c48]">주의 사항</div>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-col gap-2.5 desktop:gap-3">
        <div className="w-full rounded-[8px] border border-[#dce4ed] p-2 bg-[#fbfdfd] desktop:rounded-3 desktop:p-4 gap-2.5">
          <p className="typo-b3 text-[#242a30] desktop:typo-b2">
            직사광선을 피해 건조하고 서늘한 곳에서 보관해야해요.
          </p>
        </div>

        <div className="w-full rounded-[8px] border border-[#dce4ed] p-2 bg-[#fbfdfd] desktop:rounded-3 desktop:p-4 gap-2.5">
          <p className="typo-b3 text-[#242a30] desktop:typo-b2">
            특이체질등 알레르기 체질의 경우 제품 성분을 확인이 필요해요.
          </p>
        </div>

        <div className="w-full rounded-[8px] border border-[#dce4ed] p-2 bg-[#fbfdfd] desktop:rounded-3 desktop:p-4 gap-2.5">
          <p className="typo-b3 text-[#242a30] desktop:typo-b2">
            15세 이하의 어린이는 상기 섭취량의 절반 정도를 섭취하세요.
          </p>
        </div>

        <div className="w-full rounded-[8px] border border-[#dce4ed] p-2 bg-[#fbfdfd] desktop:rounded-3 desktop:p-4 gap-2.5">
          <p className="typo-b3 text-[#242a30] desktop:typo-b2">
            15세 이하의 어린이는 상기 섭취량의 절반 정도를 섭취하세요.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
