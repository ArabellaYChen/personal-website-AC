import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMusic, FaLeaf, FaChartLine, FaHeart } from 'react-icons/fa';
import MusicNotes from './MusicNotes';

function Interests({ darkMode }) {
  const [activeTab, setActiveTab] = useState('music');
  const [playingMusic, setPlayingMusic] = useState(false);
  const [hoverItem, setHoverItem] = useState(null);
  
  // Music by 杨千嬅 (Miriam Yeung)
  const favoriteSongs = [
    { name: '翅膀下的风', year: 2012, description: '原来盛世也许只不过水影镜花' },
    { name: '野孩子', year: 2001, description: 'A beautiful song about freedom and wildness of youth.' },
    { name: '勇', year: 2002, description: '望著是萬馬 千軍都直衝。' },
    { name: '火鸟', year: 2012, description: '火花擦随后更加丰盛' }
  ];
  
  // Nature spots
  const natureSpots = [
    { 
      name: 'Torrey Pines State Natural Reserve', 
      location: 'San Diego, CA',
      description: 'Beautiful coastal state park with hiking trails and stunning ocean views.'
    },
    { 
      name: 'West Lake', 
      location: 'Hangzhou, China',
      description: 'Famous garden lake surrounded by mountains, temples, and pagodas.'
    },
    { 
      name: 'Jiankou Great Wall',
      location: 'Beijing, China',
      description: 'One of the most beautiful and wild sections of the Great Wall.' 
    },
    { 
      name: 'La Jolla Cove', 
      location: 'San Diego, CA',
      description: 'Picturesque cove with sea caves and marine life.'
    }
  ];

  // Food spots - based on her foodie Instagram
  const foodSpots = [
    { name: 'Dim Sum', type: 'Chinese cuisine', favorite: 'Har gow (shrimp dumplings)' },
    { name: 'Bubble Tea', type: 'Taiwanese drink', favorite: 'Brown sugar milk tea with pearls' },
    { name: 'Sushi', type: 'Japanese cuisine', favorite: 'Salmon nigiri and dragon rolls' },
    { name: 'Desserts', type: 'Sweet treats', favorite: 'Tiramisu and mango pudding' }
  ];

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
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 20px rgba(0,0,0,0.15)",
      transition: { type: "spring", stiffness: 300, damping: 10 }
    }
  };
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`rounded-lg p-8 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      <motion.h2 
        className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-purple-400' : 'text-purple-800'}`}
        whileHover={{ scale: 1.05, originX: 0 }}
      >
        Personal Interests
      </motion.h2>
      
      {/* Interest tabs */}
      <div className="flex flex-wrap justify-center mb-8 gap-3">
        <InterestTab 
          icon={<FaMusic />} 
          name="Music" 
          active={activeTab === 'music'} 
          onClick={() => setActiveTab('music')} 
          darkMode={darkMode} 
        />
        <InterestTab 
          icon={<FaLeaf />} 
          name="Nature" 
          active={activeTab === 'nature'} 
          onClick={() => setActiveTab('nature')} 
          darkMode={darkMode} 
        />
        <InterestTab 
          icon={<FaHeart />} 
          name="Food" 
          active={activeTab === 'food'} 
          onClick={() => setActiveTab('food')} 
          darkMode={darkMode} 
        />
        <InterestTab 
          icon={<FaChartLine />} 
          name="Quant Finance" 
          active={activeTab === 'finance'} 
          onClick={() => setActiveTab('finance')} 
          darkMode={darkMode} 
        />
      </div>
      
      <AnimatePresence mode="wait">
        {activeTab === 'music' && (
          <motion.div
            key="music"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="mb-6 relative">
              <h3 className={`text-xl font-medium mb-3 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                Favorite Artist: 杨千嬅 (Miriam Yeung)
              </h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                One of my favorite artists is 杨千嬅 (Miriam Yeung), a Hong Kong singer and actress known for her beautiful voice and emotional ballads. 
                Her music combines pop elements with deep emotional storytelling that resonates with me.
              </p>
              
              {/* Play music button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPlayingMusic(!playingMusic)}
                className={`mt-3 px-4 py-2 rounded-full flex items-center space-x-2 ${
                  darkMode 
                    ? (playingMusic ? 'bg-purple-600 text-white' : 'bg-gray-700 text-purple-300 hover:bg-gray-600') 
                    : (playingMusic ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800 hover:bg-purple-200')
                }`}
              >
                <span>{playingMusic ? "Pause Music" : "Play Music"}</span>
                <span>{playingMusic ? "🎵" : "▶️"}</span>
              </motion.button>
              
              {/* Floating music notes */}
              <MusicNotes isPlaying={playingMusic} position="top-right" darkMode={darkMode} />
            </div>

            <div>
              <h4 className={`font-medium mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Favorite Songs
              </h4>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {favoriteSongs.map((song, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    whileHover="hover"
                    onMouseEnter={() => setHoverItem(`song-${index}`)}
                    onMouseLeave={() => setHoverItem(null)}
                    className={`p-4 rounded-lg border relative overflow-hidden ${
                      darkMode ? 'border-gray-700 bg-gray-700' : 'border-purple-100 bg-purple-50'
                    } transition-colors duration-300`}
                  >
                    <h5 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-purple-800'}`}>
                      {song.name}
                    </h5>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Year: {song.year}
                    </p>
                    <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {song.description}
                    </p>
                    
                    {/* Music emoji that shows when hovering */}
                    {hoverItem === `song-${index}` && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                        className="absolute top-3 right-3 text-xl"
                      >
                        🎵
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
              <motion.div 
                className={`mt-6 p-4 rounded-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}
                whileHover={{ scale: 1.02 }}
              >
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  "Music is the emotional diary of my life, with Miriam Yeung's songs marking many important memories."
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'nature' && (
          <motion.div
            key="nature"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="mb-6">
              <h3 className={`text-xl font-medium mb-3 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                My Nature Escapes
              </h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                I find peace and rejuvenation in natural spaces. Whether hiking through mountains, strolling alongside lakes, 
                or simply sitting under trees with a good book, nature provides me with perspective and inspiration.
              </p>
            </div>
            
            <div>
              <h4 className={`font-medium mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Favorite Natural Spots
              </h4>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {natureSpots.map((spot, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    whileHover="hover"
                    onMouseEnter={() => setHoverItem(`nature-${index}`)}
                    onMouseLeave={() => setHoverItem(null)}
                    className={`p-4 rounded-lg border relative ${
                      darkMode ? 'border-gray-700 bg-gray-700' : 'border-green-100 bg-green-50'
                    } transition-colors duration-300`}
                  >
                    <h5 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-green-800'}`}>
                      {spot.name}
                    </h5>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {spot.location}
                    </p>
                    <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {spot.description}
                    </p>
                    
                    {/* Leaf emoji that shows when hovering */}
                    {hoverItem === `nature-${index}` && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, rotate: [0, 20, -20, 0] }}
                        transition={{ duration: 0.5 }}
                        className="absolute top-3 right-3 text-xl"
                      >
                        🍃
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className={`mt-6 p-4 rounded-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}
                whileHover={{ scale: 1.02 }}
              >
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  "The mountains are calling and I must go." — John Muir
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'food' && (
          <motion.div
            key="food"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="mb-6">
              <h3 className={`text-xl font-medium mb-3 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                Culinary Adventures
              </h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Food is more than sustenance—it's a journey through cultures and traditions. 
                I love exploring new restaurants, cooking traditional Chinese dishes, and sharing meals with friends and family.
              </p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {foodSpots.map((food, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover="hover"
                  onMouseEnter={() => setHoverItem(`food-${index}`)}
                  onMouseLeave={() => setHoverItem(null)}
                  className={`p-4 rounded-lg border relative ${
                    darkMode ? 'border-gray-700 bg-gray-700' : 'border-orange-100 bg-orange-50'
                  } transition-colors duration-300`}
                >
                  <h5 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-orange-800'}`}>
                    {food.name}
                  </h5>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {food.type}
                  </p>
                  <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Favorite: {food.favorite}
                  </p>
                  
                  {/* Food emoji that shows when hovering */}
                  {hoverItem === `food-${index}` && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1, rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="absolute top-3 right-3 text-xl"
                    >
                      {index === 0 ? '🥟' : index === 1 ? '🧋' : index === 2 ? '🍣' : '🍰'}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-orange-50 text-gray-700'}`}
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-center">
                "One cannot think well, love well, sleep well, if one has not dined well." — Virginia Woolf
              </p>
            </motion.div>
          </motion.div>
        )}
        
        {activeTab === 'finance' && (
          <motion.div
            key="finance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="mb-6">
              <h3 className={`text-xl font-medium mb-3 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                Quantitative Finance
              </h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                My academic interests in economics and computer science culminate in my passion for quantitative finance. 
                I'm fascinated by using data-driven approaches to understand financial markets and develop trading strategies.
              </p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                variants={itemVariants}
                whileHover="hover"
                className={`p-5 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}
              >
                <h4 className={`font-medium mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  Areas of Interest
                </h4>
                <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >Algorithmic trading strategies</motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >Statistical arbitrage</motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >Market microstructure</motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >Factor investing</motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >Machine learning in finance</motion.li>
                </ul>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover="hover"
                className={`p-5 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}
              >
                <h4 className={`font-medium mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  Books & Resources I Love
                </h4>
                <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >Advances in Financial Machine Learning</motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >Options, Futures, and Other Derivatives</motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >Python for Finance</motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >The Journal of Portfolio Management</motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >NBER Research Papers</motion.li>
                </ul>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className={`mt-6 p-4 rounded-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}
              whileHover={{ scale: 1.02 }}
            >
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                "In the world of finance, the most valuable commodity I know of is information." — Gordon Gekko, Wall Street
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

// Interest tab component with enhanced animations
function InterestTab({ icon, name, active, onClick, darkMode }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        flex items-center space-x-2 px-4 py-2 rounded-lg shadow transition-all
        ${active 
          ? (darkMode ? 'bg-purple-600 text-white' : 'bg-purple-600 text-white') 
          : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-purple-100')}
      `}
    >
      <motion.span
        animate={active ? {
          rotate: [0, -10, 10, -10, 0],
          scale: [1, 1.2, 1],
        } : {}}
        transition={active ? { duration: 0.5 } : {}}
      >
        {icon}
      </motion.span>
      <span>{name}</span>
      {active && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-1 text-xs"
        >
          ✨
        </motion.span>
      )}
    </motion.button>
  );
}

export default Interests; 