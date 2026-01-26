import Image from 'next/image'
import { Card, CardHeader, CardContent } from '@/app/_components/common/Card'
import CardTitle from '@/app/_components/common/CardTitle/CardTitle'
import caution_24 from '@/assets/caution_24.svg'
import caution_32 from '@/assets/caution_32.svg'

type Props = {
  cautionRaw: string[] | null
}

export default function SafetyGuideSection({ cautionRaw }: Props) {
  const hasCautionRaw = cautionRaw && cautionRaw.length > 0

  return (
    <Card className="flex flex-col gap-4 py-5 px-4 desktop:py-7.5 desktop:px-6 desktop:gap-6 shadow-[0_0_54px_rgba(0,0,0,0.06)]">
      {/* Header */}
      <CardHeader className="gap-2">
        <CardTitle
          icon={
            <>
              <Image
                src={caution_24}
                width={24}
                height={24}
                alt="caution"
                className="desktop:hidden "
              />
              <Image
                src={caution_32}
                width={32}
                height={32}
                alt="caution"
                className="hidden desktop:block "
              />
            </>
          }
          title="섭취전 확인할 주의사항이에요"
        />
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-col gap-2.5 desktop:gap-3">
        {hasCautionRaw ? (
          cautionRaw.map((raw, idx) => (
            <div
              key={`${raw}-${idx}`}
              className="w-full flex border-[1px] p-[8px] gap-[10px] bg-gray-0 border-gray-200 rounded-[8px] desktop:rounded-[12px] desktop:p-4"
            >
              <p className="typo-b3 text-fg-basic-accent desktop:typo-b2">{raw}</p>
            </div>
          ))
        ) : (
          <div className="p-4 flex items-center gap-2.5 border-[#dce4ed] border rounded-[12px] w-full">
            <div className="flex flex-col">
              <div className="typo-b2 text-fg-basic-primary">
                현재 제공 가능한 정보 기준으로, 주의사항은 확인되지 않았어요.
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
