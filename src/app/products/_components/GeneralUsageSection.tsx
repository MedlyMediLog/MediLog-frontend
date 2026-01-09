import Image from 'next/image'
import comment from '@/assets/comment.png'
import profile from '@/assets/profile.png'
import { Card, CardContent, CardHeader } from '@/app/_components/common/Card'

export default function GeneralUsageSection() {
  return (
    <>
      <Card className="flex flex-col gap-5 rounded-[20px] py-5 px-4 desktop:px-6 desktop:py-7.5 desktop:gap-6">
        <CardHeader className="flex gap-2">
          <div className="w-6 h-6 relative shrink-0 desktop:h-8 w-8">
            <Image src={comment} fill className="object-contain" alt="comment" />
          </div>
          <div className="typo-h5 text-[#323c48] desktop:typo-h4">일반적으로 이런 목적으로 취급돼요.</div>
        </CardHeader>
        <CardContent className="gap-5 flex flex-col desktop:gap-6">
          <div className="flex gap-[12px] items-center desktop:w-[572px]">
            <div className="w-[40px] h-[40px] relative shrink-0 gap-[16px]">
              <Image src={profile} fill className="object-contain" alt="profile" />
            </div>

            <div className="relative flex flex-col rounded-[12px] gap-[16px] pt-[6px] px-[16px] pb-[7px] bg-[#dce4ed] shadow-[0_0_16px_rgba(76,75,88,0.08)] ">
              {/* 말풍선 꼬리 */}
              <div
                className="
                        absolute left-[-6px] top-[12px]
                        h-0
                        border-t-[6px] border-b-[6px] border-r-[6px]
                         border-t-transparent border-b-transparent border-r-[#dce4ed]
                
                            "
              />

              <div className="typo-b3 text-[#454f5b]">
                어쩌고 저쩌고 할 때 먹어요. 어쩌고 저쩌고 할 때 먹어요.
              </div>
            </div>
          </div>
          <div className="flex gap-[12px] desktop:w-[572px]">
            <div className="w-[40px] h-[40px] relative shrink-0 gap-[16px] ">
              <Image src={profile} fill className="object-contain" alt="profile" />
            </div>

            <div className="relative flex flex-col rounded-[12px] gap-[16px] pt-[6px] px-[16px] pb-[7px] bg-[#dce4ed] shadow-[0_0_16px_rgba(76,75,88,0.08)] ">
              {/* 말풍선 꼬리 */}
              <div
                className="
                             absolute left-[-6px] top-[12px]
                              h-0
                             border-t-[6px] border-b-[6px] border-r-[6px]
                             border-t-transparent border-b-transparent border-r-[#dce4ed]
                
                             "
              />

              <div className="typo-b3 text-[#454f5b]">
                어쩌고 저쩌고 할 때 먹어요. 어쩌고 저쩌고 할 때 먹어요. 어쩌고 저쩌고 할 때 먹어요.
                어쩌고 저쩌고 할 때 먹어요. 어쩌고 저쩌고 할 때 먹어요.
              </div>
            </div>
          </div>
          <div className="flex gap-[12px] items-start desktop:w-[572px]">
            <div className="w-[40px] h-[40px] relative shrink-0 gap-[16px]">
              <Image src={profile} fill className="object-contain" alt="profile" />
            </div>

            <div className="relative flex flex-col rounded-[12px] gap-[16px] pt-[6px] px-[16px] pb-[7px] bg-[#dce4ed] shadow-[0_0_16px_rgba(76,75,88,0.08)] ">
              {/* 말풍선 꼬리 */}
              <div
                className="
                             absolute left-[-6px] top-[12px]
                              h-0
                             border-t-[6px] border-b-[6px] border-r-[6px]
                              border-t-transparent border-b-transparent border-r-[#dce4ed]
                
                             "
              />

              <div className="typo-b3 text-[#454f5b]">어쩌고 저쩌고 할 때 먹어요.</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
