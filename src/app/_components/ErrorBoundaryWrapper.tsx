// 'use client'

// import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
// import { ErrorState } from './common/ErrorState'

// function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-[60vh]">
//       <ErrorState
//         code="5XX errors"
//         description={'데이터를 불러오는 중 문제가 발생했어요.\n잠시 후 다시 시도해주세요.'}
//         actionLabel="다시 시도하기"
//         onAction={resetErrorBoundary}
//       />
//     </div>
//   )
// }

// export function ErrorBoundaryWrapper({ children }: { children: React.ReactNode }) {
//   return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
// }

'use client'

import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { ErrorState } from './common/ErrorState'

function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <ErrorState
        code="5XX errors"
        description={'데이터를 불러오는 중 문제가 발생했어요.\n잠시 후 다시 시도해주세요.'}
        actionLabel="다시 시도하기"
        onAction={resetErrorBoundary}
      />
    </div>
  )
}

export function PageErrorBoundary({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
}
