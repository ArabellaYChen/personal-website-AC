import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorPet = ({ darkMode }) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Add spring physics for smoother following
  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });

  // States for pet mood/animation
  const [mood, setMood] = useState('normal'); // normal, happy, sleepy
  const [blinking, setBlinking] = useState(false);
  const [lastMoved, setLastMoved] = useState(Date.now());
  
  // Update cursor position
  useEffect(() => {
    const updateCursorPosition = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setLastMoved(Date.now());
      
      // Set to happy when moving
      if (mood === 'sleepy') {
        setMood('normal');
      }
    };

    window.addEventListener('mousemove', updateCursorPosition);
    
    // Blink occasionally
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 200);
    }, 3000);
    
    // Check if cursor hasn't moved for a while
    const sleepyInterval = setInterval(() => {
      if (Date.now() - lastMoved > 5000 && mood !== 'sleepy') {
        setMood('sleepy');
      }
    }, 1000);
    
    // When mouse clicks, make the pet happy
    const handleClick = () => {
      setMood('happy');
      setTimeout(() => setMood('normal'), 1000);
    };
    
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('click', handleClick);
      clearInterval(blinkInterval);
      clearInterval(sleepyInterval);
    };
  }, [cursorX, cursorY, mood, lastMoved]);

  // Pet variants based on mood
  const petVariants = {
    normal: {
      rotate: [0, 5, 0],
      transition: {
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 2,
      }
    },
    happy: {
      rotate: [0, -10, 10, -10, 0],
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.5
      }
    },
    sleepy: {
      rotate: [0, 0, 3],
      y: [0, 3, 0],
      transition: {
        repeat: Infinity,
        duration: 2
      }
    }
  };

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        variants={petVariants}
        animate={mood}
        className="relative"
      >
        {/* The pet character */}
        <div className={`w-12 h-12 flex items-center justify-center ${
          darkMode ? 'text-purple-300' : 'text-purple-600'
        }`}>
          <div className="relative">
            {/* Base pet shape */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
            
            {/* Eyes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex space-x-3 mt-1">
                <div className={`w-1 h-${blinking ? '0.5' : '2'} rounded-full bg-white transition-all duration-100`}></div>
                <div className={`w-1 h-${blinking ? '0.5' : '2'} rounded-full bg-white transition-all duration-100`}></div>
              </div>
            </div>
            
            {/* Mouth based on mood */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`mt-4 ${
                mood === 'happy' ? 'w-4 h-2 bg-white rounded-b-full' :
                mood === 'sleepy' ? 'w-2 h-0.5 bg-white' :
                'w-2 h-1 bg-white rounded-full'
              }`}></div>
            </div>
          </div>
        </div>
        
        {/* Speech bubble that appears when clicking */}
        {mood === 'happy' && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: -30 }}
            exit={{ opacity: 0, scale: 0 }}
            className={`absolute top-0 left-0 transform -translate-x-full -translate-y-full 
              px-3 py-1 rounded-lg ${darkMode ? 'bg-purple-700' : 'bg-purple-100'} 
              text-xs whitespace-nowrap ${darkMode ? 'text-white' : 'text-purple-800'}`}
          >
            Hello! I'm Bella's pet! 👋
          </motion.div>
        )}
        
        {mood === 'sleepy' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: -20 }}
            className="absolute -top-6 left-0 text-lg"
          >
            💤
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CursorPet; 