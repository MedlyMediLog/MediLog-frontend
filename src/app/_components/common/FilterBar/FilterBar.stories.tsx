import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { FilterBar } from './FilterBar';

const meta: Meta<typeof FilterBar> = {
  title: 'common/FilterBar',
  component: FilterBar,
  args: {
    options: [
      { label: '전체', value: 'all' },
      { label: '임산부', value: 'pregnant' },
      { label: '청소년', value: 'teen' },
      { label: '다이어터', value: 'diet' },
    ],
    selectedValue: 'all',
    searchValue: '',
    searchPlaceholder: '제조사/브랜드명으로 검색해보세요.',
    ariaLabelSearch: '검색어 입력',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['select', 'mobile', 'searching'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

/** ✅ Hook은 “컴포넌트”에서만 사용 */
function SelectStateful(args: React.ComponentProps<typeof FilterBar>) {
  const [selected, setSelected] = useState(args.selectedValue);
  const [q, setQ] = useState(args.searchValue ?? '');

  return (
    <FilterBar
      {...args}
      selectedValue={selected}
      onSelect={setSelected}
      searchValue={q}
      onSearchChange={setQ}
    />
  );
}

function MobileStateful(args: React.ComponentProps<typeof FilterBar>) {
  const [selected, setSelected] = useState(args.selectedValue);

  return (
    <FilterBar
      {...args}
      selectedValue={selected}
      onSelect={setSelected}
      onIconClick={() => alert('아이콘 클릭')}
    />
  );
}

function SearchingStateful(args: React.ComponentProps<typeof FilterBar>) {
  const [selected, setSelected] = useState(args.selectedValue);
  const [q, setQ] = useState(args.searchValue ?? '');

  return (
    <FilterBar
      {...args}
      selectedValue={selected}
      onSelect={setSelected}
      searchValue={q}
      onSearchChange={setQ}
    />
  );
}

export const Select: Story = {
  args: { variant: 'select' },
  render: (args) => <SelectStateful {...args} />,
};

export const Mobile: Story = {
  args: { variant: 'mobile' },
  render: (args) => <MobileStateful {...args} />,
};

export const Searching: Story = {
  args: { variant: 'searching', searchValue: '아' },
  render: (args) => <SearchingStateful {...args} />,
};
