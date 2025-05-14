import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircleQuestion } from 'lucide-react';

export default function ChatHint() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Add click event listener to the Voiceflow chat button
    const handleChatButtonClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('[data-vfrc-button]')) {
        setIsVisible(false);
      }
    };

    document.addEventListener('click', handleChatButtonClick);

    return () => {
      document.removeEventListener('click', handleChatButtonClick);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
          }
        }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed bottom-[80px] right-4 z-50"
        onClick={() => setIsVisible(false)}
      >
        <div className="bg-white dark:bg-[#1C2732] rounded-lg shadow-lg p-2.5 flex items-center gap-2 border border-gray-100 dark:border-gray-700 w-[200px] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#243447] transition-colors">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <MessageCircleQuestion className="w-4 h-4 text-[#FF6A00] flex-shrink-0" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: {
                delay: 0.2,
                duration: 0.5
              }
            }}
            className="text-sm font-medium text-gray-700 dark:text-gray-200 leading-tight"
          >
            Chat con Asistente Virtual
          </motion.p>
        </div>
        <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white dark:bg-[#1C2732] transform rotate-45 border-r border-b border-gray-100 dark:border-gray-700" />
      </motion.div>
    </AnimatePresence>
  );
}