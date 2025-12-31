import Link from "next/link";
import Button from "./_components/common/Button";

export default function Page(){
    return (
      <>
        <div className="">메인 페이지입니다.</div>
        <Link href="/search">
          <Button>검색 페이지</Button>
        </Link>
        <Link href="/products/1">
          <Button>제품 정보 페이지</Button>
        </Link>

       <div
      className="
        h-40
        bg-red-500
        mobile:bg-blue-500
        desktop:bg-green-500
        flex items-center justify-center
        text-white font-bold
      "
    >
        Breakpoint Test
    </div>
      </>
    )
}
