// src/app/(with-footer)/(with-sidebar)/products/_components/shared/BasicTargetSummaryCard/BasicTargetSummaryCard.content.ts

export type TargetSummaryContent = {
  title: string
  sentenceIntro: string
  sentenceAvgComposition: string
  sentenceNote: string
  disclaimer: string
}

export const TARGET_SUMMARY_BY_CATEGORY: Record<string, TargetSummaryContent> = {
  '눈 건강': {
    title: '눈 건강 제품 정보',
    sentenceIntro: '눈 사용과 관련해 언급되는 제품 정보를 모아서 보여줘요.',
    sentenceAvgComposition: '눈 건강에는 비타민 A·C·E와 루테인, 미네랄을 함께 보충해 주는 경우가 많아요.',
    sentenceNote: '제품마다 성분 구성은 다를 수 있어, 성분 흐름을 참고해 살펴보면 도움이 돼요.',
    disclaimer: '의학적 진단이 아니며, 필요 시 전문가와 상담해 주세요.',
  },
  '뼈·관절': {
    title: '뼈·관절 제품 정보',
    sentenceIntro: '뼈와 관절과 관련해 언급되는 제품 정보를 모아서 보여줘요.',
    sentenceAvgComposition: '뼈·관절 관리에는 칼슘과 비타민 D, 마그네슘을 함께 보충하는 경우가 많아요.',
    sentenceNote: '성분 조합과 함량은 제품마다 달라질 수 있어요.',
    disclaimer: '의학적 진단이 아니며, 필요 시 전문가와 상담해 주세요.',
  },
  '면역': {
    title: '면역 관련 제품 정보',
    sentenceIntro: '신체 방어 기능과 관련해 언급되는 제품 정보를 모아서 보여줘요.',
    sentenceAvgComposition: '면역과 관련된 제품에는 비타민 C·D와 아연이 함께 포함되는 경우가 많아요.',
    sentenceNote: '여러 제품에 같은 성분이 겹쳐 있을 수도 있어요.',
    disclaimer: '의학적 진단이 아니며, 필요 시 전문가와 상담해 주세요.',
  },
  '피로·에너지': {
    title: '피로·에너지 제품 정보',
    sentenceIntro: '일상적인 피로감이나 에너지와 관련해 언급되는 제품 정보를 모아서 보여줘요.',
    sentenceAvgComposition: '피로·에너지 관리에는 비타민 B군과 마그네슘이 자주 함께 언급돼요.',
    sentenceNote: '각성 성분이 포함된 제품도 있어, 성분 흐름을 참고해 보세요.',
    disclaimer: '의학적 진단이 아니며, 필요 시 전문가와 상담해 주세요.',
  },
  '수면·스트레스': {
    title: '수면·스트레스 관련 제품 정보',
    sentenceIntro: '수면이나 스트레스와 관련해 언급되는 제품 정보를 모아서 보여줘요.',
    sentenceAvgComposition: '수면·스트레스 제품에는 마그네슘과 비타민 B군, L-테아닌이 함께 포함되는 경우가 많아요.',
    sentenceNote: '제품마다 성분 구성이나 안내 맥락이 다를 수 있어요.',
    disclaimer: '의학적 진단이 아니며, 필요 시 전문가와 상담해 주세요.',
  },
  '장 건강': {
    title: '장 건강 제품 정보',
    sentenceIntro: '소화 과정이나 장 환경과 관련해 언급되는 제품 정보를 모아서 보여줘요.',
    sentenceAvgComposition: '장 건강에는 프로바이오틱스와 프리바이오틱스, 식이섬유를 함께 보충하는 경우가 많아요.',
    sentenceNote: '균주나 원료 구성은 제품마다 다를 수 있어요.',
    disclaimer: '의학적 진단이 아니며, 필요 시 전문가와 상담해 주세요.',
  },
  '혈행·혈압': {
    title: '혈행·혈압 관련 제품 정보',
    sentenceIntro: '혈액 흐름이나 혈압과 관련해 언급되는 제품 정보를 모아서 보여줘요.',
    sentenceAvgComposition: '혈행·혈압 제품에는 오메가3 지방산과 비타민 E가 함께 포함되는 경우가 많아요.',
    sentenceNote: '지용성 성분이 포함된 경우도 있어 참고해 보세요.',
    disclaimer: '의학적 진단이 아니며, 필요 시 전문가와 상담해 주세요.',
  },
  '피부·모발': {
    title: '피부·모발 제품 정보',
    sentenceIntro: '피부나 모발과 관련해 언급되는 제품 정보를 모아서 보여줘요.',
    sentenceAvgComposition: '피부·모발 관리에는 비오틴과 비타민 C·E, 아연이 함께 언급되는 경우가 많아요.',
    sentenceNote: '복합 성분 구성은 제품마다 달라질 수 있어요.',
    disclaimer: '의학적 진단이 아니며, 필요 시 전문가와 상담해 주세요.',
  },
  '근육·운동': {
    title: '근육·운동 관련 제품 정보',
    sentenceIntro: '운동이나 신체 활동과 관련해 언급되는 제품 정보를 모아서 보여줘요.',
    sentenceAvgComposition: '근육·운동 제품에는 단백질과 BCAA, 마그네슘이 함께 포함되는 경우가 많아요.',
    sentenceNote: '제품 목적에 따라 성분 구성이 달라질 수 있어요.',
    disclaimer: '의학적 진단이 아니며, 필요 시 전문가와 상담해 주세요.',
  },
  '간 건강': {
    title: '간 건강 관련 제품 정보',
    sentenceIntro: '간 기능이나 대사 과정과 관련해 언급되는 제품 정보를 모아서 보여줘요.',
    sentenceAvgComposition: '간 건강 제품에는 밀크시슬 추출물과 비타민 B군이 함께 언급되는 경우가 많아요.',
    sentenceNote: '원료 형태나 성분 조합은 제품마다 다를 수 있어요.',
    disclaimer: '의학적 진단이 아니며, 필요 시 전문가와 상담해 주세요.',
  },
}

export const DEFAULT_TARGET_SUMMARY: TargetSummaryContent = {
  title: '제품 정보',
  sentenceIntro: '관련 제품 정보를 모아서 보여줘요.',
  sentenceAvgComposition: '카테고리에 따라 함께 언급되는 성분 조합이 달라질 수 있어요.',
  sentenceNote: '제품마다 성분 구성은 다를 수 있어, 성분 흐름을 참고해 살펴보면 도움이 돼요.',
  disclaimer: '의학적 진단이 아니며, 필요 시 전문가와 상담해 주세요.',
}

export function getTargetSummaryContent(category?: string | null): TargetSummaryContent {
  const key = (category ?? '').trim()
  if (!key) return DEFAULT_TARGET_SUMMARY
  return TARGET_SUMMARY_BY_CATEGORY[key] ?? DEFAULT_TARGET_SUMMARY
}