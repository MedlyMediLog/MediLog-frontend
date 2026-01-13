// import Image from 'next/image'
// import eye from '@/assets/eye.png'
// import bone from '@/assets/bone.png'
// import blood from '@/assets/blood.png'
// import energy from '@/assets/energy.png'
// import immunity from '@/assets/immunity.png'
// import intestine from '@/assets/intestine.png'
// import liver from '@/assets/liver.png'
// import muscle from '@/assets/muscle.png'
// import skin from '@/assets/skin.png'
// import sleep from '@/assets/sleep.png'

// export default function CategoryCard() {
//   return (
//     <>
//       <div className="flex flex-col gap-[8px]">
//         <div className="relative w-full aspect-[200/180] rounded-[12px] flex items-center justify-center">
//           <Image src={eye} alt="" fill className="object-contain" priority />
//         </div>
//         <div className="text-center typo-h4 text-gray-900">눈 건강</div>
//       </div>
//       <div className="flex flex-col gap-[8px]">
//         <div className="relative w-full aspect-[200/180] rounded-[12px] flex items-center justify-center">
//           <Image src={bone} alt="" fill className="object-contain" priority />
//         </div>
//         <div className="text-center typo-h4 text-gray-900">뼈, 관절</div>
//       </div>
//       <div className="flex flex-col gap-[8px]">
//         <div className="relative w-full aspect-[200/180] rounded-[12px] flex items-center justify-center">
//           <Image src={immunity} alt="" fill className="object-contain" priority />
//         </div>
//         <div className="text-center typo-h4 text-gray-900">면역</div>
//       </div>
//       <div className="flex flex-col gap-[8px]">
//         <div className="relative w-full aspect-[200/180] rounded-[12px] flex items-center justify-center">
//           <Image src={energy} alt="" fill className="object-contain" priority />
//         </div>
//         <div className="text-center typo-h4 text-gray-900">피로, 에너지</div>
//       </div>
//       <div className="flex flex-col gap-[8px]">
//         <div className="relative w-full aspect-[200/180] rounded-[12px] flex items-center justify-center">
//           <Image src={sleep} alt="" fill className="object-contain" priority />
//         </div>
//         <div className="text-center typo-h4 text-gray-900">수면, 스트레스</div>
//       </div>
//       <div className="flex flex-col gap-[8px]">
//         <div className="relative w-full aspect-[200/180] rounded-[12px] flex items-center justify-center">
//           <Image src={intestine} alt="" fill className="object-contain" priority />
//         </div>
//         <div className="text-center typo-h4 text-gray-900">장 건강</div>
//       </div>
//       <div className="flex flex-col gap-[8px]">
//         <div className="relative w-full aspect-[200/180] rounded-[12px] flex items-center justify-center">
//           <Image src={blood} alt="" fill className="object-contain" priority />
//         </div>
//         <div className="text-center typo-h4 text-gray-900">혈행, 혈압</div>
//       </div>
//       <div className="flex flex-col gap-[8px]">
//         <div className="relative w-full aspect-[200/180] rounded-[12px] flex items-center justify-center">
//           <Image src={skin} alt="" fill className="object-contain" priority />
//         </div>
//         <div className="text-center typo-h4 text-gray-900">피부, 모발</div>
//       </div>
//       <div className="flex flex-col gap-[8px]">
//         <div className="relative w-full aspect-[200/180] rounded-[12px] flex items-center justify-center">
//           <Image src={muscle} alt="" fill className="object-contain" priority />
//         </div>
//         <div className="text-center typo-h4 text-gray-900">근육, 운동</div>
//       </div>
//       <div className="flex flex-col gap-[8px]">
//         <div className="relative w-full aspect-[200/180] rounded-[12px] flex items-center justify-center">
//           <Image src={liver} alt="" fill className="object-contain" priority />
//         </div>
//         <div className="text-center typo-h4 text-gray-900">간 건강</div>
//       </div>
//     </>
//   )
// }

import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

interface Props {
  slug: string
  label: string
  image: StaticImageData
}

export default function CategoryCard({ slug, label, image }: Props) {
  return (
    <Link href={`/category/${slug}`} className="flex flex-col gap-[8px]">
      <div className="relative w-full aspect-[200/180] rounded-[12px] flex items-center justify-center">
        <Image src={image} alt={label} fill className="object-contain" />
      </div>
      <div className="text-center typo-h4 text-gray-900">{label}</div>
    </Link>
  )
}
