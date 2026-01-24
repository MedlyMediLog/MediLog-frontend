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
         {text}
        </div>
      </div>

      
    </div>
  )
}
