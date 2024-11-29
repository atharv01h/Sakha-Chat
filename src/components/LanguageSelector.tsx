// coded by Atharv Hatwar
import React from 'react';
import { Language, Theme } from '../types';

interface LanguageSelectorProps {
  language: Language;
  setLanguage: (language: Language) => void;
  theme: Theme;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  setLanguage,
  theme,
}) => {
  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as Language)}
      className={`px-3 py-2 rounded-lg ${
        theme === 'dark'
          ? 'bg-gray-700 text-white border-gray-600'
          : 'bg-white text-gray-800 border-gray-300'
      } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
    >
      <option value="hinglish">Hinglish</option>
      <option value="english">English</option>
      <option value="marathi">Marathi</option>
    </select>
  );
};