'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import Toast from './Toast'
import { ToastItem, ToastType } from './types'
import { registerToast } from './toastStore'

type ToastContextValue = {
  push: (message: string, type: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const push = (message: string, type: ToastType) => {
    const id = crypto.randomUUID()

    setToasts((prev) => {
      const alreadyExists = prev.some((t) => t.message === message && t.type === type)
      if (alreadyExists) return prev

      return [...prev, { id, message, type }]
    })

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  useEffect(() => {
    registerToast(push)
  }, [push])

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-[340px] left-1/2 -translate-x-1/2 flex flex-col gap-[10px] z-50">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
