import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import Overlay from './Overlay'

const meta: Meta<typeof Overlay> = {
  title: 'Common/Overlay',
  component: Overlay,
  args: {
    open: true,
    closeOnBackdrop: true,
  },
  argTypes: {
    open: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof Overlay>

function OverlayPlayground(args: React.ComponentProps<typeof Overlay>) {
  const [open, setOpen] = React.useState(args.open)

  React.useEffect(() => {
    setOpen(args.open)
  }, [args.open])

  return (
    <div className="h-[600px] w-full bg-[var(--Color-gray-100,#EDF2F6)] p-5">
      <button
        type="button"
        className="px-4 py-2 rounded-[12px] bg-[var(--Color-Role-bg-layer-primary,#FBFDFD)]"
        onClick={() => setOpen(true)}
      >
        오버레이 열기
      </button>

      <Overlay
        {...args}
        open={open}
        onClose={() => {
          setOpen(false)
          args.onClose?.()
        }}
      >
        <div className="w-full px-[20px] pt-[10px] flex flex-col gap-[10px]">
          <div className="bg-[var(--Color-Role-bg-layer-primary,#FBFDFD)] rounded-[12px] p-4">
            <div className="typo-b5">오버레이 컨텐츠 예시</div>
            <div className="mt-2 typo-b3 text-[var(--Color-gray-600,#6B7684)]">
              배경(딤)을 누르면 닫히고, ESC도 닫힙니다.
            </div>
          </div>
        </div>
      </Overlay>
    </div>
  )
}

export const Default: Story = {
  render: (args) => <OverlayPlayground {...args} />,
}
