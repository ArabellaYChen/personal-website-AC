import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PhotoGallery = ({ darkMode }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Photos showing Arabella's personality and interests with more peaceful sunset/sunshine imagery
  const photos = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1501696461415-6bd6660c6742?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      full: "https://images.unsplash.com/photo-1501696461415-6bd6660c6742?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      caption: "Golden hour by the ocean - where peace meets inspiration"
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      full: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      caption: "Music festival sunsets - where melody meets nature's beauty"
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      full: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      caption: "Peaceful meals with friends - simple joys of life"
    },
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      full: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      caption: "Morning coffee and numbers - when finance meets sunrise"
    },
    {
      id: 5,
      thumbnail: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      full: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      caption: "Purple sunset skies - my favorite time to reconnect with nature"
    },
    {
      id: 6,
      thumbnail: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      full: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      caption: "Sunset coding sessions with a gentle breeze - pure bliss"
    }
  ];

  // Function to open the modal
  const openModal = (photo) => {
    setSelectedImage(photo);
    // Don't disable body scrolling
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`rounded-lg p-8 shadow-lg ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'}`}
    >
      <h2 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-purple-400' : 'text-purple-800'}`}>
        Moments of Peace
      </h2>
      <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Capturing beautiful moments that bring tranquility to my life - from golden sunsets to peaceful nature retreats.
      </p>
      
      {/* Photo grid with staggered animation */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {photos.map((photo, index) => (
          <motion.div 
            key={photo.id}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              rotate: index % 2 === 0 ? 2 : -2,
              y: -5
            }}
            className="cursor-pointer rounded-lg overflow-hidden relative group shadow-md"
            onClick={() => openModal(photo)}
          >
            {/* Purple gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            
            <motion.img 
              src={photo.thumbnail} 
              alt={photo.caption} 
              className="w-full h-48 object-cover transition-all duration-300"
            />
            <div className={`absolute inset-0 flex items-end justify-center p-3 bg-gradient-to-t ${
              darkMode ? 'from-black/80 to-transparent' : 'from-purple-900/60 to-transparent'
            } opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20`}>
              <p className="text-white text-sm line-clamp-2 text-center">
                {photo.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Modal for full-size image view */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-auto"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full mx-auto my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.full} 
                alt={selectedImage.caption} 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-lg font-light">{selectedImage.caption}</p>
              </div>
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-white bg-black/60 rounded-full p-3 hover:bg-black/80 transition-colors"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default PhotoGallery; 