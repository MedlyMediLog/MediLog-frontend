'use client'

import { useMemo, useState } from 'react'
import { FilterBar } from '../_components/common/FilterBar'
import type { FilterOption } from '../_components/common/FilterBar'
import ProductHeader from './_components/ProductHeader'
import reset_20 from '@/assets/reset_20.png'
import Image from 'next/image'
import capsule_bottle from '@/assets/products/capsule_bottle.png'
import { Label } from '../_components/common/Label/Label'
import info_skyblue from "@/assets/info_skyblue.png"

type TargetValue = 'ALL' | 'PREGNANT' | 'TEEN' | 'DIETER'

export default function Products() {
  // ✅ 타겟(임산부/청소년/다이어터) 필터 옵션
  const options: FilterOption[] = useMemo(
    () => [
      { label: '전체', value: 'ALL' },
      { label: '임산부', value: 'PREGNANT' },
      { label: '청소년', value: 'TEEN' },
      { label: '다이어터', value: 'DIETER' },
    ],
    []
  )

  // 2) 상태
  const [selectedValue, setSelectedValue] = useState<TargetValue>('ALL')
  const [searchValue, setSearchValue] = useState<string>('')

  // mobile / searching 전환용 (예시)
  const [isSearching, setIsSearching] = useState(false)

  const isTargeted = selectedValue !== 'ALL'

  const targetLabelMap: Record<TargetValue, string> = {
    ALL: '전체',
    PREGNANT: '임산부',
    TEEN: '청소년',
    DIETER: '다이어터',
  }

  const bannerTextMap: Partial<Record<TargetValue, string>> = {
    PREGNANT: '강한 주의가 언급된 제품은 결과에서 제외했어요.',
    TEEN: '강한 주의가 언급된 제품은 결과에서 제외했어요.',
    DIETER: '강한 주의가 언급된 제품은 결과에서 제외했어요.',
  }

  const handleSelect = (value: string) => {
    // FilterBar 타입이 string이라 일단 캐스팅
    setSelectedValue(value as TargetValue)
    // TODO: 여기서 라우팅/쿼리 변경 or API 재호출 연결하면 됨
    // router.push(`/product-listing?target=${value}`)
  }

  const handleSearchSubmit = () => {
    // TODO: 여기서 API 호출 or router.push(`/product-listing?target=${selectedValue}&q=${searchValue}`)
    console.log('search submit:', { selectedValue, searchValue })
  }

  return (
    <div className="flex flex-col bg-layer-week w-[375px]">
      <ProductHeader />

      {/* 컨텐츠 영역 */}
      <div className="flex flex-col max-w-[1300px] px-5 pb-15">
        {/* 필터링 */}
        <div className="flex gap-3 items-center">
          <FilterBar
            variant={isSearching ? 'searching' : 'mobile'}
            options={options}
            selectedValue={selectedValue}
            onSelect={handleSelect}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onSearchSubmit={handleSearchSubmit}
            onIconClick={() => setIsSearching(true)}
            ariaLabelSearch="제품 검색"
          />

          {/* 검색 중일 때 빠져나오는 임시 버튼(원하면 제거) */}
          {isSearching ? (
            <button
              type="button"
              className="px-3 py-2 rounded-[12px] bg-layer-secondary typo-b4"
              onClick={() => setIsSearching(false)}
            >
              닫기
            </button>
          ) : null}
        </div>

        {/* ✅ 타겟 적용 배너(필터바 아래) */}
        {isTargeted ? (
          <div className=" flex py-2.5 gap-1">
            <Image src={info_skyblue} width={20} height={20} alt='info'/>

            <p className="typo-b4 text-blue-700">
              {bannerTextMap[selectedValue] ?? '선택한 타겟 기준으로 결과를 정리했어요.'}
            </p>

            
          </div>
        ) : null}

        {/* 상품 목록 */}
        <div className="flex flex-col">
          {/* 조회 결과 */}
          <div className="py-2.5 rounded-[12px] justify-end flex">
            <div className="flex h-[21px] gap-2 items-center">
              <div className="typo-b3 text-fg-basic-primary">조회 결과</div>
              <div className="typo-b3 text-fg-basic-primary">24개</div>

              <button type="button" onClick={() => setSelectedValue('ALL')}>
                <Image src={reset_20} width={20} height={20} alt="reset" />
              </button>
            </div>
          </div>

          {/* 카드 목록 */}
          <div className="flex gap-5 flex-col">
            <div className="flex border-b border-[#dce4ed] pb-5 gap-5">
              <Image src={capsule_bottle} width={96} height={120} alt="capsule" className="shrink-0" />
              <div className="flex flex-col gap-4 min-w-0">
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="typo-b3 text-fg-basic-primary">제조사 혹은 브랜드명</div>
                  <div className="typo-b1 text-fg-basic-accent line-clamp-2">
                    모바일 상품명 최대 두줄까지 표기 가능 이후론 ...표기
                  </div>
                </div>
                <div className="gap-1 flex flex-wrap">
                  <Label variant="default">포함 성분</Label>
                </div>
              </div>
            </div>

            <div className="flex border-b border-[#dce4ed] pb-5 gap-5">
              <Image src={capsule_bottle} width={96} height={120} alt="capsule" className="shrink-0" />
              <div className="flex flex-col gap-4 min-w-0">
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="typo-b3 text-fg-basic-primary">제조사 혹은 브랜드명</div>
                  <div className="typo-b1 text-fg-basic-accent line-clamp-2">
                    모바일 상품명 최대 두줄까지 표기 가능 이후론 ...표기
                  </div>
                </div>
                <div className="gap-1 flex flex-wrap">
                  <Label variant="default">포함 성분</Label>
                  <Label variant="default">포함 성분</Label>
                </div>
              </div>
            </div>

            <div className="flex border-b border-[#dce4ed] pb-5 gap-5">
              <Image src={capsule_bottle} width={96} height={120} alt="capsule" className="shrink-0" />
              <div className="flex flex-col gap-4 min-w-0">
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="typo-b3 text-fg-basic-primary">제조사 혹은 브랜드명</div>
                  <div className="typo-b1 text-fg-basic-accent line-clamp-2">
                    모바일 상품명 최대 두줄까지 표기 가능 이후론 ...표기
                  </div>
                </div>

                <div className="gap-1 flex items-center flex-wrap">
                  <Label variant="default">포함 성분</Label>
                  <Label variant="default">포함 성분</Label>

                  {/* +N */}
                  <div className="h-6 rounded-[8px] px-2 flex items-center justify-center">
                    <div className="typo-b5 text-fg-basic-secondary">+N</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ...추가 카드들 */}
          </div>
        </div>
      </div>
    </div>
  )
}
