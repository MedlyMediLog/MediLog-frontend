import type { ReactNode } from "react"
import "./globals.css"
import Footer from "./_components/Footer"
import SideBar from "./_components/SideBar"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen bg-[#edf2f6]">
        <div className='flex flex-1'>
            <aside className='hidden desktop:block shrink-0'>
                <SideBar/>
          </aside>

          {/* Main */}
          <main className="flex-1">
            {children}
            <Footer/>
          </main>
          
        </div>

        
      </body>
    </html>
  )
}
