import { cn } from '@/lib/utils'
import { ToastItem as ToastItemType } from './types'

type Props = {
  toast: ToastItemType
}

const toastStyles = {
  success: 'bg-layer-overlay text-[#FBFDFD] typo-b4 backdrop-blur-[6px]',
  error: 'bg-[#FEB3AF] text-[#671002] border border-[#FC6A66] typo-b4',
}

export default function Toast({ toast }: Props) {
  return (
    <div
      className={cn(
        'px-[10px] py-[8px] rounded-[8px]',
        'animate-slide-in',
        toastStyles[toast.type],
      )}
    >
      {toast.message}
    </div>
  )
}
