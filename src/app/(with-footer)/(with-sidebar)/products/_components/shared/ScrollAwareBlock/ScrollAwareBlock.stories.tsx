// src/app/(with-footer)/(with-sidebar)/products/_components/shared/ScrollAwareBlock/ScrollAwareBlock.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { ScrollAwareBlock } from './ScrollAwareBlock'

const meta: Meta<typeof ScrollAwareBlock> = {
  title: 'Common/ScrollAwareBlock',
  component: ScrollAwareBlock,
  args: {
    hidden: false,
    className: 'w-full',
    children: (
      <div
        style={{
          padding: 16,
          borderRadius: 12,
          border: '1px solid #C1CAD6',
          background: '#FBFDFD',
        }}
      >
        ScrollAwareBlock content
      </div>
    ),
  },
}
export default meta

type Story = StoryObj<typeof ScrollAwareBlock>

export const Shown: Story = {
  args: { hidden: false },
}

export const Hidden: Story = {
  args: { hidden: true },
}
