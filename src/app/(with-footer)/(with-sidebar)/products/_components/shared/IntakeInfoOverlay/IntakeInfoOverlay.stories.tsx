import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { IntakeInfoOverlay } from './IntakeInfoOverlay'

const meta: Meta<typeof IntakeInfoOverlay> = {
  title: 'Product Listing/Shared/IntakeInfoOverlay',
  component: IntakeInfoOverlay,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    open: true,
    onClose: () => {},
  },
}

export default meta
type Story = StoryObj<typeof IntakeInfoOverlay>

export const Default: Story = {}

export const Closed: Story = {
  args: {
    open: false,
  },
}

/** ✅ Hooks는 "컴포넌트" 안에서만 사용 */
function InteractiveDemo() {
  const [open, setOpen] = React.useState(true)

  return (
    <div style={{ padding: 20 }}>
      <button type="button" onClick={() => setOpen(true)}>
        Open Overlay
      </button>

      <IntakeInfoOverlay open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

/**
 * ✅ 실제 UX 테스트용
 * - backdrop 클릭
 * - 닫기 버튼
 * - ESC 키
 */
export const Interactive: Story = {
  render: () => <InteractiveDemo />,
}
