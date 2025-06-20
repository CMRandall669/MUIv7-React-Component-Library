export interface GridHeightOptions {
  rowCount: number;
  rowHeight?: number;
  headerHeight?: number;
  extraSpacing?: number;
  minVisibleRows?: number;
}

export function calculateGridHeight({
  rowCount,
  rowHeight = 52,
  headerHeight = 56,
  extraSpacing = 80,
  minVisibleRows = 5,
}: GridHeightOptions): number {
  const visibleRows = Math.max(rowCount, minVisibleRows);
  const totalHeight = visibleRows * rowHeight + headerHeight + extraSpacing;
  return totalHeight;
}
