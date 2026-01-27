const ANON_KEY = 'ml_anon_id'
const SESSION_KEY = 'ml_session_id'

function randomId(prefix: string) {
  // crypto 지원 브라우저면 그걸로, 아니면 fallback
  const c = globalThis.crypto
  if (c?.randomUUID) return `${prefix}_${c.randomUUID()}`
  // fallback
  return `${prefix}_${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`
}

export function getOrCreateAnonId(): string {
  if (typeof window === 'undefined') return 'server'

  try {
    const existing = window.localStorage.getItem(ANON_KEY)
    if (existing) return existing

    const created = randomId('anon')
    window.localStorage.setItem(ANON_KEY, created)
    return created
  } catch {
    // localStorage 막힌 환경(사파리 프빗/정책 등) 대비: 메모리 fallback
    // (페이지 새로고침하면 바뀔 수 있음)
    return randomId('anon_mem')
  }
}

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'server'

  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY)
    if (existing) return existing

    const created = randomId('sess')
    window.sessionStorage.setItem(SESSION_KEY, created)
    return created
  } catch {
    return randomId('sess_mem')
  }
}
