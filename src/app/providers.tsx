'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorState } from './_components/common/ErrorState'

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={() => (
              <ErrorState
                code="5XX errors"
                description={'카테고리 정보를 불러올 수 없어요.\n잠시 후 다시 시도해주세요.'}
                actionLabel="다시 시도하기"
                onAction={reset}
              />
            )}
          >
            {children}
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary> */}
      {children}
    </QueryClientProvider>
  )
}
