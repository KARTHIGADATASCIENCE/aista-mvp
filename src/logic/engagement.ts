export type EngagementEventType = "confused" | "drop" | "engaged";

export function updateEngagementScore(
  currentScore: number,
  event: EngagementEventType
): number {
  let score = currentScore;

  switch (event) {
    case "confused":
      score -= 10;
      break;
    case "drop":
      score -= 15;
      break;
    case "engaged":
      score += 10;
      break;
  }

  return Math.max(0, Math.min(100, score));
}

export function getEngagementStatus(score: number): "high" | "medium" | "low" {
  if (score >= 70) return "high";
  if (score >= 40) return "medium";
  return "low";
}
