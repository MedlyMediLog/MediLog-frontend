import cancel_32 from '@/assets/cancel_32.svg'
import Image from 'next/image'

type Props = {
  onCancel?: () => void
}

export default function LoginHeader({onCancel}: Props) {
    return(
        <div className="w-full h-14 flex items-center justify-end p-4">
        <button onClick={onCancel} className='cursor-pointerㅇ'>
          <Image src={cancel_32} width={32} height={32} alt="cancel" />
        </button>
      </div>
    )
}