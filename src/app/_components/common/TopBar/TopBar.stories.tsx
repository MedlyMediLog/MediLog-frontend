import type { Meta, StoryObj } from '@storybook/react'
import TopBar from './TopBar'
import { SearchInput } from '../SearchInput'

const meta: Meta<typeof TopBar> = {
  title: 'Layout/TopBar',
  component: TopBar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['desktop', 'mobile'],
    },
  },
}

export default meta
type Story = StoryObj<typeof TopBar>

export const DesktopDefault: Story = {
  args: {
    variant: 'desktop',
    left: <div className="h-10 w-20  bg-gray-400" />,
    showSearch: true,
    search: (
      <SearchInput/>
    ),
    showLogin: true,
    loginButton: (
      <button className="rounded-full bg-gray-900 px-4 py-2 text-white">
        로그인 하기
      </button>
    ),
  },
}


export const MobileWithTitle: Story = {
  args: {
    variant: 'mobile',
    left: <div className="h-10 w-20  bg-gray-400" />,
    title: '페이지명',
    right: (
      <>
        <button className="h-8 w-8 rounded bg-gray-200" />
        <button className="h-8 w-8 rounded bg-gray-200" />
      </>
    ),
  },
}

