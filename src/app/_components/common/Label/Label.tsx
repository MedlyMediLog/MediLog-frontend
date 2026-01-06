import clsx from 'clsx'

type LabelVariant = 'default' | 'positive' | 'attention'

interface LabelProps {
  children: React.ReactNode
  variant?: LabelVariant
}

export function Label({ children, variant = 'default' }: LabelProps) {
  return (
    <span className={clsx('inline-flex items-center rounded-[8px] py-[3px] px-2.5 typo-b5',
        {
            // variant
            "bg-layer-secondary text-fg-basic-accent": variant === "default",
            "bg-fg-info-secondary-week text-fg-info-secondary-accent": variant === "positive",
            "bg-fg-danger-secondary-week text-fg-danger-secondary-accent": variant === "attention"
        }
    )}>
      {children}
    </span>
  )
}
