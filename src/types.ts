export type EngagementEvent = {
  type: "confused" | "drop" | "engaged";
  timestamp: number;
  score: number;
};

export type AISuggestion = {
  title: string;
  content: string;
};

export type SessionSummary = {
  topic: string;
  keyPoints: string[];
  notes: string;
  quiz: string[];
};
