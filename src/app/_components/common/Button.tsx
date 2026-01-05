import { cn } from "@/lib/utils"

type ButtonVariant = 'choose' | 'notchoose' | 'outline'
type ButtonSize='md'

type ButtonProps = {
    children: React.ReactNode
    onClick?: ()=>void
    type?: 'button' | 'submit'
    disabled?: boolean
    loading?:boolean
    varaint?:ButtonVariant
    size?:ButtonSize
}

const sizeStyles = {
    md: 'typo-b2'
}

const variantStyles = {
    choose: 'bg-[#3D3D3D] text-white',
    notchoose:'bg-[#F5F5F5]',
    outline:'bg-[#F5F5F5] text-[#666666]'
}

const baseStyles = 'inline-flex items-center justify-center rounded-[16px] px-[13px] py-[6px]'



export default function Button({
    children,
    onClick,
    type ='button',
    disabled = false,
    loading =false,
    varaint='choose',
    size='md'
}:ButtonProps){
    return (
        <button 
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            aria-disabled={disabled || loading}
            className={cn(
                baseStyles,
                sizeStyles[size],
                variantStyles[varaint],
                
            )}
        >
            {loading ? 'loading...':children}
        </button>
    )
}