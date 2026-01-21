import Image from "next/image"
import question from "@/assets/question.png"
import { Card, CardContent } from "@/app/_components/common/Card"
import CardTitle from "@/app/_components/common/CardTitle/CardTitle"
import intake_24 from "@/assets/intake_24.svg"
import intake_32 from "@/assets/intake_32.svg"

type Props = {
  howToEat: string;
  expiration: string;
  storageMethod: string;
}


export default function IntakeStorageSection({howToEat, expiration, storageMethod}: Props) {

  const items = [howToEat, storageMethod, expiration].filter(Boolean)

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
  {items.map((text, idx) => (
    <div
      key={idx}
      className="w-full flex border-[1px] p-[8px] gap-[10px] bg-gray-0 border-gray-200 rounded-[8px] desktop:rounded-[12px] desktop:p-4"
    >
      <div className="typo-b3 text-fg-basic-accent desktop:typo-b2">
        {text}
      </div>
    </div>
  ))}
</CardContent>

      </Card>
    </>
  )
}
