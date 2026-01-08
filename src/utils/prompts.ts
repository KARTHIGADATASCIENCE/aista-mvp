// Central place for all AI prompts (easy to improve later)

export const PROMPTS = {
  simplifyExplanation: (topic: string) =>
    `Explain ${topic} in very simple terms, like teaching a beginner. Use a real-world analogy.`,

  engagementRecoveryTip: (topic: string) =>
    `Students seem disengaged. Suggest a simple way to re-explain ${topic} and regain attention.`,

  generateQuiz: (topic: string) =>
    `Create 3 very simple quiz questions to test understanding of ${topic}.`
};
