"use client";
import Image from 'next/image'
import ingredients from '@/assets/ingredients.png'
import see_more from '@/assets/see_more.png'
import { Card, CardHeader, CardContent } from '@/app/_components/common/Card'
import CardTitle from '@/app/_components/common/CardTitle/CardTitle'
import ingredient_24 from '@/assets/ingredient_24.svg'
import ingredient_32 from '@/assets/ingredient_32.svg'
import { Label } from '@/app/_components/common/Label/Label'

type Props = {
  ingredients: string[];
}

export default function IngredientsSection({ingredients}: Props) {
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
        {ingredients.map((ingredient, index) => {
          const variant = index < 3 ? "positive" : "default";
          return(
            <Label key={ingredient} variant={variant}>
            <div className="typo-b5 text-fg-basic-accent">{ingredient}</div>
          </Label>
        )})}
        
      </CardContent>
    </Card>
  )
}