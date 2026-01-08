import type { SessionSummary } from "../types";

export function generateSessionSummary(topic: string): SessionSummary {
  return {
    topic,
    keyPoints: [
      `What is ${topic}?`,
      `Why ${topic} matters`,
      `Simple example of ${topic}`
    ],
    notes: `This session focused on explaining ${topic} using simple language and examples so students can easily understand.`,
    quiz: [
      `Define ${topic} in simple terms.`,
      `Give one real-world example of ${topic}.`,
      `Why is ${topic} important?`
    ]
  };
}
