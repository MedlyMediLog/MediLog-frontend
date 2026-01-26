import Image, { type StaticImageData } from 'next/image'
import bottle from '@/assets/bottle.png'
import pill from '@/assets/pill.png'
import { Label } from '@/app/_components/common/Label/Label'

type Props = {
  name: string
  manufacturer: string
  appearanceForm: string
  text: string
  imageUrl?: string | null
}

function getFallbackByAppearance(appearanceForm: string): StaticImageData {
  const key = (appearanceForm ?? '').trim()
  if (/(정제|캡슐|환)/.test(key)) return pill
  return bottle
}

function isValidHttpUrl(url: string) {
  return /^https?:\/\//i.test(url)
}

export default function ProductSummarySection({
  name,
  manufacturer,
  appearanceForm,
  text,
  imageUrl,
}: Props) {
  const fallback = getFallbackByAppearance(appearanceForm)

  const src: string | StaticImageData =
    typeof imageUrl === 'string' && isValidHttpUrl(imageUrl) ? imageUrl : fallback

  return (
    <div className="flex w-full flex-col gap-4 desktop:w-[620px] min-[1380px]:gap-6">
      {/* 제품 */}
      <div className="flex w-full flex-col gap-2 min-[1380px]:gap-3">
        {/* 히어로 카드 */}
        <div className="flex aspect-[335/223.15] w-full items-center justify-center rounded-[20px] bg-[#fbfdfd]">
          <div className="relative h-full w-full shrink-0 overflow-hidden rounded-[20px]">
            <Image
              src={src}
              fill
              alt={name}
              priority
              sizes="(min-width: 1380px) 623px"
              className="rounded-[20px] object-cover"
              onError={(e) => {
                // next/image 에러 시 fallback 강제 (remote 이미지가 깨지는 경우)
                const img = e.currentTarget as unknown as HTMLImageElement
                img.src = (fallback as unknown as { src: string }).src
              }}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col items-start gap-2">
            <div className="typo-b3 text-fg-basic-primary min-[1380px]:typo-h5">
              {manufacturer}
            </div>

            <div className="typo-b1 text-fg-basic-accent min-[1380px]:typo-h2">{name}</div>

            <Label variant="default">
              <div className="typo-b5 text-fg-basic-accent">{appearanceForm}</div>
            </Label>
          </div>
        </div>
      </div>

      {/* 설명 */}
      <div className="flex w-full flex-col gap-3">
        <div className="typo-b3 text-gray-700 min-[1380px]:typo-b2">{text}</div>
      </div>
    </div>
  )
}
