import type { Meta, StoryObj } from '@storybook/react';
import { QueryResult } from './QueryResult';

const meta: Meta<typeof QueryResult> = {
  title: 'Common/QueryResult',
  component: QueryResult,
  args: {
    count: 24,
    showRefresh: true,
    disabled: false,
    label: '조회 결과',
    unit: '개',
    onRefresh: () => {
      console.log('[QueryResult] refresh click');
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof QueryResult>;

export const Default: Story = {};

export const NoRefresh: Story = {
  args: { showRefresh: false },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const LargeCount: Story = {
  args: { count: 12345 },
};
