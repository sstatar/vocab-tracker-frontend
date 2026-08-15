export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Vocab {
  id: string;
  word: string;
  meaning: string;
  partOfSpeech: string;
  example?: string | null;
  status: string;
  createdAt: string;
  userId: string;
  updatedAt: string;
}

export interface VocabStats {
  total: number;
  mastered: number;
  learning: number;
  needsReview: number;
  progressPercentage: number;
  userName: string;
  streak: number;
  dailyGoal: number;
  reviewedToday: number;
}