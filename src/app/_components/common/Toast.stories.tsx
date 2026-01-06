import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, useToast } from '@/app/_components/common/ToastProvider'
import Button from '@/app/_components/common/Button'

/**
 * Storybook에서 Toast는
 * "버튼을 눌렀을 때 뜨는 UX"로 보여주는 게 베스트
 */

const meta: Meta = {
  title: 'Feedback/Toast',
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
}

export default meta
type Story = StoryObj

/* ---------------------------------- */
/* 내부 테스트용 컴포넌트 */
/* ---------------------------------- */

function ToastDemo({ type }: { type: 'success' | 'error' }) {
  const { push } = useToast()

  return (
    <Button
      variant="primary"
      onClick={() => {
        push(
          type === 'success'
            ? '저장이 완료되었습니다'
            : '오류가 발생했습니다',
          type
        )
      }}
    >
      {type === 'success' ? '성공 토스트 띄우기' : '에러 토스트 띄우기'}
    </Button>
  )
}

/* ---------------------------------- */
/* Stories */
/* ---------------------------------- */

export const Success: Story = {
  render: () => <ToastDemo type="success" />,
}

export const Error: Story = {
  render: () => <ToastDemo type="error" />,
}