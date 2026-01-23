export async function logout() {
  const res = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
  })

  // 스펙상 204
  if (res.status === 204) return

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Logout failed: ${res.status}`)
  }
}
