// src/app/product-listing/_components/shared/BasicTargetSummaryCard/BasicTargetSummaryCard.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import { BasicTargetSummaryCard } from '../BasicTargetSummaryCard'

const meta: Meta<typeof BasicTargetSummaryCard> = {
  title: 'Product Listing/Shared/BasicTargetSummaryCard',
  component: BasicTargetSummaryCard,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    helperTitle: { control: 'text' },
    helperLabel: { control: 'text' },
    defaultOpen: { control: 'boolean' },
    withSlotPadding: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof BasicTargetSummaryCard>

export const Default: Story = {
  args: {
    title: '기본/대상 타이틀',
    subtitle: '서브 타이틀',
    helperTitle: '함께 알아두면 좋아요!',
    helperLabel: '꿀팁',
    defaultOpen: false,
    withSlotPadding: true,
  },
}

export const Opened: Story = {
  args: {
    ...Default.args,
    defaultOpen: true,
  },
}

export const NoSlotPadding: Story = {
  args: {
    ...Default.args,
    withSlotPadding: false,
  },
}
