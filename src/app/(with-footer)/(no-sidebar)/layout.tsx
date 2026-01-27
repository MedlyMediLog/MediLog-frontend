import type { ReactNode } from 'react'
import Footer from '../../_components/Footer'
import { PageErrorBoundary } from '@/app/_components/ErrorBoundaryWrapper'

export default function WithFooterLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col flex-1">
        <PageErrorBoundary>{children}</PageErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}
