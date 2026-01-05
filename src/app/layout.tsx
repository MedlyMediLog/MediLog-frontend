import type { ReactNode } from "react";
import './globals.css'
import Footer from './_components/Footer'
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen">
        <main className='flex-1'> {children}</main>
      </body>
      <Footer />
    </html>
  )
}
