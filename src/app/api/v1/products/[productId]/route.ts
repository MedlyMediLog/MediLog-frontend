// // app/api/v1/products/[productId]/route.ts
// import { NextResponse } from "next/server";

// type Category =
//   | "EYE"
//   | "BONE"
//   | "IMMUNE"
//   | "ENERGY"
//   | "STRESS"
//   | "GUT"
//   | "BLOOD"
//   | "SKIN"
//   | "MUSCLE"
//   | "LIVER";

// type Target = "PREGNANT" | "TEEN" | "DIETER";

// type ProductDetailResponse = {
//   productId: number;
//   category: Category;
//   name: string;
//   manufacturer: string;
//   target: Target | null;
//   level: number | null;

//   appearanceForm: string;
//   text: string;
//   ingredients: string[];
//   functionText: string[];
//   howToEat: string;
//   expiration: string;
//   storageMethod: string;
//   cautionRaw: string[];
//   imageUrl: string;
// };

// function isTarget(v: string | null): v is Target {
//   return v === "PREGNANT" || v === "TEEN" || v === "DIETER";
// }

// /**
//  * 샘플 상세 데이터
//  * - productId 기준으로 조회
//  * - target 없으면 target/level null
//  * - target 있으면 target 포함 + level 포함(예시 로직)
//  */
// const MOCK_PRODUCT_DETAILS: Record<number, Omit<ProductDetailResponse, "target" | "level">> = {
//   1: {
//     productId: 1,
//     category: "EYE",
//     name: "루테인 지아잔틴",
//     manufacturer: "OO제약",
//     appearanceForm: "정제",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["루테인", "지아잔틴"],
//     functionText: ["눈 건강에 도움을 줄 수 있음"],
//     howToEat: "1일 1회 1정",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["특정 질환자는 전문가와 상담하세요"],
//     imageUrl: "https://cdn.medilog.today/images/products/1.png",
//   },
//   2: {
//     productId: 2,
//     category: "EYE",
//     name: "비타민A",
//     manufacturer: "XX헬스",
//     appearanceForm: "정제",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["비타민A"],
//     functionText: ["눈 건강에 도움을 줄 수 있음"],
//     howToEat: "1일 1회 1정",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["임산부/수유부는 전문가와 상담하세요", "권장량을 초과하지 마세요"],
//     imageUrl: "https://cdn.medilog.today/images/products/2.png",
//   },

//   3: {
//     productId: 3,
//     category: "BONE",
//     name: "칼슘 마그네슘 비타민D",
//     manufacturer: "BB헬스",
//     appearanceForm: "정제",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["칼슘", "마그네슘", "비타민D"],
//     functionText: ["뼈 건강에 도움을 줄 수 있음"],
//     howToEat: "1일 1회 1정",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["특정 질환자는 전문가와 상담하세요"],
//     imageUrl: "https://cdn.medilog.today/images/products/3.png",
//   },
//   4: {
//     productId: 4,
//     category: "BONE",
//     name: "비타민D 고함량",
//     manufacturer: "KK헬스",
//     appearanceForm: "정제",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["비타민D"],
//     functionText: ["뼈 건강에 도움을 줄 수 있음"],
//     howToEat: "1일 1회 1정",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["권장량을 초과하지 마세요", "고칼슘혈증 환자는 주의하세요"],
//     imageUrl: "https://cdn.medilog.today/images/products/4.png",
//   },

//   5: {
//     productId: 5,
//     category: "IMMUNE",
//     name: "비타민C 1000",
//     manufacturer: "CC뉴트리",
//     appearanceForm: "정제",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["비타민C"],
//     functionText: ["면역 기능에 도움을 줄 수 있음"],
//     howToEat: "1일 1회 1정",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["위장장애가 있을 수 있어요"],
//     imageUrl: "https://cdn.medilog.today/images/products/5.png",
//   },
//   6: {
//     productId: 6,
//     category: "IMMUNE",
//     name: "아연",
//     manufacturer: "LL뉴트리",
//     appearanceForm: "정제",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["아연"],
//     functionText: ["정상적인 면역기능에 필요"],
//     howToEat: "1일 1회 1정",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["구역/속쓰림이 있을 수 있어요", "철분과 동시 섭취는 피하세요"],
//     imageUrl: "https://cdn.medilog.today/images/products/6.png",
//   },

