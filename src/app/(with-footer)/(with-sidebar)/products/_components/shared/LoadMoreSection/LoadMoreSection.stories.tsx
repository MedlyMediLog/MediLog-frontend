import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { LoadMoreSection } from './LoadMoreSection'

const meta: Meta<typeof LoadMoreSection> = {
  title: 'Product Listing/Shared/LoadMoreSection',
  component: LoadMoreSection,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    total: { control: 'number' },
    visible: { control: 'number' },
    step: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof LoadMoreSection>

/* 기본 상태 */
export const Default: Story = {
  args: {
    total: 100,
    visible: 20,
    step: 20,
    onLoadMore: () => {},
  },
}

/* 더 이상 불러올 수 없는 상태 */
export const NoMore: Story = {
  args: {
    total: 20,
    visible: 20,
    onLoadMore: () => {},
  },
}

/* 실제 UX 테스트용 (상태 포함) */
function InteractiveDemo() {
  const TOTAL = 73
  const STEP = 20
  const [visible, setVisible] = React.useState(20)

  return (
    <div>
      <p style={{ marginBottom: 12 }}>
        현재 노출: {visible} / {TOTAL}
      </p>

      <LoadMoreSection
        total={TOTAL}
        visible={visible}
        step={STEP}
        onLoadMore={() =>
          setVisible((v) => Math.min(v + STEP, TOTAL))
        }
      />
    </div>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
}
