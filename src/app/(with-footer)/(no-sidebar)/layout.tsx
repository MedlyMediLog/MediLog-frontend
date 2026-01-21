import type { ReactNode } from 'react'
import Footer from '../../_components/Footer'
import SideBar from '../../_components/common/SideBar/SideBar'

export default function WithFooterLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col flex-1">
        {children}

        {/* 🔑 핵심 */}
        <Footer className="mt-auto" />
      </main>
    </div>
  )
}
