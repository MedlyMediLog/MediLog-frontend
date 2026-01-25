'use client'

const KEY = {
  sid: 'ml_session_id',
  startedAt: 'ml_session_started_at',
  clicks: 'ml_click_count',
  flushed: 'ml_funnel_flushed',
  reached: 'ml_reached_detail',
  productCode: 'ml_product_code',
} as const

type FunnelPayload = {
  sessionId: string
  startedAt: string
  endedAt: string
  reachedDetail: boolean
  clickCountToDetail: number
  productCode?: string
}

// 백엔드 직통
const FUNNEL_URL = 'https://api.medilog.today/v1/funnel-sessions'

function nowIso() {
  return new Date().toISOString()
}

function getSS(key: string) {
  try {
    return sessionStorage.getItem(key)
  } catch {
    return null
  }
}

function setSS(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value)
  } catch {
    // ignore
  }
}

export function startFunnelSessionOnLanding() {
  const sid = crypto.randomUUID()
  setSS(KEY.sid, sid)
  setSS(KEY.startedAt, nowIso())
  setSS(KEY.clicks, '0')
  setSS(KEY.flushed, '0')
  setSS(KEY.reached, '0')
  setSS(KEY.productCode, '')
}

export function ensureFunnelSessionExists() {
  const sid = getSS(KEY.sid)
  const startedAt = getSS(KEY.startedAt)

  if (!sid) setSS(KEY.sid, crypto.randomUUID())
  if (!startedAt) setSS(KEY.startedAt, nowIso())
  if (!getSS(KEY.clicks)) setSS(KEY.clicks, '0')
  if (!getSS(KEY.flushed)) setSS(KEY.flushed, '0')
  if (!getSS(KEY.reached)) setSS(KEY.reached, '0')
  if (getSS(KEY.productCode) == null) setSS(KEY.productCode, '')
}

export function bumpClickCount() {
  ensureFunnelSessionExists()
  const cur = Number(getSS(KEY.clicks) ?? '0')
  const next = Number.isFinite(cur) ? cur + 1 : 1
  setSS(KEY.clicks, String(next))
  return next
}

export function getClickCount() {
  const cur = Number(getSS(KEY.clicks) ?? '0')
  return Number.isFinite(cur) && cur >= 0 ? cur : 0
}

export function markReachedDetail(productCode?: string) {
  setSS(KEY.reached, '1')
  if (productCode) setSS(KEY.productCode, productCode)
}

export function hasFlushed() {
  return getSS(KEY.flushed) === '1'
}

function markFlushed() {
  setSS(KEY.flushed, '1')
}

function buildPayload(options: { reachedDetail: boolean; productCode?: string }) {
  ensureFunnelSessionExists()

  const sessionId = getSS(KEY.sid)
  const startedAt = getSS(KEY.startedAt)
  if (!sessionId || !startedAt) return null

  const endedAt = nowIso()
  const clickCountToDetail = getClickCount()
  if (clickCountToDetail < 0) return null

  const payload: FunnelPayload = {
    sessionId,
    startedAt,
    endedAt,
    reachedDetail: options.reachedDetail,
    clickCountToDetail,
    ...(options.productCode ? { productCode: options.productCode } : {}),
  }

  return payload
}

export async function flushFunnelSession(options: {
  reachedDetail: boolean
  productCode?: string
  reason?: string
}) {
  if (hasFlushed()) return

  const payload = buildPayload({
    reachedDetail: options.reachedDetail,
    productCode: options.productCode,
  })
  if (!payload) return

  // 이탈에서도 보내기 위해 keepalive + sendBeacon fallback
  // 중요한 변경: "성공(200/204)"일 때만 flushed 처리
  try {
    const res = await fetch(FUNNEL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
      
    })

    if (res.status === 200 || res.status === 204) {
      markFlushed()
      return
    }

 
  } catch {
    // fetch가 실패하면 beacon 시도
    try {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })
      const ok = navigator.sendBeacon(FUNNEL_URL, blob)
      if (ok) {
        markFlushed()
      }
    } catch {
      // ignore
    }
  }
}
