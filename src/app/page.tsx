import Link from "next/link";
import Button from "./components/common/Button";

export default function Page(){
    return (
      <>
        <div>메인 페이지입니다.</div>
        <Link href="/search">
          <Button>검색 페이지</Button>
        </Link>
        <Link href="/products/1">
          <Button>제품 정보 페이지</Button>
        </Link>
      </>
    )
}
