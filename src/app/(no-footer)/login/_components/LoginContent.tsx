'use client'

import LoginHeader from './LoginHeader'
import LoginBenefits from './LoginBenefits'
import LoginActions from './LoginActions'

type Props = {
  onClose: () => void
}

export default function LoginContent({onClose}: Props) {
  return (
    <div className="flex min-w-[335px] flex-col rounded-[20px] bg-layer-week h-[647px]">
      <LoginHeader onCancel={onClose}/>

      <div className="flex flex-1 p-5 flex-col justify-between">
        <LoginBenefits />
        <LoginActions />
      </div>
    </div>
  )
}
