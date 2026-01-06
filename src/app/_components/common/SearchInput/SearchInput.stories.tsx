import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { SearchInput } from './SearchInput'

const meta: Meta<typeof SearchInput> = {
  title: 'COMMON/SearchInput',
  component: SearchInput,
  args: {
    placeholder: '제조사/브랜드명으로 검색해보세요.',
    disabled: false,
    variant: 'desktop',
    value: '',
  },
  argTypes: {
    onSubmit: { action: 'submit' },
    onChange: { action: 'change' },
  },
}
export default meta

type Story = StoryObj<typeof SearchInput>

/** ✅ 1) Desktop 기본 */
export const Desktop: Story = {
  args: {
    variant: 'desktop',
  },
  render: (args) => {
    const [value, setValue] = React.useState('')

    return (
      <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
        <SearchInput
          {...args}
          value={value}
          onChange={(v) => {
            // ✅ action(change) 찍히게
            args.onChange?.(v)
            setValue(v)
          }}
          onSubmit={() => {
            // ✅ action(submit) 찍히게
            args.onSubmit?.()
          }}
        />
      </div>
    )
  },
}

/** ✅ 2) Desktop / WithValue */
export const WithValue: Story = {
  args: {
    variant: 'desktop',
  },
  render: (args) => {
    const [value, setValue] = React.useState('오메가3')

    return (
      <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
        <SearchInput
          {...args}
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
  },
}

/** ✅ 3) Desktop / LongText */
export const LongText: Story = {
  args: {
    variant: 'desktop',
  },
  render: (args) => {
    const [value, setValue] = React.useState(
      '제조사이름이엄청길고브랜드명도엄청길어서검색창이깨지는지확인하는테스트텍스트입니다1234567890'
    )

    return (
      <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
        <SearchInput
          {...args}
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
  },
}

/** ✅ 4) Desktop / Submit (Enter + 버튼 클릭 submit) */
export const Submit: Story = {
  args: {
    variant: 'desktop',
  },
  render: (args) => {
    const [value, setValue] = React.useState('비타민')

    return (
      <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
        <SearchInput
          {...args}
          value={value}
          onChange={(v) => {
            args.onChange?.(v)
            setValue(v)
          }}
          onSubmit={() => {
            // ✅ 여기서 args.onSubmit 호출해야 Actions 탭에 찍힘
            args.onSubmit?.()

            // 콘솔도 보고 싶으면 추가(선택)
            console.log('[SearchInput] submit:', value)
          }}
        />
      </div>
    )
  },
}

/** ✅ 5) Mobile (아이콘만 + 클릭 시 submit 확인) */
export const Mobile: Story = {
  args: {
    variant: 'mobile',
    disabled: false,
  },
  render: (args) => (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <SearchInput
        {...args}
        onSubmit={() => {
          // ✅ action 찍히게
          args.onSubmit?.()
          console.log('[SearchInput] mobile submit')
        }}
      />
    </div>
  ),
}

/** ✅ 6) Disabled (desktop disabled) */
export const Disabled: Story = {
  args: {
    variant: 'desktop',
    disabled: true,
  },
  render: (args) => (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <SearchInput
        {...args}
        value=""
        onChange={(v) => {
          args.onChange?.(v)
        }}
        onSubmit={() => {
          args.onSubmit?.()
        }}
      />
    </div>
  ),
}
