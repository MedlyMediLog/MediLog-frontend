// src/app/(with-footer)/(with-sidebar)/products/_components/productList.utils.ts

/** -----------------------------
 * A) 표시 문자열 정리 유틸
 * ----------------------------- */
export function cleanText(input: unknown) {
  const s = String(input ?? '')

  let out = s
    .replace(/[\uFEFF\u200B-\u200D\u2060\u00AD]/g, '')
    .replace(/\uFFFD/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (out.startsWith('?')) {
    const next = out.slice(1, 2)
    if (/[0-9A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ]/.test(next)) {
      out = out.slice(1).trim()
    }
  }

  return out
}

/** -----------------------------
 * 검색 유틸: 한글 초성 추출
 * ----------------------------- */
const CHO = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
] as const

export function getChosung(text: string) {
  let out = ''
  for (const ch of text) {
    const code = ch.charCodeAt(0)
    if (code >= 44032 && code <= 55203) {
      const index = Math.floor((code - 44032) / 588)
      out += CHO[index] ?? ch
      continue
    }
    out += ch
  }
  return out
}

export function normalize(text: string) {
  return text.replace(/\s+/g, '').toLowerCase()
}

export function looksLikeChosungOnly(q: string) {
  const s = q.replace(/\s+/g, '')
  if (s.length === 0) return false
  return /^[ㄱ-ㅎ]+$/.test(s)
}

export function containsJamo(q: string) {
  return /[ㄱ-ㅎㅏ-ㅣ]/.test(q)
}

/** -----------------------------
 * 사전식 정렬키 (제품명 기준)
 * ----------------------------- */
export function toSortKey(productName: string) {
  const t = cleanText(productName)
  const stripped = t.replace(
    /^[\s"'`“”‘’\[\]\(\)\{\}\-–—~!@#$%^&*_=+|\\/:;,.<>?]+/g,
    '',
  )
  return normalize(stripped)
}

export const KO_COLLATOR = new Intl.Collator('ko', { sensitivity: 'base', numeric: true })

/** -----------------------------
 * ✅ “현업형” 2단계 정렬: 그룹(한글/영문/숫자/기타) → 그룹 내 사전식
 * ----------------------------- */
export function getSortGroup(sortKey: string) {
  const first = sortKey.charAt(0)
  if (!first) return 9

  const code = first.charCodeAt(0)

  if (code >= 44032 && code <= 55203) return 1 // 한글
  if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) return 2 // 영문
  if (code >= 48 && code <= 57) return 3 // 숫자
  return 4
}
