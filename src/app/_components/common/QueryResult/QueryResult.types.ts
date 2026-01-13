//src/app/_components/common/QueryResult/QueryResult.types.ts
export type QueryResultProps = {
  /** "조회 결과" 오른쪽에 보여줄 숫자 */
  count: number;

  /** 기본값: "조회 결과" */
  label?: string;

  /** 기본값: "개" */
  unit?: string;

  /** 새로고침 버튼 클릭 */
  onRefresh?: () => void;

  /** 새로고침 노출 여부 (기본: true) */
  showRefresh?: boolean;

  /** disabled 시 클릭 불가 + 스타일 약화 */
  disabled?: boolean;

  className?: string;

  /** a11y: 새로고침 버튼 라벨 */
  refreshAriaLabel?: string;

  /** 아이콘 크기(px). 기본: 20 */
  iconSize?: number;
};
