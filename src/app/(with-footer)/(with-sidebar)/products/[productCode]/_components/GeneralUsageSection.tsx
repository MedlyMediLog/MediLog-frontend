import Image from 'next/image'
import comment_24 from '@/assets/comment_24.svg'
import comment_32 from '@/assets/comment_32.svg'
import profile from '@/assets/profile.png'
import { Card, CardContent, CardHeader } from '@/app/_components/common/Card'
import CardTitle from '@/app/_components/common/CardTitle/CardTitle'
import Mention from '@/app/_components/common/Mention/Mention'

type Props = {
  functionText: string[];
}

export default function GeneralUsageSection({functionText}: Props) {
  return (
    <>
      <Card className="flex flex-col gap-5 rounded-[20px] py-5 px-4 desktop:px-6 desktop:py-7.5 desktop:gap-6">
        <CardHeader className="flex gap-2">
          <CardTitle
            icon={
              <>
                <Image
                  src={comment_24}
                  width={24}
                  height={24}
                  alt="comment"
                  className="desktop:hidden"
                />
                <Image
                  src={comment_32}
                  width={32}
                  height={32}
                  alt="comment"
                  className="hidden desktop:block"
                />
              </>
            }
            title="일반적으로 이런 목적으로 취급돼요."
          />
        </CardHeader>
        <CardContent className="gap-5 flex flex-col desktop:gap-6 ">
          {functionText.map((text, idx) => {
            return(
              <Mention
              key={idx}
            text={text}
            avatarSrc={profile}
          />
            )
          })}
          
        </CardContent>
      </Card>
    </>
  )
}
