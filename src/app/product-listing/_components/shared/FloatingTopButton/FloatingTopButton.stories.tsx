import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FloatingTopButton } from './FloatingTopButton'

const meta: Meta<typeof FloatingTopButton> = {
  title: 'Common/FloatingTopButton',
  component: FloatingTopButton,
  args: {
    visible: true,
    onClick: () => alert('scroll to top'),
  },
}
export default meta

type Story = StoryObj<typeof FloatingTopButton>

export const Default: Story = {}

export const Hidden: Story = {
  args: { visible: false },
}
