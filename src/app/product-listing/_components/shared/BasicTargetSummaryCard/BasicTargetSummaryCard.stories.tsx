// src/app/product-listing/_components/shared/BasicTargetSummaryCard/BasicTargetSummaryCard.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import { BasicTargetSummaryCard } from './BasicTargetSummaryCard'

const meta: Meta<typeof BasicTargetSummaryCard> = {
  title: 'Product Listing/Shared/BasicTargetSummaryCard',
  component: BasicTargetSummaryCard,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: { control: 'text' },
    helperTitle: { control: 'text' },
    helperLabel: { control: 'text' },
    defaultOpen: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof BasicTargetSummaryCard>

export const Default: Story = {
  args: {
    title: '기본/대상 타이틀',
    helperTitle: '한번 확인두면 편해요!',
    helperLabel: '필터링',
    defaultOpen: false,
  },
}

export const Opened: Story = {
  args: {
    title: '기본/대상 타이틀',
    helperTitle: '한번 확인두면 편해요!',
    helperLabel: '필터링',
    defaultOpen: true,
  },
}
