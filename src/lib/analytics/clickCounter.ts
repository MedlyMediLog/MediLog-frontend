'use client'

import { bumpClickCount } from './funnelSession'

export type ClickAction =
  | 'category_select'
  | 'filter_change'
  | 'search_submit'
  | 'sort_change'
  | 'load_more'
  | 'product_card'

const COUNTED = new Set<ClickAction>([
  'category_select',
  'filter_change',
  'search_submit',
  'sort_change',
  'load_more',
  'product_card',
])

export function trackClick(action: ClickAction) {
  if (!COUNTED.has(action)) return
  bumpClickCount()
}
