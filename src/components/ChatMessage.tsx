// coded by Atharv Hatwar
import React from 'react';
import { motion } from 'framer-motion';
import { Message, Theme } from '../types';
import { User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  theme: Theme;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, theme }) => {
  const isUser = message.role === 'user';

  const messageVariants = {
    hidden: { 
      opacity: 0,
      x: isUser ? 20 : -20,
      y: 10,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 40,
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={messageVariants}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`flex items-start space-x-2 max-w-[80%] ${
          isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
        }`}
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`p-2 rounded-full ${
            theme === 'dark'
              ? isUser ? 'bg-blue-900' : 'bg-purple-900'
              : isUser ? 'bg-blue-100' : 'bg-purple-100'
          }`}
        >
          {isUser ? (
            <User className={`w-6 h-6 ${
              theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
            }`} />
          ) : (
            <img 
              src="https://theshreekrishna.com/wp-content/uploads/2024/05/instagram-cute-krishna-dp-for-whatsapp.webp"
              alt="Sakha"
              className="w-6 h-6 rounded-full object-cover"
            />
          )}
        </motion.div>
        <motion.div
          className={`p-4 rounded-2xl shadow-md ${
            theme === 'dark'
              ? isUser
                ? 'bg-blue-600 text-white rounded-tr-none'
                : 'bg-purple-600 text-white rounded-tl-none'
              : isUser
                ? 'bg-blue-500 text-white rounded-tr-none'
                : 'bg-purple-500 text-white rounded-tl-none'
          }`}
        >
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>
          <span className="text-xs opacity-70 mt-1 block">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};