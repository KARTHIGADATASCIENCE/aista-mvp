import { PROMPTS } from "../utils/prompts";

export type TeachingAssist = {
  explanation: string;
  quiz: string[];
};

export function getTeachingAssist(
  engagementStatus: "high" | "medium" | "low",
  topic: string
): TeachingAssist | null {
  if (engagementStatus !== "low") return null;

  return {
    explanation: PROMPTS.simplifyExplanation(topic),
    quiz: [
      `Quick check: What is ${topic}?`,
      `Can anyone give one simple example of ${topic}?`,
      `Why do we use ${topic}?`
    ]
  };
}
