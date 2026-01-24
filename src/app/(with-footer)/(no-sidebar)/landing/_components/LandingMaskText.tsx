'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import './landing.css'

type Props = {
  titleLines: string[]
  subLines: string[]
}

export default function LandingMaskText({ titleLines, subLines }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const target = ref.current
    const items = target.querySelectorAll<HTMLElement>('.mask-fill')

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        items.forEach((el, idx) => {
          el.style.setProperty('--delay', `${800 + idx * 300}ms`)
          el.classList.add('is-active')
        })

        io.disconnect()
      },
      { threshold: 0.6 },
    )

    io.observe(target)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="mask-block">
      <div className="mask-block__title">
        {titleLines.map((line, i) => (
          <h2
            key={i}
            className="mask-fill mask-fill--title typo-h2 desktop:typo-d1"
            data-fill-text={line}
          >
            {line}
          </h2>
        ))}
      </div>

      <div className="mask-block__gap" />

      <div className="mask-block__sub">
        {subLines.map((line, i) => (
          <p
            key={i}
            className="mask-fill mask-fill--sub typo-b3 desktop:text-[24px]"
            data-fill-text={line}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}
