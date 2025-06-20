import type { ReactNode } from 'react';

export interface SummaryCardTileProps {
  title: string;
  value: string | number | null;
  percentage?: string | null; 
  icon?: ReactNode;
  color?: string;
  width?: string | number;
  flex?: string | number;
  loading?: boolean;
}