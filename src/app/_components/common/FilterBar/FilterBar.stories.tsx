// src/app/_components/common/FilterBar/FilterBar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FilterBar, type FilterBarProps } from './FilterBar'

const meta: Meta<typeof FilterBar> = {
  title: 'COMMON/FilterBar',
  component: FilterBar,
  args: {
    variant: 'select',
    options: [
      { label: '전체', value: 'all' },
      { label: '임산부', value: 'pregnant' },
      { label: '청소년', value: 'teen' },
      { label: '다이어터', value: 'diet' },
    ],
    selectedValue: 'all',
    searchValue: '',
    searchPlaceholder: '제조사/브랜드명으로 검색해보세요.',
    disabled: false,
  },
  argTypes: {
    variant: { control: 'radio', options: ['select', 'mobile', 'searching'] },
    onSelect: { action: 'select' },
    onSearchChange: { action: 'searchChange' },
    onSearchSubmit: { action: 'searchSubmit' },
    onIconClick: { action: 'iconClick' },
  },
}
export default meta

type Story = StoryObj<typeof FilterBar>

/** ✅ Hook은 컴포넌트에서만 */
function Controlled(args: FilterBarProps & { initialSearch?: string }) {
  const [selected, setSelected] = React.useState(args.selectedValue)
  const [q, setQ] = React.useState(args.initialSearch ?? (args.searchValue ?? ''))

  // ✅ 스토리에서만 프레임 폭을 “피그마처럼” 맞춰주기 (공통 컴포넌트에 max-width를 넣지 않기 위함)
  const wrapperWidth =
    args.variant === 'select' ? 798 : args.variant === 'mobile' ? 472 : 560

  return (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: wrapperWidth }}>
        <FilterBar
          {...args}
          selectedValue={selected}
          onSelect={(v) => {
            args.onSelect?.(v)
            setSelected(v)
          }}
          searchValue={q}
          onSearchChange={(v) => {
            args.onSearchChange?.(v)
            setQ(v)
          }}
          onSearchSubmit={() => {
            args.onSearchSubmit?.()
          }}
          onIconClick={() => {
            args.onIconClick?.()
          }}
        />
      </div>
    </div>
  )
}

export const Select: Story = {
  args: { variant: 'select' },
  render: (args) => <Controlled {...args} />,
}

export const Mobile: Story = {
  args: { variant: 'mobile' },
  render: (args) => <Controlled {...args} />,
}

export const Searching: Story = {
  args: { variant: 'searching' },
  render: (args) => <Controlled {...args} initialSearch="오메가3" />,
}
