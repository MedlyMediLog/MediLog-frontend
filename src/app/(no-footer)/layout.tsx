import type { ReactNode } from 'react'

export default function NoFooterLayout({ children }: { children: ReactNode }) {
  return <main className="min-h-screen">{children}</main>
}