//   7: {
//     productId: 7,
//     category: "ENERGY",
//     name: "비타민B 컴플렉스",
//     manufacturer: "DD랩",
//     appearanceForm: "정제",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["비타민B1", "비타민B2", "비타민B6"],
//     functionText: ["에너지 대사에 도움을 줄 수 있음"],
//     howToEat: "1일 1회 1정",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["소변색이 진해질 수 있어요"],
//     imageUrl: "https://cdn.medilog.today/images/products/7.png",
//   },
//   8: {
//     productId: 8,
//     category: "ENERGY",
//     name: "철분",
//     manufacturer: "MM케어",
//     appearanceForm: "정제",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["철"],
//     functionText: ["정상적인 혈액 생성에 필요"],
//     howToEat: "1일 1회 1정",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["변비/속쓰림이 있을 수 있어요"],
//     imageUrl: "https://cdn.medilog.today/images/products/8.png",
//   },

//   9: {
//     productId: 9,
//     category: "STRESS",
//     name: "테아닌 홍경천",
//     manufacturer: "EE바이오",
//     appearanceForm: "정제",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["L-테아닌", "홍경천추출물"],
//     functionText: ["긴장 완화에 도움을 줄 수 있음"],
//     howToEat: "1일 1회 1정",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["수면에 영향을 줄 수 있어요"],
//     imageUrl: "https://cdn.medilog.today/images/products/9.png",
//   },
//   10: {
//     productId: 10,
//     category: "STRESS",
//     name: "마그네슘",
//     manufacturer: "NN미네랄",
//     appearanceForm: "정제",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["마그네슘"],
//     functionText: ["신경과 근육 기능 유지에 필요"],
//     howToEat: "1일 1회 1정",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["설사를 유발할 수 있어요"],
//     imageUrl: "https://cdn.medilog.today/images/products/10.png",
//   },

//   11: {
//     productId: 11,
//     category: "GUT",
//     name: "프로바이오틱스",
//     manufacturer: "FF유산균",
//     appearanceForm: "캡슐",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["프로바이오틱스"],
//     functionText: ["장 건강에 도움을 줄 수 있음"],
//     howToEat: "1일 1회 1캡슐",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["항생제와는 시간 간격을 두세요"],
//     imageUrl: "https://cdn.medilog.today/images/products/11.png",
//   },
//   12: {
//     productId: 12,
//     category: "GUT",
//     name: "차전자피",
//     manufacturer: "OO식이섬유",
//     appearanceForm: "분말",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["차전자피"],
//     functionText: ["배변활동 원활에 도움을 줄 수 있음"],
//     howToEat: "1일 1회 1스푼",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["물을 충분히 함께 섭취하세요"],
//     imageUrl: "https://cdn.medilog.today/images/products/12.png",
//   },

//   13: {
//     productId: 13,
//     category: "BLOOD",
//     name: "오메가3",
//     manufacturer: "GG오일",
//     appearanceForm: "캡슐",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["EPA", "DHA"],
//     functionText: ["혈행 개선에 도움을 줄 수 있음"],
//     howToEat: "1일 1회 1캡슐",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["항응고제 복용 시 전문가와 상담하세요"],
//     imageUrl: "https://cdn.medilog.today/images/products/13.png",
//   },
//   14: {
//     productId: 14,
//     category: "BLOOD",
//     name: "비타민K",
//     manufacturer: "PP케어",
//     appearanceForm: "정제",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["비타민K"],
//     functionText: ["정상적인 혈액응고에 필요"],
//     howToEat: "1일 1회 1정",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["와파린 복용 시 섭취 전 상담하세요"],
//     imageUrl: "https://cdn.medilog.today/images/products/14.png",
//   },

//   15: {
//     productId: 15,
//     category: "SKIN",
//     name: "콜라겐 비오틴",
//     manufacturer: "HH뷰티",
//     appearanceForm: "정제",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["콜라겐", "비오틴"],
//     functionText: ["피부 건강에 도움을 줄 수 있음"],
//     howToEat: "1일 1회 1정",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["특정 성분 알레르기 주의"],
//     imageUrl: "https://cdn.medilog.today/images/products/15.png",
//   },
//   16: {
//     productId: 16,
//     category: "SKIN",
//     name: "비타민E",
//     manufacturer: "QQ뷰티",
//     appearanceForm: "캡슐",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["비타민E"],
//     functionText: ["항산화에 도움을 줄 수 있음"],
//     howToEat: "1일 1회 1캡슐",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["고용량 장기 섭취는 피하세요"],
//     imageUrl: "https://cdn.medilog.today/images/products/16.png",
//   },

