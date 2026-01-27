import type { Meta, StoryObj } from '@storybook/react';
import { InfoMessage } from './InfoMessage';

const meta: Meta<typeof InfoMessage> = {
  title: 'Common/InfoMessage',
  component: InfoMessage,
  parameters: {
    layout: 'centered',
  },
  args: {
    message: '안내 문구',
  },
};
export default meta;

type Story = StoryObj<typeof InfoMessage>;

export const Desktop_838: Story = {
  render: (args) => (
    <div style={{ width: 838 }}>
      <InfoMessage {...args} />
    </div>
  ),
};

export const Desktop_LongText: Story = {
  render: (args) => (
    <div style={{ width: 838 }}>
      <InfoMessage
        {...args}
        message="검색 결과가 없습니다. 다른 키워드로 다시 검색해보세요."
      />
    </div>
  ),
};

export const Mobile_360: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <InfoMessage {...args} />
    </div>
  ),
};

export const Mobile_LongText: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <InfoMessage
        {...args}
        message="검색 결과가 없습니다. 다른 키워드로 다시 검색해보세요."
      />
    </div>
  ),
};

export const NoIcon: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <InfoMessage {...args} showDefaultIcon={false} />
    </div>
  ),
};
