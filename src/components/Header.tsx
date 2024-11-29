// coded by Atharv Hatwar
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Language, Theme } from '../types';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  language: Language;
  setLanguage: (language: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  language, 
  setLanguage, 
  theme, 
  toggleTheme 
}) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } rounded-t-xl shadow-lg p-4`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <img
            src="https://theshreekrishna.com/wp-content/uploads/2024/05/instagram-cute-krishna-dp-for-whatsapp.webp"
            alt="Sakha"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h1 className="text-xl font-bold">Sakha</h1>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex items-center text-sm opacity-75"
            >
              Made with{' '}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="mx-1 text-red-500"
              >
                <Heart className="w-4 h-4 fill-current" />
              </motion.div>
              {' '}by Atharv Hatwar
            </motion.div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSelector language={language} setLanguage={setLanguage} theme={theme} />
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </motion.div>
  );
};