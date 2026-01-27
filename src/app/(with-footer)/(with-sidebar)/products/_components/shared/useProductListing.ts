'use client'

import React from 'react'
import type { SelectedKey } from './types'
import { mockProducts } from './mock'
import { sortByPolicy } from './policy'

type ListingStatus = 'idle' | 'loading' | 'success' | 'error'

export function useProductListing(defaultSelected: SelectedKey = 'all') {
  const [selected, setSelected] = React.useState<SelectedKey>(defaultSelected)
  const [q, setQ] = React.useState('')

  // 새로고침 트리거(목 데이터 기준이지만, API 붙일 때 그대로 사용 가능)
  const [refreshKey, setRefreshKey] = React.useState(0)
  const onRefresh = React.useCallback(() => {
    setRefreshKey((v) => v + 1)
  }, [])

  // (확장 대비) 상태/에러 자리
  // - 지금은 mock이므로 success 고정
  const status: ListingStatus = 'success'
  const error: Error | null = null

  const isFilterApplied = selected !== 'all'
  const keyword = q.trim().toLowerCase()
  const hasQuery = keyword.length > 0

  const filtered = React.useMemo(() => {
    let byTarget = mockProducts

    // 대상군 필터
    if (isFilterApplied) {
      byTarget = mockProducts.filter((p) => p.targets.includes(selected))
    }

    // 금지 제외(설계서 규칙)
    const withoutForbidden = byTarget.filter((p) => p.status !== '섭취 금지')

    // 검색(브랜드명 기준)
    const searched =
      keyword.length === 0
        ? withoutForbidden
        : withoutForbidden.filter((p) => p.brand.toLowerCase().includes(keyword))

    return sortByPolicy(searched, isFilterApplied)
  }, [selected, keyword, isFilterApplied, refreshKey])

  /**
   * "빈 결과"는 검색/필터 상관없이 0개면 true
   * - ProductList에서 EmptyResult를 이 값 기준으로 띄우면 됨
   */
  const isEmptyResult = filtered.length === 0

  /**
   * 화면에 EmptyResult를 띄워야 하는 조건
   * - 초기 진입(아무 필터/검색도 안 했는데 데이터가 0인 경우)엔
   *   정책적으로 숨기고 싶을 수 있어서 분리해둠
   *
   * 지금 니 요구사항이 "검색해도 떠야 한다"니까:
   * - 검색어가 있거나
   * - 필터가 적용되어 있으면
   * - 결과 0개일 때 EmptyResult를 띄우는 게 자연스러움
   */
  const shouldShowEmptyResult = isEmptyResult && (hasQuery || isFilterApplied)

  return {
    // state
    selected,
    setSelected,
    q,
    setQ,

    // data
    filtered,

    // derived flags
    isFilterApplied,
    hasQuery,
    isEmptyResult,
    shouldShowEmptyResult,

    // refresh
    onRefresh,

    // (future) status & error
    status,
    error,
  }
}
