import { cn } from "@/lib/utils";
import { ToastItem as ToastItemType } from "./types";

type Props={
    toast:ToastItemType
}

const toastStyles = {
    success: 'bg-[#323C48] text-[#FBFDFD] typo-b1',
    error: 'bg-[#FEB3AF] text-[#671002] border border-[#FC6A66] typo-b1'
}

export default function Toast({toast}:Props){
    return (
        <div 
            className={cn(
                'px-[12px] py-[12px] gap-[10px] rounded-[8px]',
                'animate-slide-in',
                toastStyles[toast.type]
            )}
        >
            {toast.message}
        </div>
    )
}