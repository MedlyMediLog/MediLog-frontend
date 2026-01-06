import type { ReactNode } from "react";
import './globals.css'
import Footer from './_components/Footer'
import { ToastProvider } from "./_components/common/ToastProvider";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen">
        <ToastProvider>
        <main className='flex-1'> {children}</main>
        </ToastProvider>
      </body>
      <Footer />
    </html>
  )
}
