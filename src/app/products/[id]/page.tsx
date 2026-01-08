import Image from 'next/image'
import hambugi from '@/assets/hambugi.png'
import bottle from '@/assets/bottle.png'
import info from '@/assets/info.png'
import graph from '@/assets/graph.png'
import profile from '@/assets/profile.png'
import question from '@/assets/question.png'
import warning from '@/assets/warning.png'
import warning_fill from '@/assets/warning_fill.png'
import ingredients from "@/assets/ingredients.png"
import see_more from "@/assets/see_more.png"
import comment from "@/assets/comment.png"
import ProductDeatilHeader from '../_components/ProductDetailHeader'
import IngredientsSection from '../_components/IngredientsSection'
import ProductSummarySection from '../_components/ProductSummarySection'
import SafetyGuideSection from '../_components/SafetyGuideSection'
import IntakeStorageSection from '../_components/IntakeStorageSection'
import GeneralUsageSection from '../_components/GeneralUsageSection'

export default function ProductDetailPage() {
  return (
    <>
      {/* 전체 레이아웃 */}
      <div className=" flex flex-col bg-gray-100 relative">
        {/* 상단바 */}
        <ProductDeatilHeader/>
        {/* 컨텐츠 영역 */}
        <div className="w-full flex flex-col pt-5 pb-15 gap-5 desktop:pt-0 items-center">
          {/* 2열 레이아웃 */}
          <div className="flex flex-col px-5 gap-5 desktop:flex-row desktop:gap-4">
            <div>
                <ProductSummarySection/>
            </div>
            <div className='flex-col flex gap-5 desktop:w-155'>
            
            <IngredientsSection/>
            {/* 일반 기능 설명 */}
            <GeneralUsageSection/>
            {/* 일반 기능 설명 */}
            {/* 섭취 보관 방법 */}
            <IntakeStorageSection/>
            {/* 섭취 보관 방법 */}
            <SafetyGuideSection/>
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}
