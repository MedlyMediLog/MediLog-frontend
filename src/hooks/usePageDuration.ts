'use client'

import { useEffect, useRef } from 'react'
import { getOrCreateAnonId } from '@/lib/analytics/identity'

type Options = {
  pageKey: string // 예: product_detail:${productCode}
  onFlush: (payload: {
    anonId: string
    pageKey: string
    totalMs: number
    activeMs: number
    startedAt: string
    endedAt: string
    meta?: Record<string, unknown>
  }) => void | Promise<void>

  /** 유저가 활동 중으로 간주되는 idle 기준(ms) */
  idleMs?: number // default 10_000
  /** 주기적으로 서버로 중간 전송하고 싶으면(ms). 0이면 off */
  flushIntervalMs?: number // default 0
  /** 추가 정보 */
  meta?: Record<string, unknown>
}

export function usePageDuration({
  pageKey,
  onFlush,
  idleMs = 10_000,
  flushIntervalMs = 0,
  meta,
}: Options) {
  const anonIdRef = useRef<string>('')

  const startedAtRef = useRef<number>(0)
  const lastTickRef = useRef<number>(0)

  const totalMsRef = useRef<number>(0)
  const activeMsRef = useRef<number>(0)

  const visibleRef = useRef<boolean>(true)
  const lastActivityAtRef = useRef<number>(0)

  const flushingRef = useRef<boolean>(false)
  const intervalIdRef = useRef<number | null>(null)
  const flushedOnceRef = useRef<boolean>(false)

  const tick = () => {
    if (!startedAtRef.current) return
    const now = Date.now()
    const last = lastTickRef.current || now
    const delta = now - last
    lastTickRef.current = now

    if (delta <= 0) return
    if (!visibleRef.current) return

    totalMsRef.current += delta

    // idle 기준 이내에 활동이 있었으면 active로 누적
    const lastAct = lastActivityAtRef.current || startedAtRef.current
    if (now - lastAct <= idleMs) {
      activeMsRef.current += delta
    }
  }

  const flush = async (reason: 'interval' | 'hide' | 'unmount') => {
    // 첫 flush 이전에 start가 없으면 방어
    if (!startedAtRef.current) return

    // visible 아닐 때 마지막 tick 반영
    tick()

    const now = Date.now()
    const payload = {
      anonId: anonIdRef.current || getOrCreateAnonId(),
      pageKey,
      totalMs: Math.max(0, Math.round(totalMsRef.current)),
      activeMs: Math.max(0, Math.round(activeMsRef.current)),
      startedAt: new Date(startedAtRef.current).toISOString(),
      endedAt: new Date(now).toISOString(),
      meta: { ...(meta ?? {}), flushReason: reason },
    }

    // 1초 미만은 노이즈라 버림(원하면 조정)
    if (payload.totalMs < 1000) return

    // 중복 flush 방지(특히 unmount + pagehide 동시)
    if (flushingRef.current) return
    flushingRef.current = true
    try {
      await onFlush(payload)
      flushedOnceRef.current = true

      // interval flush면 누적 리셋해서 "증분"으로 보낼 수도 있고,
      // "전체 누적"으로 보낼 수도 있음.
      // 여기서는 "전체 누적" 유지(서버에서 latest로 overwrite 가능)
      // 증분으로 바꾸려면 아래 주석 해제:
      // totalMsRef.current = 0
      // activeMsRef.current = 0
      // startedAtRef.current = now
      // lastTickRef.current = now
    } finally {
      flushingRef.current = false
    }
  }

  useEffect(() => {
    anonIdRef.current = getOrCreateAnonId()

    const now = Date.now()
    startedAtRef.current = now
    lastTickRef.current = now
    lastActivityAtRef.current = now
    visibleRef.current = typeof document === 'undefined' ? true : !document.hidden

    // 활동 이벤트(활동 시간 산정용) 
    const markActivity: EventListener = () => {
      lastActivityAtRef.current = Date.now()
    }

    const activityEvents: Array<keyof WindowEventMap> = [
      'mousemove',
      'mousedown',
      'keydown',
      'scroll',
      'touchstart',
      'pointerdown',
    ]
    activityEvents.forEach((ev) =>
      window.addEventListener(ev, markActivity, { passive: true }),
    )

    // 시간 누적 tick
    // rAF 대신 setInterval(가볍게). 1초마다 tick
    const tickId = window.setInterval(tick, 1000)

    // visibility 처리
    const onVisibility = () => {
      // 바뀌기 직전까지 반영
      tick()
      visibleRef.current = !document.hidden
      // 숨김으로 전환되면 한번 flush(선택)
      if (document.hidden) {
        flush('hide')
      } else {
        // 다시 보이기 시작하면 기준 activity 갱신
        const t = Date.now()
        lastActivityAtRef.current = t
        lastTickRef.current = t
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    // 페이지 이탈/백그라운드 종료 처리
    const onPageHide = () => {
      // pagehide는 iOS 사파리에서 더 신뢰도 높음
      flush('hide')
    }
    window.addEventListener('pagehide', onPageHide)

    // 주기 flush 옵션
    if (flushIntervalMs > 0) {
      intervalIdRef.current = window.setInterval(() => {
        flush('interval')
      }, flushIntervalMs)
    }

    return () => {
      // 마지막 반영 후 flush
      tick()
      flush('unmount')

      activityEvents.forEach((ev) => window.removeEventListener(ev, markActivity))
      window.clearInterval(tickId)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', onPageHide)

      if (intervalIdRef.current) {
        window.clearInterval(intervalIdRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageKey])
}
