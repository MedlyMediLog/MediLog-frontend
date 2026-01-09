import { cn } from "@/lib/utils"

type ButtonVariant = 'primary' | 'secondary'
type ButtonShape = 'square' | 'rounded' | 'text'

type ButtonProps = {
    children: React.ReactNode
    onClick?: ()=>void
    type?: 'button' | 'submit'
    disabled?: boolean
    loading?:boolean
    variant?:ButtonVariant
    shape?: ButtonShape
    icon?: boolean | React.ReactNode
}

const shapeStyles = {
    square: 'rounded-[12px] px-[16px] py-[6px] gap-[8px] typo-h5',
    rounded: 'rounded-[999px] px-[20px] py-[12px] gap-[8px] typo-h5',
    text: 'py-[4px] gap-[4px]'
}

const buttonStyles = {
  'secondary-square':
    'bg-[#DCE4ED] text-[#59636E] hover:shadow-[0_0_8px_rgba(89,99,110,0.25)]',

  'secondary-rounded':
    'bg-[#DCE4ED] text-[#323C48] hover:text-[#59636E]',

  'secondary-text':
    'bg-transparent text-[#838C97] hover:text-[#217CF9]',

  'primary-square':
    'bg-[#242A30] text-[#EDF2F6] hover:text-[#838C97]',

  'primary-rounded':
    'bg-[#242A30] text-[#EDF2F6] hover:text-[#838C97]',

  'primary-text':
    'bg-transparent text-[#59636E] hover:text-[#217CF9]',
}



const baseStyles = 'inline-flex items-center justify-center'

const iconStyles = 'w-[24px] h-[24px] rounded-[8px] bg-[#FAC2C2]/20 flex items-center justify-center shrink-0'

export default function Button({
    children,
    onClick,
    type ='button',
    disabled = false,
    loading =false,
    variant='primary',
    shape='square',
    icon
}:ButtonProps){
    const styleKey=`${variant}-${shape}` as const
    return (
        <button 
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            aria-disabled={disabled || loading}
            className={cn(
                baseStyles,
                shapeStyles[shape],
                buttonStyles[styleKey]
                
            )} 
        >
            {icon &&(
                <span className={cn(iconStyles)}>
                    {icon !== true ? icon : null}
                </span>
            )}
            {loading ? 'loading...':children}
        </button>
    )
}