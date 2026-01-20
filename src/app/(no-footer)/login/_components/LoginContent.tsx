'use client'

import LoginHeader from './LoginHeader'
import LoginBenefits from './LoginBenefits'
import LoginActions from './LoginActions'

export default function LoginContent() {
  return (
    <div className="flex min-w-[335px] flex-col rounded-[20px] bg-layer-week h-[647px]">
      <LoginHeader />

      <div className="flex flex-1 p-5 flex-col justify-between">
        <LoginBenefits />
        <LoginActions />
      </div>
    </div>
  )
}
