import Image from 'next/image'
import Logo from '@/assets/logo.png'
import check_20 from '@/assets/check_20.png'
import MaskedTextSlider from './MaskedTextSlider'

function BenefitItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1">
      <Image src={check_20} width={20} height={20} alt="check" />
      <div className="typo-b3 text-fg-basic-primary">{children}</div>
    </div>
  )
}

export default function LoginBenefits() {
  return (
    <div className="flex flex-col gap-14 items-start">
      <div className="flex gap-3 flex-col">

        <MaskedTextSlider
          phrases={['내 건강 고민에 맞게', '판단에 필요한 정보만', '필터링으로 찾기 쉽게']}
          delay={1000}
          duration={1600}
          hold={1000}
          widthClassName="w-[280px]" 
        />

        <Image src={Logo} width={102} height={36} alt="logo" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="typo-b3 text-fg-basic-secondary">로그인하면 이런 점이 좋아요</div>
        <div className="flex flex-col gap-1">
          <BenefitItem>찾아본 영양제를 저장할 수 있어요</BenefitItem>
          <BenefitItem>어디서든 저장한 목록을 확인할 수 있어요</BenefitItem>
        </div>
      </div>
    </div>
  )
}
