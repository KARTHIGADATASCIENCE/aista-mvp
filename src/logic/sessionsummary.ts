import type { SessionSummary } from "../types";

/**
 * Generates end-of-session learning content
 */
export function generateSessionSummary(topic: string): SessionSummary {
  return {
    topic,
    keyPoints: [
      `Basic concept of ${topic}`,
      `Why ${topic} is important`,
      `Simple example of ${topic}`
    ],
    notes: `In this session, ${topic} was explained using simple language and examples to help students understand clearly.`,
    quiz: [
      `What is ${topic}?`,
      `Give one real-world example of ${topic}.`,
      `Why is ${topic} important?`
    ]
  };
}
