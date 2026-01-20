import cancel_32 from '@/assets/cancel_32.png'
import Image from 'next/image'

export default function LoginHeader() {
    return(
        <div className="w-full h-14 flex items-center justify-end p-4">
        <button>
          <Image src={cancel_32} width={32} height={32} alt="cancel" />
        </button>
      </div>
    )
}