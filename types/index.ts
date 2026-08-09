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
}