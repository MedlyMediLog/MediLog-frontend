import Image from 'next/image'
import ingredients from '@/assets/ingredients.png'
import see_more from '@/assets/see_more.png'
import { Card, CardHeader, CardContent } from '@/app/_components/common/Card'
import CardTitle from '@/app/_components/common/CardTitle/CardTitle'
import ingredient_24 from '@/assets/ingredient_24.svg'
import ingredient_32 from '@/assets/ingredient_32.svg'
import { Label } from '@/app/_components/common/Label/Label'

export default function IngredientsSection() {
  return (
    <Card className="flex flex-col gap-5 py-5 px-4 desktop:py-7.5 desktop:px-6 desktop:gap-7.5">
      <CardHeader className="gap-2">
        <CardTitle
          icon={
            <>
              <Image
                src={ingredient_24}
                width={24}
                height={24}
                alt="ingredient"
                className="desktop:hidden"
              />
              <Image
                src={ingredient_32}
                width={32}
                height={32}
                alt="ingredient"
                className="hidden desktop:block"
              />
            </>
          }
          title="포함 성분"
        />
      </CardHeader>

      <CardContent className="flex w-full gap-2.5 items-center flex-wrap">
        <Label variant="positive" children={<div className="typo-b5">나이아신</div>} />
        <Label variant="positive" children={<div className="typo-b5">비오틴</div>} />
        <Label
          variant="positive"
          children={<div className="typo-b5 text-fg-info-secondary-accent">비타민 B1</div>}
        />
        <Label
          variant="default"
          children={<div className="typo-b5 text-fg-basic-accent">비타민 B2</div>}
        />
        <Label
          variant="default"
          children={<div className="typo-b5 text-fg-basic-accent">비타민 B6</div>}
        />
        <Label
          variant="default"
          children={<div className="typo-b5 text-fg-basic-accent">비타민 C</div>}
        />
        <Label
          variant="default"
          children={<div className="typo-b5 text-fg-basic-accent">비타민 D</div>}
        />
        <Label
          variant="default"
          children={<div className="typo-b5 text-fg-basic-accent">비타민 E</div>}
        />
        <Label
          variant="default"
          children={<div className="typo-b5 text-fg-basic-accent">아연</div>}
        />
        <Label
          variant="default"
          children={<div className="typo-b5 text-fg-basic-accent">엽산</div>}
        />
        <Label
          variant="default"
          children={
            <div className="typo-b5 text-fg-basic-accent">저분자콜라겐펩타이드GT(제2022-6호)</div>
          }
        />
        <Label
          variant="default"
          children={<div className="typo-b5 text-fg-basic-accent">판토텐산</div>}
        />
      </CardContent>
    </Card>
  )
}
