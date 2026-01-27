import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { SearchInput, type SearchInputProps } from './SearchInput'

const meta: Meta<typeof SearchInput> = {
  title: 'COMMON/SearchInput',
  component: SearchInput,
  args: {
    placeholder: '제조사/브랜드명으로 검색해보세요.',
    disabled: false,
    variant: 'desktop',
  },
  argTypes: {
    onSubmit: { action: 'submit' },
    onChange: { action: 'change' },
  },
}
export default meta

type Story = StoryObj<typeof SearchInput>

function DesktopControlled(args: SearchInputProps & { initialValue?: string }) {
  const [value, setValue] = React.useState(args.initialValue ?? '')

  return (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <SearchInput
        {...args}
        variant="desktop"
        value={value}
        onChange={(v) => {
          args.onChange?.(v)
          setValue(v)
        }}
        onSubmit={() => {
          args.onSubmit?.()
        }}
      />
    </div>
  )
}

/** 1) Desktop 기본 */
export const Desktop: Story = {
  args: {
    variant: 'desktop',
  },
  render: (args) => <DesktopControlled {...args} initialValue="" />,
}

/**  2) Desktop / WithValue */
export const WithValue: Story = {
  args: {
    variant: 'desktop',
  },
  render: (args) => <DesktopControlled {...args} initialValue="오메가3" />,
}

/**  3) Desktop / LongText */
export const LongText: Story = {
  args: {
    variant: 'desktop',
  },
  render: (args) => (
    <DesktopControlled
      {...args}
      initialValue="제조사이름이엄청길고브랜드명도엄청길어서검색창이깨지는지확인하는테스트텍스트입니다1234567890"
    />
  ),
}

/**  4) Desktop / Submit */
export const Submit: Story = {
  args: {
    variant: 'desktop',
  },
  render: (args) => <DesktopControlled {...args} initialValue="비타민" />,
}

/** 5) Mobile (아이콘만) */
export const Mobile: Story = {
  args: {
    variant: 'mobile',
    disabled: false,
  },
  render: (args) => (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <SearchInput
        {...args}
        variant="mobile"
        onSubmit={() => {
          args.onSubmit?.()
      
        }}
      />
    </div>
  ),
}

/**  6) Disabled */
export const Disabled: Story = {
  args: {
    variant: 'desktop',
    disabled: true,
  },
  render: (args) => <DesktopControlled {...args} initialValue="" />,
}
