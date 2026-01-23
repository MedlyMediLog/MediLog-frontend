import type { ReactNode } from 'react'
import Footer from '../../_components/Footer'
import SideBar from '../../_components/common/SideBar/SideBar'
import { PageErrorBoundary } from '@/app/_components/ErrorBoundaryWrapper'

export default function WithFooterLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <aside className="hidden desktop:block shrink-0">
          <SideBar />
        </aside>

        <main className="flex-1">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  )
}
