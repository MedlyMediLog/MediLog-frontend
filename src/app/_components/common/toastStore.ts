import { ToastType } from './types'

let toastHandler: ((message: string, type: ToastType) => void) | null = null

export const registerToast = (
  handler: (message: string, type: ToastType) => void
) => {
  toastHandler = handler
}

export const toast = {
  success(message: string) {
    toastHandler?.(message, 'success')
  },
  error(message: string) {
    toastHandler?.(message, 'error')
  },
}