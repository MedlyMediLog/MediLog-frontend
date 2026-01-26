'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'

type Props = {
  phrases: string[]
  delay?: number
  duration?: number
  hold?: number
  widthClassName?: string
  className?: string
  timingClassName?: string
}

export default function MaskedTextSlider({
  phrases,
  delay = 1000,
  duration = 1600,
  hold = 1000,
  widthClassName = 'w-[280px]',
  className,
  timingClassName = 'ease-in-out',
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const timerRef = useRef<number | null>(null)
  const idxRef = useRef(0)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-slider-item]'))
    if (items.length <= 1) return

    root.style.setProperty('--dur', `${duration}ms`)

    const px = (n: number) => `${Math.ceil(n)}px`

    const clearTimer = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
      timerRef.current = null
    }

    const instant = (el: HTMLElement, fn: () => void) => {
      el.classList.add('[transition-duration:0ms]')
      fn()
      void el.offsetHeight
      el.classList.remove('[transition-duration:0ms]')
    }

    // “완전 바깥”으로 보내기 (문구가 길어도 절대 안 남게)
    const offRight = (el: HTMLElement) => {
      const w = root.clientWidth || 1
      const itemW = el.offsetWidth || 1
      return w + itemW + 8
    }
    const offLeft = (el: HTMLElement) => {
      const itemW = el.offsetWidth || 1
      return -itemW - 8
    }

    const setVisible = (el: HTMLElement, v: boolean) => {
      el.dataset.visible = v ? '1' : '0'
    }

    const init = () => {
      // 측정 안정화
      items.forEach((el) => void el.offsetWidth)

      items.forEach((el, i) => {
        if (i === 0) {
          setVisible(el, true)
          instant(el, () => {
            el.style.transform = 'translateX(0)'
          })
        } else {
          // 시작부터 나머지는 아예 숨김 상태로 오른쪽 대기
          setVisible(el, false)
          instant(el, () => {
            el.style.transform = `translateX(${px(offRight(el))})`
          })
        }
      })

      idxRef.current = 0
    }

    const step = () => {
      const idx = idxRef.current
      const prev = items[idx]
      const nextIdx = (idx + 1) % items.length
      const next = items[nextIdx]

      // next: “보이게” 켜고 오른쪽 바깥에서 시작 위치 고정
      setVisible(next, true)
      instant(next, () => {
        next.style.transform = `translateX(${px(offRight(next))})`
      })

      // double rAF로 “오른쪽에서 밀려오는” 느낌 확정
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          prev.style.transform = `translateX(${px(offLeft(prev))})`
          next.style.transform = 'translateX(0)'
        })
      })

      // 핵심: prev는 애니메이션 끝난 뒤 "숨긴 채로" 오른쪽으로 리셋
      window.setTimeout(() => {
        // 먼저 완전 숨김 (이 순간부터 절대 안 보임)
        setVisible(prev, false)

        // 숨긴 상태에서 오른쪽 대기 위치로 순간이동
        instant(prev, () => {
          prev.style.transform = `translateX(${px(offRight(prev))})`
        })
      }, duration)

      idxRef.current = nextIdx
      timerRef.current = window.setTimeout(step, hold + duration)
    }

    init()
    timerRef.current = window.setTimeout(step, delay)

    const onResize = () => {
      clearTimer()
      init()
      timerRef.current = window.setTimeout(step, delay)
    }
    window.addEventListener('resize', onResize)

    return () => {
      clearTimer()
      window.removeEventListener('resize', onResize)
    }
  }, [delay, duration, hold])

  return (
    <div
      ref={rootRef}
      className={clsx('relative overflow-hidden bg-transparent', widthClassName, 'h-9', className)}
      style={{ '--dur': `${duration}ms` } as React.CSSProperties}
    >
      <div className="absolute inset-0">
        {phrases.map((text, i) => (
          <div
            key={`${text}-${i}`}
            data-slider-item
            data-visible="0"
            className={clsx(
              'absolute left-0 top-0 h-full flex items-center whitespace-nowrap',
              'typo-h2 text-fg-basic-accent',
              'will-change-[transform]',
              'transition-transform',
              timingClassName,
              '[transition-duration:var(--dur)]',
              'motion-reduce:transition-none',

              // visible=0이면 렌더상 안 보이게 (리셋 절대 노출 X)
              'data-[visible=0]:opacity-0 data-[visible=0]:invisible',
            )}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  )
}
