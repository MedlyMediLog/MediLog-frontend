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
  ingredients: string[] | null;
}

export default function IngredientsSection({ingredients}: Props) {

  const hasIngredients = ingredients && ingredients.length > 0

  return (
    <Card className="flex flex-col gap-5 py-5 px-4 desktop:py-7.5 desktop:px-6 desktop:gap-7.5 shadow-[0_0_54px_rgba(0,0,0,0.06)]">
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
          title="이런 성분이 들어있어요"
        />
      </CardHeader>

      <CardContent className="flex w-full gap-2.5 items-center flex-wrap">
        {hasIngredients ? (ingredients.map((ingredient, index) => {
          const variant = index < 3 ? "positive" : "default";
          return(
            <Label key={ingredient} variant={variant}>
            <div className="typo-b5 text-fg-basic-accent">{ingredient}</div>
          </Label>
        )})) : (
          <div className='p-4 flex items-center gap-2.5 border-[#dce4ed] border rounded-[12px] w-full'>
            <div className='flex flex-col'>
              <div className=' typo-b2 text-fg-basic-primary'>
                이 제품에는 현재 확인된 포함 성분 정보가 없어요. <br/> 제품에 표기된 성분을 함께 확인해 주세요.
              </div>
            </div>
          </div>
        )}
        
      </CardContent>
    </Card>
  )
}