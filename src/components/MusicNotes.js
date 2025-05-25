import React from 'react';
import { motion } from 'framer-motion';

const MusicNotes = ({ isPlaying = false, position = "top-right", darkMode = false }) => {
  // Only render notes if isPlaying is true
  if (!isPlaying) return null;

  // Generate random notes
  const notes = Array(5).fill().map((_, i) => ({
    id: i,
    x: Math.random() * 40 - 20, // random offset
    delay: i * 0.2,
    scale: 0.7 + Math.random() * 0.5,
    rotate: -30 + Math.random() * 60,
  }));

  // Position classes
  const positionClasses = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  };

  return (
    <div className={`absolute ${positionClasses[position]} pointer-events-none`}>
      {notes.map(note => (
        <motion.div
          key={note.id}
          initial={{ opacity: 0, y: 0, x: note.x, scale: note.scale, rotate: note.rotate }}
          animate={{ 
            opacity: [0, 1, 0],
            y: [-5, -60],
            rotate: [note.rotate, note.rotate + (Math.random() > 0.5 ? 20 : -20)]
          }}
          transition={{ 
            duration: 2, 
            ease: "easeOut",
            delay: note.delay,
            times: [0, 0.2, 1]
          }}
          className={`absolute ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}
        >
          {/* Randomly choose a music note emoji */}
          {['♪', '♫', '♬', '♩', '♭', '♮'][Math.floor(Math.random() * 6)]}
        </motion.div>
      ))}
    </div>
  );
};

export default MusicNotes; 