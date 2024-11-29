// coded by Atharv Hatwar
import React from 'react';
import { motion } from 'framer-motion';
import { UserGender, Theme } from '../types';

interface GenderSelectorProps {
  gender: UserGender;
  setGender: (gender: UserGender) => void;
  theme: Theme;
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({
  gender,
  setGender,
  theme,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setGender('male')}
        className={`px-6 py-3 rounded-full w-full sm:w-auto ${
          gender === 'male'
            ? theme === 'dark'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-500 text-white'
            : theme === 'dark'
              ? 'bg-gray-700 text-gray-300'
              : 'bg-gray-200 text-gray-700'
        } transition-colors`}
      >
        Sakha (Male)
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setGender('female')}
        className={`px-6 py-3 rounded-full w-full sm:w-auto ${
          gender === 'female'
            ? theme === 'dark'
              ? 'bg-purple-600 text-white'
              : 'bg-purple-500 text-white'
            : theme === 'dark'
              ? 'bg-gray-700 text-gray-300'
              : 'bg-gray-200 text-gray-700'
        } transition-colors`}
      >
        Sakhi (Female)
      </motion.button>
    </div>
  );
};