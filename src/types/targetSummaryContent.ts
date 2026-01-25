export type TargetSummaryContent = {
  title: string
  sentenceIntro: string
  sentenceAvgComposition: string
  sentenceNote: string
  disclaimer: string
}

export type Target = '전체' | '임산부' | '청소년' | '다이어터'

export type TargetGuideOverride = {
  title?: string
  sentenceFiltering?: string
  sentenceAvgComposition?: string
  sentenceCaution?: string
}

/**
 * 카드 렌더링에 딱 필요한 값
 * - desktopSubtitle: 데스크탑에서 타이틀 밑에 보여줄 한 줄
 * - helperLabel: tipBox 안에 들어갈 문구(전체=avg, 타겟=caution)
 */
export type BasicTargetCardContent = {
  title: string
  desktopSubtitle: string
  helperLabel: string
  disclaimer: string
}

/* 카테고리(전체/미선택) 기본 요약 */
export const TARGET_SUMMARY_BY_CATEGORY: Record<string, TargetSummaryContent> = {
  '눈 건강': {
    title: '눈 건강 제품 정보',
    sentenceIntro: '눈 사용과 관련해 언급되는 제품 정보를 모아서 보여줘요.',
    sentenceAvgComposition:
      '눈 건강에는 비타민 A·C·E와 루테인, 미네랄을 함께 보충해 주는 경우가 많아요.',
    sentenceNote:
      '제품마다 성분 구성은 다를 수 있어, 성분 흐름을 참고해 살펴보면 도움이 돼요.',
    disclaimer: '의학적 진단이 아니며, 필요 시 전문가와 상담해 주세요.',
  },
  '뼈·관절': {
    title: '뼈·관절 제품 정보',
    sentenceIntro: '뼈와 관절과 관련해 언급되는 제품 정보를 모아서 보여줘요.',
    sentenceAvgComposition:
      '뼈·관절 관리에는 칼슘과 비타민 D, 마그네슘을 함께 보충하는 경우가 많아요.',
    sentenceNote: '성분 조합과 함량은 제품마다 달라질 수 있어요.',
    disclaimer: '의학적 진단이 아니며, 필요 시 전문가와 상담해 주세요.',
  },
  면역: {
    title: '면역 관련 제품 정보',
    sentenceIntro: '신체 방어 기능과 관련해 언급되는 제품 정보를 모아서 보여줘요.',
    sentenceAvgComposition:
      '면역과 관련된 제품에는 비타민 C·D와 아연이 함께 포함되는 경우가 많아요.',
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
    sentenceAvgComposition:
      '수면·스트레스 제품에는 마그네슘과 비타민 B군, L-테아닌이 함께 포함되는 경우가 많아요.',
    sentenceNote: '제품마다 성분 구성이나 안내 맥락이 다를 수 있어요.',
    disclaimer: '의학적 진단이 아니며, 필요 시 전문가와 상담해 주세요.',
  },
  '장 건강': {
    title: '장 건강 제품 정보',
    sentenceIntro: '소화 과정이나 장 환경과 관련해 언급되는 제품 정보를 모아서 보여줘요.',
    sentenceAvgComposition:
      '장 건강에는 프로바이오틱스와 프리바이오틱스, 식이섬유를 함께 보충하는 경우가 많아요.',
    sentenceNote: '균주나 원료 구성은 제품마다 다를 수 있어요.',
    disclaimer: '의학적 진단이 아니며, 필요 시 전문가와 상담해 주세요.',
  },
  '혈행·혈압': {
    title: '혈행·혈압 관련 제품 정보',
    sentenceIntro: '혈액 흐름이나 혈압과 관련해 언급되는 제품 정보를 모아서 보여줘요.',
    sentenceAvgComposition:
      '혈행·혈압 제품에는 오메가3 지방산과 비타민 E가 함께 포함되는 경우가 많아요.',
    sentenceNote: '지용성 성분이 포함된 경우도 있어 참고해 보세요.',
    disclaimer: '의학적 진단이 아니며, 필요 시 전문가와 상담해 주세요.',
  },
  '피부·모발': {
    title: '피부·모발 제품 정보',
    sentenceIntro: '피부나 모발과 관련해 언급되는 제품 정보를 모아서 보여줘요.',
    sentenceAvgComposition:
      '피부·모발 관리에는 비오틴과 비타민 C·E, 아연이 함께 언급되는 경우가 많아요.',
    sentenceNote: '복합 성분 구성은 제품마다 달라질 수 있어요.',
    disclaimer: '의학적 진단이 아니며, 필요 시 전문가와 상담해 주세요.',
  },
  '근육·운동': {
    title: '근육·운동 관련 제품 정보',
    sentenceIntro: '운동이나 신체 활동과 관련해 언급되는 제품 정보를 모아서 보여줘요.',
    sentenceAvgComposition:
      '근육·운동 제품에는 단백질과 BCAA, 마그네슘이 함께 포함되는 경우가 많아요.',
    sentenceNote: '제품 목적에 따라 성분 구성이 달라질 수 있어요.',
    disclaimer: '의학적 진단이 아니며, 필요 시 전문가와 상담해 주세요.',
  },
  '간 건강': {
    title: '간 건강 관련 제품 정보',
    sentenceIntro: '간 기능이나 대사 과정과 관련해 언급되는 제품 정보를 모아서 보여줘요.',
    sentenceAvgComposition:
      '간 건강 제품에는 밀크시슬 추출물과 비타민 B군이 함께 언급되는 경우가 많아요.',
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

/* 타겟 선택 시 override */
export const OVERRIDE_BY_CATEGORY_TARGET: Record<string, TargetGuideOverride> = {
  // 눈 건강
  '눈 건강__임산부': {
    title: '임산부를 위한 눈 건강 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '눈 건강 제품에는 비타민 A·C·E와 루테인, 미네랄이 함께 포함되는 경우가 많아요.',
    sentenceCaution:
      '임산부의 경우 비타민 A처럼 과다 섭취 시 부담이 될 수 있는 성분은 조금 더 조심하면 좋아요.',
  },
  '눈 건강__청소년': {
    title: '청소년을 위한 눈 건강 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition: '눈 건강 제품에는 루테인과 비타민, 미네랄 성분이 자주 포함돼요.',
    sentenceCaution: '성장기에는 고함량으로 설계된 제품은 신중하게 선택하는 편이 좋아요.',
  },
  '눈 건강__다이어터': {
    title: '다이어터를 위한 눈 건강 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '눈 건강 제품에는 루테인과 비타민, 미네랄 성분이 함께 포함되는 경우가 많아요.',
    sentenceCaution: '다이어트 중에는 다른 제품과 성분이 겹쳐 부담이 되지 않는지 유의해 주세요.',
  },

  // 뼈·관절
  '뼈·관절__임산부': {
    title: '임산부를 위한 뼈·관절 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '뼈·관절 제품에는 칼슘과 비타민 D, 마그네슘이 함께 포함되는 경우가 많아요.',
    sentenceCaution: '임산부의 경우 미네랄 성분이 과하게 겹치지 않는지 조심하면 좋아요.',
  },
  '뼈·관절__청소년': {
    title: '청소년을 위한 뼈·관절 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '뼈·관절 제품에는 칼슘과 비타민 D처럼 성장과 연관된 성분이 자주 보여요.',
    sentenceCaution: '성장기에는 고함량 제품은 신중하게 살펴보는 게 좋아요.',
  },
  '뼈·관절__다이어터': {
    title: '다이어터를 위한 뼈·관절 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '뼈·관절 제품에는 미네랄과 비타민 성분이 함께 포함되는 경우가 많아요.',
    sentenceCaution: '체중 관리 중에는 다른 영양제와 성분이 중복되지 않도록 유의해 주세요.',
  },

  // 면역
  '면역__임산부': {
    title: '임산부를 위한 면역 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '면역 관련 제품에는 비타민 C·D와 아연이 함께 포함되는 경우가 많아요.',
    sentenceCaution: '임산부는 고용량으로 설계된 제품은 부담이 될 수 있어 조심하면 좋아요.',
  },
  '면역__청소년': {
    title: '청소년을 위한 면역 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition: '면역 제품에는 비타민과 미네랄 성분이 함께 포함되는 경우가 많아요.',
    sentenceCaution: '성장기에는 여러 기능성 성분이 한 번에 들어간 제품은 주의가 필요해요.',
  },
  '면역__다이어터': {
    title: '다이어터를 위한 면역 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '면역 제품에는 비타민과 아연처럼 자주 함께 언급되는 성분이 포함돼요.',
    sentenceCaution: '다이어트 중에는 다른 기능성 제품과 성분이 겹치지 않는지 살펴보면 좋아요.',
  },

  // 피로·에너지
  '피로·에너지__임산부': {
    title: '임산부를 위한 피로·에너지 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '피로·에너지 제품에는 비타민 B군과 마그네슘이 자주 포함돼요.',
    sentenceCaution: '임산부의 경우 카페인이나 각성 성분은 특히 조심하면 좋아요.',
  },
  '피로·에너지__청소년': {
    title: '청소년을 위한 피로·에너지 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '피로·에너지 제품에는 비타민 B군과 미네랄 성분이 함께 포함되는 경우가 많아요.',
    sentenceCaution: '청소년은 고카페인 제품은 피하는 편이 좋아요.',
  },
  '피로·에너지__다이어터': {
    title: '다이어터를 위한 피로·에너지 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition: '피로·에너지 제품에는 비타민 B군과 미네랄 성분이 자주 보여요.',
    sentenceCaution: '체중 관리 중에는 카페인 함량이 높은 제품은 부담이 될 수 있어요.',
  },

  // 수면·스트레스
  '수면·스트레스__임산부': {
    title: '임산부를 위한 수면·스트레스 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '수면·스트레스 제품에는 마그네슘과 비타민 B군, L-테아닌이 자주 포함돼요.',
    sentenceCaution: '임산부의 경우 신경계에 영향을 줄 수 있는 성분은 조심하면 좋아요.',
  },
  '수면·스트레스__청소년': {
    title: '청소년을 위한 수면·스트레스 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '수면·스트레스 제품에는 마그네슘과 허브 성분이 함께 포함되는 경우가 많아요.',
    sentenceCaution: '청소년은 복합 허브 성분이 많은 제품은 신중하게 살펴보는 게 좋아요.',
  },
  '수면·스트레스__다이어터': {
    title: '다이어터를 위한 수면·스트레스 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '수면·스트레스 제품에는 마그네슘과 테아닌 성분이 자주 포함돼요.',
    sentenceCaution: '다이어트 중에는 카페인과 함께 섭취되지 않도록 유의해 주세요.',
  },

  // 장 건강
  '장 건강__임산부': {
    title: '임산부를 위한 장 건강 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '장 건강 제품에는 프로바이오틱스와 식이섬유가 함께 포함되는 경우가 많아요.',
    sentenceCaution: '임산부는 복합 원료가 많은 제품은 몸 상태에 따라 부담이 될 수 있어요.',
  },
  '장 건강__청소년': {
    title: '청소년을 위한 장 건강 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '장 건강 제품에는 유산균과 식이섬유 성분이 자주 보여요.',
    sentenceCaution: '청소년은 여러 기능성 성분이 함께 들어간 제품은 주의가 필요해요.',
  },
  '장 건강__다이어터': {
    title: '다이어터를 위한 장 건강 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '장 건강 제품에는 프로바이오틱스와 프리바이오틱스가 함께 포함돼요.',
    sentenceCaution: '다이어트 중에는 다른 기능성 제품과 겹쳐 부담이 되지 않는지 살펴보세요.',
  },

  // 혈행·혈압
  '혈행·혈압__임산부': {
    title: '임산부를 위한 혈행·혈압 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '혈행·혈압 제품에는 오메가3 지방산과 비타민 E가 자주 포함돼요.',
    sentenceCaution: '임산부는 지용성 성분이 과하게 겹치지 않도록 조심하면 좋아요.',
  },
  '혈행·혈압__청소년': {
    title: '청소년을 위한 혈행·혈압 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '혈행·혈압 제품에는 지방산과 항산화 성분이 함께 포함되는 경우가 많아요.',
    sentenceCaution: '청소년은 필요 이상으로 고함량인 제품은 신중하게 살펴보는 게 좋아요.',
  },
  '혈행·혈압__다이어터': {
    title: '다이어터를 위한 혈행·혈압 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition: '혈행·혈압 제품에는 오메가3 성분이 자주 포함돼요.',
    sentenceCaution: '체중 관리 중에는 다른 지방산 제품과 중복되지 않도록 유의해 주세요.',
  },

  // 피부·모발
  '피부·모발__임산부': {
    title: '임산부를 위한 피부·모발 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '피부·모발 제품에는 비오틴과 비타민 C·E, 아연이 함께 포함되는 경우가 많아요.',
    sentenceCaution: '임산부는 고용량 비오틴 성분은 부담이 될 수 있어 조심하면 좋아요.',
  },
  '피부·모발__청소년': {
    title: '청소년을 위한 피부·모발 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '피부·모발 제품에는 비타민과 미네랄 성분이 자주 보여요.',
    sentenceCaution: '청소년은 복합 성분이 많은 제품은 신중하게 선택하는 게 좋아요.',
  },
  '피부·모발__다이어터': {
    title: '다이어터를 위한 피부·모발 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '피부·모발 제품에는 비오틴과 아연 성분이 함께 포함되는 경우가 많아요.',
    sentenceCaution: '다이어트 중에는 다른 미용 목적 제품과 성분이 겹치지 않는지 유의해 주세요.',
  },

  // 근육·운동
  '근육·운동__임산부': {
    title: '임산부를 위한 근육·운동 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '근육·운동 제품에는 단백질과 마그네슘 성분이 자주 포함돼요.',
    sentenceCaution: '임산부는 고단백·고농축 제품은 부담이 될 수 있어 조심하면 좋아요.',
  },
  '근육·운동__청소년': {
    title: '청소년을 위한 근육·운동 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '근육·운동 제품에는 단백질과 아미노산 성분이 함께 포함되는 경우가 많아요.',
    sentenceCaution: '청소년은 체중·체력에 맞지 않는 고함량 제품은 주의가 필요해요.',
  },
  '근육·운동__다이어터': {
    title: '다이어터를 위한 근육·운동 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition: '근육·운동 제품에는 단백질과 BCAA 성분이 자주 보여요.',
    sentenceCaution: '체중 관리 중에는 단백질이 과하게 겹치지 않도록 유의해 주세요.',
  },

  // 간 건강
  '간 건강__임산부': {
    title: '임산부를 위한 간 건강 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '간 건강 제품에는 밀크시슬 추출물과 비타민 B군이 함께 포함되는 경우가 많아요.',
    sentenceCaution: '임산부는 허브 추출물이 포함된 제품은 조심해서 살펴보는 게 좋아요.',
  },
  '간 건강__청소년': {
    title: '청소년을 위한 간 건강 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '간 건강 제품에는 항산화 성분과 비타민 성분이 자주 포함돼요.',
    sentenceCaution: '청소년은 여러 기능성 성분이 함께 들어간 제품은 신중하게 선택하는 게 좋아요.',
  },
  '간 건강__다이어터': {
    title: '다이어터를 위한 간 건강 가이드',
    sentenceFiltering: '선택하신 대상 기준으로, 목록에서 강한 주의가 언급된 제품은 제외했어요.',
    sentenceAvgComposition:
      '간 건강 제품에는 밀크시슬과 비타민 B군 성분이 자주 보여요.',
    sentenceCaution: '다이어트 중에는 다른 해독 목적 제품과 중복되지 않도록 유의해 주세요.',
  },
}


/**
 *  스샷 규칙에 맞춘 최종 조합
 * - 전체: desktopSubtitle = intro + note, helperLabel = avgComposition
 * - 타겟: desktopSubtitle = avgComposition(타겟 우선), helperLabel = caution(타겟 우선)
 */
export function getBasicTargetCardContent(params: {
  category?: string | null
  target?: Target | null
}): BasicTargetCardContent {
  const category = (params.category ?? '').trim()
  const target = (params.target ?? '전체') as Target

  const base = getTargetSummaryContent(category)

  // category 없으면 그냥 base로
  if (!category) {
    return {
      title: base.title,
      desktopSubtitle: `${base.sentenceIntro} ${base.sentenceNote}`.trim(),
      helperLabel: base.sentenceAvgComposition,
      disclaimer: base.disclaimer,
    }
  }

  // 전체(또는 타겟 미설정)
  if (target === '전체') {
    return {
      title: base.title,
      desktopSubtitle: `${base.sentenceIntro} ${base.sentenceNote}`.trim(),
      helperLabel: base.sentenceAvgComposition,
      disclaimer: base.disclaimer,
    }
  }

  // 타겟 선택
  const override = OVERRIDE_BY_CATEGORY_TARGET[`${category}__${target}`]

  // override 없으면 안전하게 전체 룰로 fallback
  if (!override) {
    return {
      title: base.title,
      desktopSubtitle: `${base.sentenceIntro} ${base.sentenceNote}`.trim(),
      helperLabel: base.sentenceAvgComposition,
      disclaimer: base.disclaimer,
    }
  }

  const title = override.title ?? base.title

  // (데스크탑) 타이틀 밑은 AvgComposition (타겟별 우선)
  const desktopSubtitle = (override.sentenceAvgComposition ?? base.sentenceAvgComposition).trim()

  // tipBox는 Caution (타겟별 우선) — 없으면 avg로 fallback
  const helperLabel = (override.sentenceCaution ?? override.sentenceFiltering ?? base.sentenceAvgComposition).trim()

  return {
    title,
    desktopSubtitle,
    helperLabel,
    disclaimer: base.disclaimer,
  }
}