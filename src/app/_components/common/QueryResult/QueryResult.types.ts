export type QueryResultProps = {
  count: number;

  label?: string;

  unit?: string;

  onRefresh?: () => void;

  showRefresh?: boolean;

  disabled?: boolean;

  className?: string;

  refreshAriaLabel?: string;

  iconSize?: number;
};
