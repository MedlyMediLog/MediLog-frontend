import { DEFAULT_TARGET_SUMMARY, TARGET_SUMMARY_BY_CATEGORY, TargetSummaryContent } from "@/types/targetSummaryContent"

const CATEGORY_ALIAS: Record<string, string> = {
  EYE: '눈 건강',
  BONE: '뼈·관절',
  IMMUNE: '면역',
  ENERGY: '피로·에너지',
  STRESS: '수면·스트레스',
  GUT: '장 건강',
  BLOOD: '혈행·혈압',
  SKIN: '피부·모발',
  MUSCLE: '근육·운동',
  LIVER: '간 건강',
}

export function getTargetSummaryContent(category?: string | null): TargetSummaryContent {
  const raw = (category ?? '').trim()
  if (!raw) return DEFAULT_TARGET_SUMMARY

  // 1) 영문 enum이면 한글 라벨로 변환
  const normalized = CATEGORY_ALIAS[raw.toUpperCase()] ?? raw

  // 2) 그걸로 매핑
  return TARGET_SUMMARY_BY_CATEGORY[normalized] ?? DEFAULT_TARGET_SUMMARY
}
