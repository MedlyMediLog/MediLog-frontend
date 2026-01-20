import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary'
type ButtonShape = 'square' | 'rounded' | 'text'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  loading?: boolean
  variant?: ButtonVariant
  shape?: ButtonShape
  icon?: boolean | React.ReactNode
  className?: string
}

const shapeStyles = {
  square: 'rounded-[12px] px-[16px] py-[6px] gap-[8px] typo-h5',
  rounded: 'rounded-[999px] px-[20px] py-[12px] gap-[8px] typo-h5',
  text: 'py-[4px] gap-[4px]',
} as const

const buttonStyles = {
  'secondary-square': 'bg-gray-200 text-fg-basic-primary hover:text-gray-700',
  'secondary-rounded': 'bg-gray-200 text-gray-900 hover:text-gray-700',
  'secondary-text': 'bg-transparent text-gray-500 hover:text-blue-700',

  'primary-square': 'bg-gray-1000 text-gray-100 hover:text-gray-500',
  'primary-rounded': 'bg-gray-1000 text-gray-100 hover:text-gray-500',
  'primary-text': 'bg-transparent text-gray-700 hover:text-blue-700',
} as const

const baseStyles = 'inline-flex items-center justify-center'

const iconStyles =
  'w-[24px] h-[24px] rounded-[8px] bg-[#FAC2C2]/20 flex items-center justify-center shrink-0'

export default function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  variant = 'primary',
  shape = 'square',
  icon,
  className,
}: ButtonProps) {
  const styleKey = `${variant}-${shape}` as const

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      className={cn(
        baseStyles,
        shapeStyles[shape],
        buttonStyles[styleKey],
        className
      )}
    >
      {icon && (
        <span className={iconStyles}>
          {icon !== true ? icon : null}
        </span>
      )}
      {loading ? 'loading...' : children}
    </button>
  )
}
