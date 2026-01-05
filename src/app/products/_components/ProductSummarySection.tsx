import Image from "next/image"
import bottle from "@/assets/bottle.png"
import warning_fill from "@/assets/warning_fill.png"

export default function ProductSummarySection() {
  return (
    <div className="flex flex-col gap-4 w-full desktop:w-[623px] desktop:gap-6">
      {/* 제품 */}
      <div className="flex flex-col w-full gap-2 desktop:gap-3">
        {/* ✅ 히어로 카드: 가로는 w-full, 높이는 aspect로 결정 */}
        <div className="w-full aspect-[335/223.15] rounded-[20px] bg-[#fbfdfd] flex items-center justify-center">
          <div
            className="
              relative shrink-0
              desktop:w-[134.38px] desktop:h-[246.54px]
              w-[72.25px] h-[132.57px]
            "
          >
            <Image src={bottle} fill alt="bottle" className="object-contain" priority />
          </div>
        </div>

        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-col gap-2">
            <div className="typo-b3 text-[#59636e] desktop:typo-h5">제조사명 [“ENTRPS”]</div>

            
            <div className="typo-b1 text-[#242a30] desktop:typo-h2">제품명 자리입니다 [“PRDUCT”]</div>
          </div>

          
          <div className="inline-flex w-fit py-[3px] px-2.5 gap-2.5 bg-[#dce4ed] rounded-[8px]">
            <div className="typo-b5 text-[#323c48]">분말/알약/액상/캡슐 제품 [“SUNGSANG”]</div>
          </div>
        </div>
      </div>

      {/* 설명 */}
      <div className="flex flex-col gap-3 w-full">
        <div className="typo-b3 text-[#59636e] desktop:typo-b2">
          “SUNGSANG 원문” <br /> =&gt; ex) 고유의 향미가 있고 이미 ∙ 이취가 없는 노랑 하양색의
          입자성이 있는 분말의 성상을 가지고 있어요.
        </div>
      </div>

      {/* 주의사항 */}
      <div className="flex flex-col w-full rounded-[12px] p-2.5 gap-1.5 bg-[#fbe4e4]">
        <div className="flex w-full gap-1 py-2.5">
          <div className="w-5 h-5 relative shrink-0">
            <Image src={warning_fill} fill alt="warning" className="object-contain" />
          </div>
          <div className="typo-b4 text-[#fc6a66]">
            본 정보는 일반적인 참고용이며, 의료적 판단이나 조언을 제공하지 않습니다. 개인 상태에
            따라 다를 수 있으므로, 이상 증상이 있거나 우려되는 경우 전문가 상담이 필요합니다.
          </div>
        </div>
      </div>
    </div>
  )
}
