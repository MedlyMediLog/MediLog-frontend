import Image from 'next/image'
import bottle from '@/assets/bottle.png'
import warning_fill from '@/assets/warning_fill.png'
import pill from '@/assets/pill.png'
import { Label } from '@/app/_components/common/Label/Label'

type Props = {
  name: string;
  manufacturer: string;
  appearanceForm: string;
  text: string;

}

export default function ProductSummarySection({name, manufacturer, appearanceForm, text}: Props) {
  return (
    <div className="flex flex-col gap-4 w-full desktop:w-[623px] desktop:gap-6">
      {/* 제품 */}
      <div className="flex flex-col w-full gap-2 desktop:gap-3">
        {/* ✅ 히어로 카드: 가로는 w-full, 높이는 aspect로 결정 */}
        <div className="w-full aspect-[335/223.15] rounded-[20px] bg-[#fbfdfd] flex items-center justify-center">
          <div
            className="
              relative shrink-0
              w-full h-full rounded-[20px]
            "
          >
            <Image src={pill} fill alt="bottle" className=" rounded-[20px]" priority />
          </div>
        </div>

        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-col gap-2 items-start">
            <div className="typo-b3 text-fg-basic-primary desktop:typo-h5">{manufacturer}</div>

            <div className="typo-b1 text-fg-basic-accent desktop:typo-h2">
              {name}
            </div>
            <Label variant="default" ><div className='text-fg-basic-accent typo-b5'>{appearanceForm}</div></Label>
          </div>

        </div>
      </div>

      {/* 설명 */}
      <div className="flex flex-col gap-3 w-full">
        <div className="typo-b3 text-gray-700 desktop:typo-b2">
          “SUNGSANG 원문” <br /> =&gt; ex) {text}
        </div>
      </div>

      {/* 주의사항 */}
      <div className="flex flex-col w-full rounded-[12px] p-2.5 gap-1.5 bg-[#fbe4e4]">
        <div className="flex w-full gap-1 py-2.5">
          <div className="w-5 h-5 relative shrink-0">
            <Image src={warning_fill} fill alt="warning" className="object-contain" />
          </div>
          <div className="typo-b4 text-fg-danger-primary-accent">
            본 정보는 일반적인 참고용이며, 의료적 판단이나 조언을 제공하지 않습니다. 개인 상태에
            따라 다를 수 있으므로, 이상 증상이 있거나 우려되는 경우 전문가 상담이 필요합니다.
          </div>
        </div>
      </div>
    </div>
  )
}
