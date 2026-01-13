//src/app/product-listing/_compnents/shared/useProductListing.ts
'use client'

import React from 'react'
import type { SelectedKey } from './types'
import { mockProducts } from './mock'
import { sortByPolicy } from './policy'

export function useProductListing(defaultSelected: SelectedKey = 'all') {
  const [selected, setSelected] = React.useState<SelectedKey>(defaultSelected)
  const [q, setQ] = React.useState('')

  const [refreshKey, setRefreshKey] = React.useState(0)
  const onRefresh = React.useCallback(() => {
    setRefreshKey((v) => v + 1)
  }, [])

  const filtered = React.useMemo(() => {
    const isFilterApplied = selected !== 'all'

    let byTarget = mockProducts
    if (isFilterApplied) {
      byTarget = mockProducts.filter((p) => p.targets.includes(selected))
    }

    // ✅ 금지 제외(설계서 규칙)
    const withoutForbidden = byTarget.filter((p) => p.status !== '섭취 금지')

    const keyword = q.trim().toLowerCase()
    const searched =
      keyword.length === 0
        ? withoutForbidden
        : withoutForbidden.filter((p) => p.brand.toLowerCase().includes(keyword))

    return sortByPolicy(searched, isFilterApplied)
  }, [selected, q, refreshKey])

  const isFilterApplied = selected !== 'all'
  const isEmpty = isFilterApplied && filtered.length === 0

  return {
    selected,
    setSelected,
    q,
    setQ,
    filtered,
    isFilterApplied,
    isEmpty,
    onRefresh,
  }
}
