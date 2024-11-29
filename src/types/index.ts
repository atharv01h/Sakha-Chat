// coded by Atharv Hatwar
export type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

// coded by Atharv Hatwar
export type Language = 'hinglish' | 'english' | 'marathi';

// coded by Atharv Hatwar
export type UserGender = 'male' | 'female' | undefined;

// coded by Atharv Hatwar
export type Theme = 'light' | 'dark';