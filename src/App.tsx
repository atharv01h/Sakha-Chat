// coded by Atharv Hatwar
import React, { useState, useRef, useEffect } from 'react';
import { Message, Language, UserGender, Theme } from './types';
import { getGeminiResponse } from './utils/gemini';
import { containsVulgarWords } from './utils/profanityFilter';
import { logChat } from './utils/chatLogger';
import { ChatMessage } from './components/ChatMessage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GenderSelector } from './components/GenderSelector';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState<Language>('hinglish');
  const [gender, setGender] = useState<UserGender>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (gender) {
      const initialMessage: Message = {
        id: Date.now().toString(),
        content: `Radhe Radhe ${gender === 'male' ? 'mere Sakha' : 'meri Sakhi'}! Main aapka dost Sakha. Kya main aapki kisi pareshani mein madad kar sakta hoon? 🙏`,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages([initialMessage]);
      logChat(initialMessage);
    }
  }, [gender]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !gender || isLoading || isBlocked) return;

    if (containsVulgarWords(input)) {
      setIsBlocked(true);
      const warningMessage: Message = {
        id: Date.now().toString(),
        content: "🚫 Please maintain the purity of our conversation. You have been blocked for using inappropriate language.",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, warningMessage]);
      logChat(warningMessage);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    logChat(userMessage);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(input, language, gender);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      logChat(botMessage);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!gender) {
    return (
      <div className={`min-h-screen ${
        theme === 'dark'
          ? 'bg-gray-900'
          : 'bg-gradient-to-br from-purple-100 to-blue-100'
      } flex items-center justify-center p-4`}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`${
            theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          } rounded-lg shadow-xl p-8 max-w-md w-full text-center`}
        >
          <motion.img
            src="https://theshreekrishna.com/wp-content/uploads/2024/05/instagram-cute-krishna-dp-for-whatsapp.webp"
            alt="Sakha"
            className="w-32 h-32 mx-auto mb-6 rounded-full object-cover"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          />
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-3xl font-bold mb-6"
          >
            Radhe Radhe 🙏
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Choose how you'd like me to address you
          </motion.p>
          <GenderSelector gender={gender} setGender={setGender} theme={theme} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${
      theme === 'dark'
        ? 'bg-gray-900'
        : 'bg-gradient-to-br from-purple-100 to-blue-100'
    }`}>
      <div className="container mx-auto max-w-4xl h-screen p-4 flex flex-col">
        <Header 
          language={language} 
          setLanguage={setLanguage} 
          theme={theme} 
          toggleTheme={toggleTheme}
        />
        
        <div className={`flex-1 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } overflow-y-auto p-4 rounded-none`}>
          <AnimatePresence>
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message}
                theme={theme}
              />
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={`${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } p-4`}>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isBlocked ? "Blocked due to inappropriate language" : "Ask Sakha for guidance..."}
              className={`flex-1 p-4 rounded-full focus:outline-none focus:ring-2 ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500'
                  : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-blue-400'
              }`}
              disabled={isLoading || isBlocked}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading || isBlocked}
              className={`p-4 rounded-full ${
                theme === 'dark'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white disabled:opacity-50`}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </form>
        
        <Footer theme={theme} />
      </div>
    </div>
  );
}

export default App;