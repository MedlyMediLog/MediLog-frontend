// src/app/_components/common/FilterBar/FilterBar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FilterBar, type FilterBarProps } from './FilterBar'

const meta: Meta<typeof FilterBar> = {
  title: 'COMMON/FilterBar',
  component: FilterBar,
  args: {
    variant: 'select',
    isSearching: false,
    options: [
      { label: '전체', value: 'all' },
      { label: '임산부', value: 'pregnant' },
      { label: '청소년', value: 'teen' },
      { label: '다이어터', value: 'dieter' },
    ],
    selectedValue: 'all',
    searchValue: '',
    searchPlaceholder: '제조사/브랜드명으로 검색해보세요.',
    disabled: false,
  },
  argTypes: {
    variant: { control: 'radio', options: ['select', 'mobile', 'searching'] },
    isSearching: { control: 'boolean' },
    onSelect: { action: 'select' },
    onSearchChange: { action: 'searchChange' },
    onSearchSubmit: { action: 'searchSubmit' },
    onIconClick: { action: 'iconClick' },
  },
}
export default meta

type Story = StoryObj<typeof FilterBar>

function Controlled(args: FilterBarProps & { initialSearch?: string }) {
  const [selected, setSelected] = React.useState(args.selectedValue)
  const [q, setQ] = React.useState(args.initialSearch ?? (args.searchValue ?? ''))
  const [isSearching, setIsSearching] = React.useState(args.isSearching)

  const wrapperWidth =
    args.variant === 'select'
      ? 798
      : args.variant === 'mobile'
        ? isSearching
          ? 375
          : 472
        : 560

  return (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: wrapperWidth }}>
        <FilterBar
          {...args}
          isSearching={isSearching}
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
            setIsSearching(true)
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
  args: { variant: 'mobile', isSearching: false },
  render: (args) => <Controlled {...args} />,
}

export const Searching: Story = {
  args: { variant: 'searching', isSearching: true },
  render: (args) => <Controlled {...args} initialSearch="오메가3" />,
}
