export function starsForScore(score: number, total: number): number {
  const ratio = score / total;
  if (ratio >= 0.95) return 3;
  if (ratio >= 0.6) return 2;
  if (ratio >= 0.2) return 1;
  return 0;
}
