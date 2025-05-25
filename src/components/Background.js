import React from 'react';
import { motion } from 'framer-motion';

// Nature-inspired animated background
function Background({ darkMode }) {
  // Generate random positions for decorative elements
  const generateElements = (count, type) => {
    return Array(count).fill().map((_, index) => ({
      id: `${type}-${index}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: type === 'star' ? 1 + Math.random() * 2 : 15 + Math.random() * 30,
      rotation: Math.random() * 360,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 25
    }));
  };

  const stars = darkMode ? generateElements(50, 'star') : [];
  const leaves = !darkMode ? generateElements(12, 'leaf') : [];

  return (
    <>
      {/* Stars for dark mode */}
      {darkMode &&
        stars.map(star => (
          <motion.div
            key={star.id}
            className="fixed pointer-events-none"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: 'white',
              borderRadius: '50%',
              opacity: 0
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 3,
              delay: star.delay,
              ease: 'easeInOut'
            }}
          />
        ))}

      {/* Leaves for light mode */}
      {!darkMode &&
        leaves.map(leaf => (
          <motion.div
            key={leaf.id}
            className="fixed pointer-events-none"
            style={{
              left: `${leaf.x}%`,
              top: `0%`,
              opacity: 0.2,
              zIndex: 0
            }}
            animate={{
              y: ['0%', '100%'],
              rotate: [0, 360],
              x: [`${leaf.x}%`, `${leaf.x + (Math.random() * 10 - 5)}%`]
            }}
            transition={{
              y: {
                duration: leaf.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: leaf.delay
              },
              rotate: {
                duration: leaf.duration / 2,
                repeat: Infinity,
                ease: 'linear'
              },
              x: {
                duration: leaf.duration / 4,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut'
              }
            }}
          >
            <LeafSvg size={leaf.size} color={`rgba(147, 51, 234, ${0.3 + Math.random() * 0.4})`} />
          </motion.div>
        ))}

      {/* Music notes for both modes */}
      {generateElements(6, 'note').map(note => (
        <motion.div
          key={note.id}
          className="fixed pointer-events-none"
          style={{
            right: `${note.x / 2}%`,
            bottom: `0%`,
            opacity: darkMode ? 0.3 : 0.15,
            zIndex: 0
          }}
          animate={{
            y: ['0%', '-50%'],
            x: [`0%`, `${(Math.random() * 20) - 10}%`],
            rotate: [0, note.rotation]
          }}
          transition={{
            y: {
              duration: note.duration / 2,
              repeat: Infinity,
              ease: 'easeOut',
              delay: note.delay
            },
            rotate: {
              duration: note.duration / 3,
              repeat: Infinity,
              ease: 'linear'
            },
            x: {
              duration: note.duration / 3,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut'
            }
          }}
        >
          <MusicNote
            size={note.size / 2.5}
            color={darkMode ? 'rgba(167, 139, 250, 0.3)' : 'rgba(147, 51, 234, 0.2)'}
          />
        </motion.div>
      ))}
    </>
  );
}

// SVG for leaf
function LeafSvg({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 21C6 21 10 17 10 12C10 7 6 3 6 3C6 3 2 7 2 12C2 17 6 21 6 21Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 21C18 21 22 17 22 12C22 7 18 3 18 3C18 3 14 7 14 12C14 17 18 21 18 21Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 21L12 3L18 21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// SVG for music note
function MusicNote({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 17.5V5L19 3.5V16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="17.5" r="3" stroke={color} strokeWidth="2" />
      <circle cx="16" cy="16" r="3" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export default Background;