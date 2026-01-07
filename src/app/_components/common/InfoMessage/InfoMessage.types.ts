import type { ReactNode } from 'react';

export type InfoMessageProps = {
  /** 안내 문구 */
  message: string;

  /** 아이콘을 직접 넣고 싶을 때(옵션). 없으면 기본 infocircle.png 사용 */
  icon?: ReactNode;

  /** 기본 아이콘(이미지)을 보여줄지 여부 (기본 true) */
  showDefaultIcon?: boolean;

  /** 추가 클래스 */
  className?: string;

  /** 최소 높이 (기본: 100px = 피그마 높이) */
  minHeight?: number;
};
