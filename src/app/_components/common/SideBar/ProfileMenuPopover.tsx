'use client'

import { createPortal } from 'react-dom'
import clsx from 'clsx'
import Link from 'next/link'

type Props = {
  open: boolean
  pos: { left: number; top: number } | null
  meLoading: boolean
  me: unknown | null
  onClose: () => void
  onLogout: () => void
  // 필요하면 메뉴 아이템/스타일 props로 더 뺄 수 있음
}

export default function ProfileMenuPopover({
  open,
  pos,
  meLoading,
  me,
  onClose,
  onLogout,
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
      style={{
        left: pos.left,
        top: pos.top,
        transform: 'translateY(-100%)',
      }}
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
        <Link
          role="menuitem"
          href="/login"
          className="w-full rounded-[12px] px-3 py-3 text-left typo-b3 text-fg-basic-primary hover:bg-layer-secondary"
          onClick={onClose}
        >
          로그인
        </Link>
      )}
    </div>,
    document.body,
  )
}
