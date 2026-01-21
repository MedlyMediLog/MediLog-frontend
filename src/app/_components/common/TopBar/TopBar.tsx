import clsx from 'clsx'
import { ReactNode } from 'react'


  type TopBarVariant = 'desktop' | 'mobile'

  type TopBarProps = {
    variant: TopBarVariant
    /* 공통 */
    className?: string
    left?: ReactNode
    center?: ReactNode
    right?: ReactNode

    /* 자주 쓰는 케이스 */
    title?: ReactNode
    showSearch?: boolean
    search?: ReactNode
    showLogin?: boolean
    loginButton?: ReactNode
  }

  export default function TopBar({
    variant,
    className,
    left,
    center,
    right,
    title,
    showSearch,
    search,
    showLogin,
    loginButton,
  }: TopBarProps) {
    if (variant === 'desktop') {
      return (
        <header className="w-[740px] py-4 px-5 gap-30 bg-layer-week flex items-center">
          <div className='gap-10 py-1 flex'>
            <div className="shrink-0">{left}</div>
          <div className="min-w-0">{(showSearch ? search : null)}</div>
          </div>
          <div className="shrink-0">{right ?? (showLogin ? loginButton : null)}</div>
        </header>
      )
    }
    return (
      <header className='w-[430px] h-[56px] p-4 gap-30 bg-layer-week flex items-center'>
        
          <div className='flex w-full justify-between items-center'>
            <div className="">{left}</div>

          <div className="min-w-0">
            {center ??
              (title ? <div className=" whitespace-nowrap typo-h5 text-fg-basic-accent">{title}</div> : null)}
          </div>

          <div className="shrink-0 flex items-center gap-2">{right}</div>
          </div>
       
      </header>
    )
  }
