'use client'
import Link from "next/link";
import Button from "./_components/common/Button";
import { useToast } from "./_components/common/ToastProvider";


export default function Page(){
  const {push} = useToast()
    return (
      <>
        <div className="">메인 페이지입니다.</div>
        <Button variant="secondary" shape="square" icon>검색 페이지</Button>
        <Button variant="secondary" shape="rounded" icon >제품 정보 페이지</Button>
        <Button variant="secondary" shape="text" icon>검색 페이지</Button>
        <Button variant="primary" shape="square" icon>검색 페이지</Button>
        <Button variant="primary" shape="rounded" icon >제품 정보 페이지</Button>
        <Button variant="primary" shape="text" icon>검색 페이지</Button>
        <Button onClick={()=>push('토스트 문구', 'success')}>저장</Button>
        <Button onClick={()=>push('토스트 문구', 'error')}>저장</Button>
      </>
    )
}
