import Image from 'next/image'
import Button from '@/app/_components/common/Button'

import speech_bubble from '@/assets/login/speech_bubble.svg'
import google from '@/assets/google.png'

export default function LoginActions() {

    const handleGoogleLogin = () => {
        window.location.href = 
        'http://medly.deving.xyz:8080/oauth2/authorization/google'
    }
    
  return (
    <div className="flex-col flex justify-center items-center gap-2">
      <div className="flex flex-col gap-1 w-full justify-center items-center">
        <Image src={speech_bubble} width={153} height={34} alt="speech_bubble" />
        <Button
          variant="primary"
          shape="rounded"
          className="bg-layer-primary text-fg-basic-primary border border-[#dce4ed] w-full shadow-[0_0_8px_0_rgba(36,42,48,0.12)] h-12"
          icon={<Image src={google} width={20} height={20} alt="google" />}
          onClick={handleGoogleLogin}
        >
          구글로 계속하기
        </Button>
      </div>

      <div className="w-full h-5 px-2.5 gap-2 text-fg-basic-week flex items-center">
        <div className="w-full h-0 border-[0.5px] items-center text-fg-basic-week" />
        <div className="typo-b4 whitespace-nowrap">또는</div>
        <div className="w-full border-[0.5px] h-0 items-center text-fg-basic-week" />
      </div>

      <Button variant="primary" shape="text">
        <div className="typo-b5 text-fg-basic-primary">먼저 둘러볼게요</div>
      </Button>
    </div>
  )
}