//   17: {
//     productId: 17,
//     category: "MUSCLE",
//     name: "단백질 아미노산",
//     manufacturer: "II스포츠",
//     appearanceForm: "분말",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["BCAA", "단백질"],
//     functionText: ["근육 회복에 도움을 줄 수 있음"],
//     howToEat: "1일 1회 1스푼",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["신장 질환자는 섭취 전 상담하세요"],
//     imageUrl: "https://cdn.medilog.today/images/products/17.png",
//   },
//   18: {
//     productId: 18,
//     category: "MUSCLE",
//     name: "크레아틴",
//     manufacturer: "RR스포츠",
//     appearanceForm: "분말",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["크레아틴"],
//     functionText: ["고강도 운동 수행에 도움을 줄 수 있음"],
//     howToEat: "1일 1회 1스푼",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["충분한 수분 섭취가 필요해요"],
//     imageUrl: "https://cdn.medilog.today/images/products/18.png",
//   },

//   19: {
//     productId: 19,
//     category: "LIVER",
//     name: "밀크시슬",
//     manufacturer: "JJ케어",
//     appearanceForm: "정제",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["실리마린"],
//     functionText: ["간 건강에 도움을 줄 수 있음"],
//     howToEat: "1일 1회 1정",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["알레르기 체질은 주의하세요"],
//     imageUrl: "https://cdn.medilog.today/images/products/19.png",
//   },
//   20: {
//     productId: 20,
//     category: "LIVER",
//     name: "NAC",
//     manufacturer: "SS케어",
//     appearanceForm: "정제",
//     text: "고유의 향미가 있고 입자성을 띄는 성상을 가지고 있어요",
//     ingredients: ["N-아세틸시스테인"],
//     functionText: ["항산화에 도움을 줄 수 있음"],
//     howToEat: "1일 1회 1정",
//     expiration: "제조일로부터 24개월",
//     storageMethod: "직사광선을 피해 서늘한 곳 보관",
//     cautionRaw: ["위장 불편감이 있을 수 있어요"],
//     imageUrl: "https://cdn.medilog.today/images/products/20.png",
//   },
// };

// // ✅ 예시 레벨 부여 로직(원하면 여기만 바꾸면 됨)
// function getLevelByTarget(_target: Target, productId: number) {
//   // 데모: 홀수면 1(ALLOW 느낌), 짝수면 2(CAUTION 느낌)
//   return productId % 2 === 1 ? 1 : 2;
// }

// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ productId: string }> }
// ) {
//    const { productId } = await params;
//    const id = Number(productId);
//   if (!Number.isFinite(id)) {
//     return NextResponse.json(
//       { ok: false, message: "invalid productId" },
//       { status: 400 }
//     );
//   }

//   const base = MOCK_PRODUCT_DETAILS[id];
//   if (!base) {
//     return NextResponse.json({ ok: false, message: "not found" }, { status: 404 });
//   }

//   const { searchParams } = new URL(req.url);
//   const targetParam = searchParams.get("target");
//   const target = isTarget(targetParam) ? targetParam : null;

//   const response: ProductDetailResponse = {
//     ...base,
//     target,
//     level: target ? getLevelByTarget(target, id) : null,
//   };

//   return NextResponse.json(response);
// }

// src/app/api/v1/products/[productId]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ productId: string }> },
) {
  const { productId } = await context.params

  if (!productId) {
    return NextResponse.json({ message: 'productId is required' }, { status: 400 })
  }

  const { searchParams } = new URL(request.url)
  const target = searchParams.get('target')

  const backendUrl = new URL(`http://medly.deving.xyz:8080/v1/products/${productId}`)

  if (target) {
    backendUrl.searchParams.set('target', target)
  }

  const res = await fetch(backendUrl.toString())
  const data = await res.json()

  return NextResponse.json(data, { status: res.status })
}
