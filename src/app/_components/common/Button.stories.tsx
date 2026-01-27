import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: '버튼',
    variant: 'primary',
    shape: 'square',
    icon: true
  },
}

export const Secondary: Story = {
  args: {
    children: '버튼',
    variant: 'secondary',
    shape: 'rounded',
    icon:true
  },
}

export const Text: Story = {
  args: {
    children: '버튼',
    variant: 'secondary',
    shape: 'text',
    icon:true
  },
}