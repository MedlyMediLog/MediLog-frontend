import type { ReactNode } from 'react'
import './globals.css'
import { ToastProvider } from './_components/common/ToastProvider'
import Providers from './providers'
import { LinkAnonOnLogin } from './(no-footer)/login/_components/LinkAnonOnLogin'
import { pretendard } from './font'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="min-h-screen bg-[#edf2f6]">
        <ToastProvider>
          <Providers>
            <LinkAnonOnLogin />
            {children}
          </Providers>
        </ToastProvider>
      </body>
    </html>
  )
}
