export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface MoodEntry {
  id: string;
  date: Date;
  mood: 'great' | 'okay' | 'not_good';
  note?: string;
}

export interface Insight {
  category: string;
  score: number;
  previousScore?: number;
  change?: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
  color: string;
}

export interface ReflectionPromptType {
  id: string;
  text: string;
  category: string;
}