import type { ProductItemWithMeta, ProductStatus, SelectedKey } from './types'

export const STATUS_ORDER: Record<ProductStatus, number> = {
  '섭취 가능': 0,
  '섭취 고려': 1,
  '주의사항': 2,
  '섭취 금지': 3,
}

export function sortByPolicy(items: ProductItemWithMeta[], isFilterApplied: boolean) {
  const next = [...items]

  if (isFilterApplied) {
    next.sort((a, b) => {
      const sa = STATUS_ORDER[a.status] ?? 999
      const sb = STATUS_ORDER[b.status] ?? 999
      if (sa !== sb) return sa - sb
      return a.name.localeCompare(b.name, 'ko')
    })
    return next
  }

  next.sort((a, b) => a.name.localeCompare(b.name, 'ko'))
  return next
}

export function getTargetMessage(selected: SelectedKey) {
  if (selected === 'pregnant') return '강한 주의가 언급된 제품은 결과에서 제외했어요.'
  if (selected === 'teen') return '강한 주의가 언급된 제품은 결과에서 제외했어요.'
  if (selected === 'dieter') return '강한 주의가 언급된 제품은 결과에서 제외했어요.'
  return ''
}
