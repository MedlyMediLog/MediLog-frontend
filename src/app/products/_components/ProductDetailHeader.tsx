import hambugi from "@/assets/hambugi.png"
import Image from "next/image"

export default function ProductDeatilHeader() {
    return(
        <div className="w-full flex h-[56px] p-[16px]  bg-[#edf2f6] gap-30 desktop:py-4 desktop:px-5 desktop:h-auto">
          <div className="w-full flex justify-between items-center">
            <div className="w-[80px] h-[40px] bg-[#a2acb7]"></div>
            {/* 중앙 타이틀 */}
              <div className="absolute left-1/2 -translate-x-1/2 typo-h5 desktop:hidden">제품 상세</div>

            <button
              type="button"
              aria-label="메뉴 열기"
              className="w-10 h-10 flex items-center justify-center rounded-[12px] desktop:hidden"
            >
              

              <span className="relative w-[21.33px] h-[18.67px]">
                <Image src={hambugi} alt="" fill className="object-contain" priority />
              </span>
            </button>
          </div>
        </div>
    )
}