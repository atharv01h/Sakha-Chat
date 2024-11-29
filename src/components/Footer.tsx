// coded by Atharv Hatwar
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { Theme } from '../types';

interface FooterProps {
  theme: Theme;
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`${
        theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
      } rounded-b-xl shadow-lg p-4 text-center`}
    >
      <a
        href="https://www.instagram.com/atharv_hatwar/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 hover:text-pink-500 transition-colors"
      >
        <Instagram className="w-5 h-5" />
        <span>Follow me on Instagram</span>
      </a>
    </motion.div>
  );
};