import type { AISuggestion } from "../types";
import { PROMPTS } from "../utils/prompts";

export function getAISuggestion(
  engagementStatus: "high" | "medium" | "low",
  topic: string
): AISuggestion | null {
  if (engagementStatus !== "low") return null;

  return {
    title: "Engagement Low – AI Assist",
    content: PROMPTS.simplifyExplanation(topic)
  };
}
