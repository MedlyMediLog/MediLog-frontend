'use client'

import { createPortal } from 'react-dom'
import clsx from 'clsx'
import Link from 'next/link'

type Pos = { left: number; top: number } | { right: number; top: number }

type Props = {
  open: boolean
  pos: Pos | null
  meLoading: boolean
  me: unknown | null
  onClose: () => void
  onLogout: () => void
  onLogin: () => void
}

export default function ProfileMenuPopover({
  open,
  pos,
  meLoading,
  me,
  onClose,
  onLogout,
  onLogin,
}: Props) {
  if (!open || !pos) return null

  return createPortal(
    <div
      role="menu"
      aria-label="프로필 메뉴"
      className={clsx(
        'fixed z-[99999]',
        'w-[264px]',
        'rounded-[20px] bg-[#fbfdfd]',
        'shadow-[0_4px_8px_rgba(50,60,72,0.08)]',
        'p-[10px] flex flex-col items-start gap-[8px]',
      )}
      style={
        'left' in pos
          ? { top: pos.top, left: pos.left, transform: 'translateY(-100%)' }
          : { top: pos.top, right: pos.right, transform: 'translateY(-100%)' }
      }
    >
      <Link
        role="menuitem"
        href="/profile/edit"
        className="w-full rounded-[12px] px-3 py-3 text-left typo-b3 text-fg-basic-primary hover:bg-layer-secondary"
        onClick={onClose}
      >
        프로필 수정
      </Link>

      <div className="w-full h-px bg-layer-secondary" />

      {!meLoading && me ? (
        <button
          role="menuitem"
          type="button"
          onClick={onLogout}
          className="w-full rounded-[12px] px-3 py-3 text-left typo-b3 text-fg-basic-primary hover:bg-layer-secondary"
        >
          로그아웃
        </button>
      ) : (
        <button
          role="menuitem"
          type="button"
          onClick={() => {
            onClose()
            queueMicrotask(onLogin)
          }}
          className="w-full rounded-[12px] px-3 py-3 text-left typo-b3 text-fg-basic-primary hover:bg-layer-secondary"
        >
          로그인
        </button>
      )}
    </div>,
    document.body,
  )
}
