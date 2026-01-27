import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

interface Props {
  slug: string
  label: string
  image: StaticImageData
}

export default function CategoryCard({ slug, label, image }: Props) {
  return (
    <Link href={`/products?category=${slug}`} className="flex flex-col gap-[8px] group">
      <div
        className="
      relative w-full aspect-[200/180]
      rounded-[12px]
      flex items-center justify-center
      gap-[10px] py-[20px] px-[21px]
      bg-layer-primary
      shadow-[0_0_54px_rgba(0,0,0,0.06)]
      transition-transform duration-200 ease-out
      group-hover:scale-[1.1]
    "
      >
        <Image
          src={image}
          alt={label}
          width={80}
          height={80}
          className="object-contain transition-transform duration-200 ease-out group-hover:scale-105"
        />
      </div>

      <div className="text-center typo-h4 text-gray-900">{label}</div>
    </Link>
  )
}
