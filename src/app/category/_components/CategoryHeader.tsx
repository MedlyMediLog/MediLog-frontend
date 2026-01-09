import hambugi from '@/assets/hambugi.png'
import Image from 'next/image'

export default function CategoryHeader() {
  return (
    <div className="w-full flex h-[56px] p-[16px]  bg-[#edf2f6] gap-30 desktop:py-4 desktop:px-5 desktop:h-auto">
      <div className="w-full flex justify-between items-center">
        <div className="w-[80px] h-[40px] bg-[#a2acb7]"></div>

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
