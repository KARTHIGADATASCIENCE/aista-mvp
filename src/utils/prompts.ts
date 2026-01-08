export const PROMPTS = {
  simplifyExplanation: (topic: string) =>
    `Explain ${topic} in very simple terms, as if teaching a beginner. Use a real-world analogy.`,

  giveExample: (topic: string) =>
    `Give one clear, practical example to explain ${topic}.`,

  generateQuiz: (topic: string) =>
    `Generate 3 simple quiz questions to test understanding of ${topic}.`
};
