//src/app/_components/common/QueryResult/QueryResult.stories.tsx
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
      // ✅ actions addon 없이도 확인 가능
      // 스토리북 콘솔(브라우저 devtools)에서 로그 확인
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
