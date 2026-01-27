import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, useToast } from '@/app/_components/common/ToastProvider'
import Button from '@/app/_components/common/Button'

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

export const Success: Story = {
  render: () => <ToastDemo type="success" />,
}

export const Error: Story = {
  render: () => <ToastDemo type="error" />,
}