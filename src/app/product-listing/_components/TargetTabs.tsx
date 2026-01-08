'use client';

import clsx from 'clsx';

export type TargetTabKey = 'all' | 'pregnant' | 'teen' | 'diet';

const TABS: { key: TargetTabKey; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'pregnant', label: '임산부' },
  { key: 'teen', label: '청소년' },
  { key: 'diet', label: '다이어트' },
];

type Props = {
  value: TargetTabKey;
  onChange: (key: TargetTabKey) => void;
};

export default function TargetTabs({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {TABS.map((t) => {
        const active = t.key === value;

        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={clsx(
              'rounded-full px-3 py-1',
              'typo-b5',
              active
                ? 'bg-[#3d3d3d] text-white'
                : 'bg-[#dce4ed] text-[#3d3d3d]'
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
