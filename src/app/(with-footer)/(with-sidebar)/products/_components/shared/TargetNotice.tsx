import Image from 'next/image'
import infoPng from '@/assets/product-listing/icons/icon-info.png'

type Props = {
  message: string
}

export default function TargetNotice({ message }: Props) {
  return (
    <div className="flex items-center gap-2 py-2">
      <Image src={infoPng} alt="" width={20} height={20} />
      <p className="typo-b5 text-fg-info-secondary-accent">{message}</p>
    </div>
  )
}
