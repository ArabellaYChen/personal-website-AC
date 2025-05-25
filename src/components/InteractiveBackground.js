import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const InteractiveBackground = ({ darkMode }) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    // Get window dimensions
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    // Set initial window size
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Generate background elements
  const generateRandomAnimations = (count, type) => {
    return Array(count).fill().map((_, i) => {
      // Random positions and sizes
      const size = type === 'bubble' ? 10 + Math.random() * 80 : 
                type === 'star' ? 1 + Math.random() * 3 :
                type === 'cloud' ? 60 + Math.random() * 80 :
                4 + Math.random() * 6;
      
      // Random animation values
      const initialX = Math.random() * 100; // percentage across screen
      const initialY = Math.random() * 100; // percentage down screen
      
      // Different properties for different element types
      const opacityBase = type === 'cloud' ? 0.08 + Math.random() * 0.1 : 
                       type === 'star' ? 0.2 + Math.random() * 0.3 : 
                       0.2 + Math.random() * 0.1;
      
      const durationMultiplier = type === 'cloud' ? 40 : 
                               type === 'star' ? 8 : 
                               type === 'bubble' ? 20 : 12;
      
      return {
        id: `${type}-${i}`,
        size,
        initialX,
        initialY,
        opacityBase,
        opacityDuration: 5 + Math.random() * durationMultiplier,
        scaleDuration: 8 + Math.random() * durationMultiplier,
        moveDuration: 15 + Math.random() * durationMultiplier
      };
    });
  };
  
  // Different elements for different modes - reduced counts
  const bubbles = darkMode ? generateRandomAnimations(8, 'bubble') : [];
  const stars = darkMode ? generateRandomAnimations(30, 'star') : [];
  const clouds = !darkMode ? generateRandomAnimations(5, 'cloud') : [];
  const particles = !darkMode ? generateRandomAnimations(12, 'particle') : [];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient overlay - static, no mouse movements */}
      <div 
        className={`absolute inset-0 ${
          darkMode 
            ? 'bg-gradient-to-br from-purple-900/20 via-blue-900/15 to-black/10' 
            : 'bg-gradient-to-br from-orange-100/60 via-pink-100/40 to-blue-100/40'
        } transition-opacity duration-1000`}
      ></div>

      {/* Light mode: Sunset/sunrise gradient */}
      {/* {!darkMode && (
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-orange-200/30 via-pink-200/20 to-transparent"></div>
      )}
       */}
      {/* Dark mode: Night sky gradient */}
      {darkMode && (
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-purple-900/20 via-blue-900/10 to-transparent"></div>
      )}
      
      {/* Stars for dark mode - pulsing independently */}
      {darkMode && stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.initialX}%`,
            top: `${star.initialY}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacityBase
          }}
          animate={{
            opacity: [
              star.opacityBase, 
              star.opacityBase * 1.5, 
              star.opacityBase
            ],
            scale: [1, 1.1, 1],
          }}
          transition={{
            opacity: {
              duration: star.opacityDuration,
              repeat: Infinity,
              repeatType: "reverse"
            },
            scale: {
              duration: star.opacityDuration * 0.5,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        />
      ))}
      
      {/* Dark mode: Floating bubbles - moving independently */}
      {darkMode && bubbles.map(bubble => {
        // Random movement distances
        const moveX = -10 + Math.random() * 20;
        const moveY = -10 + Math.random() * 20;
        
        return (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full bg-purple-500/5 border border-purple-500/10"
            style={{
              left: `${bubble.initialX}%`,
              top: `${bubble.initialY}%`,
              width: bubble.size,
              height: bubble.size,
            }}
            animate={{
              x: [0, moveX, 0],
              y: [0, moveY, 0],
              scale: [1, 1.03, 1],
            }}
            transition={{
              x: { 
                duration: bubble.moveDuration, 
                ease: "easeInOut",
                repeat: Infinity 
              },
              y: { 
                duration: bubble.moveDuration * 1.2, 
                ease: "easeInOut",
                repeat: Infinity 
              },
              scale: { 
                duration: bubble.scaleDuration, 
                ease: "easeInOut",
                repeat: Infinity 
              }
            }}
          />
        );
      })}
      
      {/* Light mode: Clouds - drifting slowly */}
      {!darkMode && clouds.map(cloud => {
        return (
          <motion.div
            key={cloud.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${cloud.initialX}%`,
              top: `${cloud.initialY}%`,
              width: cloud.size,
              height: cloud.size * 0.6,
              opacity: cloud.opacityBase,
              filter: "blur(20px)"
            }}
            animate={{
              x: [0, 30, 0],
            }}
            transition={{
              x: {
                duration: cloud.moveDuration,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        );
      })}
      
      {/* Light mode: Floating particles - gentle random movement */}
      {!darkMode && particles.map(particle => {
        // Random floating motion
        const moveX = -15 + Math.random() * 30;
        const moveY = -15 + Math.random() * 30;
        
        return (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${
              Math.random() > 0.5 ? 'bg-purple-400/30' : 'bg-orange-300/30'
            }`}
            style={{
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              x: [0, moveX, 0],
              y: [0, moveY, 0],
              opacity: [
                particle.opacityBase, 
                particle.opacityBase + 0.1, 
                particle.opacityBase
              ],
              rotate: [0, 360]
            }}
            transition={{
              x: { 
                duration: particle.moveDuration, 
                ease: "easeInOut",
                repeat: Infinity 
              },
              y: { 
                duration: particle.moveDuration * 1.3, 
                ease: "easeInOut", 
                repeat: Infinity 
              },
              opacity: { 
                duration: particle.opacityDuration, 
                repeat: Infinity 
              },
              rotate: { 
                duration: 40, 
                repeat: Infinity, 
                ease: "linear" 
              }
            }}
          />
        );
      })}
    </div>
  );
};

export default InteractiveBackground; 