import type { AISuggestion } from "../types";

export function getAISuggestion(
  engagementStatus: "high" | "medium" | "low",
  topic: string
): AISuggestion | null {
  if (engagementStatus !== "low") return null;

  return {
    title: "Try a simpler explanation",
    content: `Students seem disengaged. Explain "${topic}" using a real-world analogy or a simple example.`
  };
}
