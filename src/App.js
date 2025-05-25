import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  FaLinkedin, 
  FaGithub, 
  FaEnvelope, 
  FaFileDownload, 
  FaChartLine, 
  FaCode, 
  FaGraduationCap, 
  FaBriefcase,
  FaUser,
  FaMoon,
  FaSun,
  FaPhone,
  FaHeart,
  FaPhoneAlt
} from "react-icons/fa";
import Contact from "./components/Contact";
import Interests from "./components/Interests";
import CursorPet from "./components/CursorPet";
import InteractiveBackground from "./components/InteractiveBackground";
import PhotoGallery from "./components/PhotoGallery";

export default function Portfolio() {
  const [section, setSection] = useState("about");
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [typedText, setTypedText] = useState("Aspiring Financial Analyst");
  const [typedIndex, setTypedIndex] = useState(0);
  const [bounce, setBounce] = useState(false);
  const [showPet, setShowPet] = useState(true);
  const [showContact, setShowContact] = useState(false);

  const typedStrings = [
    'Aspiring Financial Analyst',
    'Quantitative Finance Enthusiast',
    'Music & Nature Lover',
    'Data Science Explorer'
  ];

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Handle scroll for back-to-top button
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Auto-scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [section]);

  // Typing effect logic
  useEffect(() => {
    const typingInterval = setInterval(() => {
      setTypedIndex((prevIndex) => (prevIndex + 1) % typedStrings.length);
    }, 3000);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    setTypedText(typedStrings[typedIndex]);
  }, [typedIndex]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  const loaderVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Floating leaf animation
  const floatingLeaves = Array(8).fill().map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 30
  }));

  // If loading, show loading animation
  if (isLoading) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-white via-purple-50 to-purple-100'}`}>
        <motion.div
          variants={loaderVariants}
          animate="animate"
          className={`w-20 h-20 rounded-full ${darkMode ? 'bg-purple-600' : 'bg-purple-600'}`}
        />
        <h2 className="text-xl mt-4 font-semibold">Loading Portfolio...</h2>
      </div>
    );
  }

  return (
    <div className={`transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50 text-gray-800'} min-h-screen relative overflow-hidden`}>
      {/* Interactive Background */}
      <InteractiveBackground darkMode={darkMode} />
      
      {/* Cursor Pet */}
      {showPet && <CursorPet darkMode={darkMode} />}

      {/* Main content */}
      <div className="relative z-10">
        {/* Top navigation bar */}
        <div className={`fixed top-0 left-0 right-0 px-6 py-4 flex justify-between items-center z-30 ${darkMode ? 'bg-gray-900/80 backdrop-blur-sm' : 'bg-white/70 backdrop-blur-sm'}`}>
          <h3 className={`font-bold text-xl ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
            Arabella Chen
          </h3>
          <div className="flex items-center space-x-2">
            <motion.button 
              onClick={toggleDarkMode} 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-purple-100 text-orange-500'} shadow-md`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </motion.button>

            <motion.button 
              onClick={() => setShowPet(!showPet)} 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-purple-300' : 'bg-purple-100 text-gray-700'} shadow-md`}
              aria-label="Toggle pet"
            >
              {showPet ? "🐱" : "🔍"}
            </motion.button>

            <motion.button
              onClick={() => setShowContact(!showContact)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-purple-300' : 'bg-purple-100 text-gray-700'} shadow-md`}
            >
              <FaEnvelope size={18} />
            </motion.button>
          </div>
        </div>

        {/* Floating contact form */}
        <AnimatePresence>
          {showContact && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed right-4 top-20 z-40 w-80"
            >
              <div className={`rounded-lg shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`p-4 ${darkMode ? 'bg-purple-700' : 'bg-purple-500'} text-white flex justify-between items-center`}>
                  <h4 className="font-medium">Contact Me</h4>
                  <button onClick={() => setShowContact(false)} className="text-white p-1">
                    ✕
                  </button>
                </div>
                <div className="p-4">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-3">
                      <FaEnvelope className={darkMode ? 'text-purple-400' : 'text-purple-600'} />
                      <a href="mailto:yintao@example.com" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-purple-700'}`}>
                        yintao@example.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaPhoneAlt className={darkMode ? 'text-purple-400' : 'text-purple-600'} />
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        (123) 456-7890
                      </span>
                    </div>
                  </div>
                  <form className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className={`w-full px-3 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className={`w-full px-3 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                    <textarea 
                      placeholder="Your Message" 
                      rows="3"
                      className={`w-full px-3 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    ></textarea>
                    <button 
                      type="button"
                      className="w-full px-4 py-2 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button 
            onClick={scrollToTop}
            className={`fixed bottom-4 right-4 p-3 rounded-full ${darkMode ? 'bg-purple-600' : 'bg-purple-600'} text-white shadow-lg z-50`}
            aria-label="Scroll to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}

        <div className="p-6 max-w-6xl mx-auto font-sans pt-24">
          <header className="text-center mb-12">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative inline-block cursor-pointer" onClick={() => setBounce(true)}>
                <motion.img
                  src="https://i.imgur.com/Fkpz5Pe.png"
                  alt="Arabella Chen Profile"
                  className={`w-40 h-40 mx-auto rounded-full ${darkMode ? 'border-4 border-purple-500' : 'shadow-xl'}`}
                  animate={bounce ? {
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={bounce ? {
                    duration: 0.5,
                    onComplete: () => setBounce(false)
                  } : {}}
                />
                <motion.div 
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.05, 1] 
                  }}
                  transition={{ 
                    rotate: { repeat: Infinity, duration: 20 },
                    scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                  }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-purple-400 -m-1"
                  style={{ borderRadius: "9999px" }}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className={`text-5xl font-bold mt-6 ${darkMode ? 'text-white' : 'text-purple-700'}`}>
                Yintao (Arabella) Chen
              </h1>
              <div className="h-8 mt-2 relative">
                <motion.p
                  key={typedText}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`text-xl ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}
                >
                  {typedText}
                </motion.p>
              </div>
              <p className={`text-xl mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                UC San Diego
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center space-x-4 mt-4">
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://linkedin.com/in/arabella-chen-43b513211/" 
                  target="_blank" 
                  rel="noreferrer"
                  className={`p-3 rounded-full ${darkMode ? 'bg-gray-800 text-blue-400 hover:bg-gray-700' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
                >
                  <FaLinkedin size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://github.com/" 
                  target="_blank" 
                  rel="noreferrer"
                  className={`p-3 rounded-full ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <FaGithub size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  href="mailto:yintao@example.com"
                  className={`p-3 rounded-full ${darkMode ? 'bg-gray-800 text-red-400 hover:bg-gray-700' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
                >
                  <FaEnvelope size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  href="/resume.pdf"
                  download
                  className={`p-3 rounded-full ${darkMode ? 'bg-gray-800 text-green-400 hover:bg-gray-700' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
                >
                  <FaFileDownload size={20} />
                </motion.a>
              </div>
            </motion.div>
          </header>

          {/* Simplified Navigation Menu - fewer sections */}
          <nav className="flex flex-wrap justify-center gap-3 mb-12">
            <NavButton icon={<FaUser />} onClick={() => setSection("about")} active={section === "about"} darkMode={darkMode}>About</NavButton>
            <NavButton icon={<FaBriefcase />} onClick={() => setSection("experience")} active={section === "experience"} darkMode={darkMode}>Experience & Skills</NavButton>
            <NavButton icon={<FaCode />} onClick={() => setSection("projects")} active={section === "projects"} darkMode={darkMode}>Projects & Education</NavButton>
            <NavButton icon={<FaHeart />} onClick={() => setSection("interests")} active={section === "interests"} darkMode={darkMode}>Interests</NavButton>
          </nav>

          {/* Main content sections */}
          <AnimatePresence mode="wait">
            {section === "about" && (
              <motion.div
                key="about"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                {/* About section */}
                <motion.section
                  className={`rounded-lg p-8 shadow-lg mb-8 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm`}
                >
                  <h2 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-purple-400' : 'text-purple-800'}`}>About Me</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        I'm Arabella Chen, a Business Economics and Computer Science student at UC San Diego. I'm passionate about combining data analysis with financial knowledge to solve complex business problems.
                      </p>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        As an aspiring analyst, I excel at using programming and statistical tools for data mining and financial modeling. My goal is to build a career in fintech, combining technological innovation with financial analysis.
                      </p>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        Beyond my academic pursuits, I have diverse interests including Chinese pop music (especially 杨千嬅's songs), exploring nature, and discovering delicious food. I believe in balancing analytical thinking with creative expression.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className={`text-xl font-medium ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>Chinese Version (中文版本)</h3>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        我是陈胤陶（Arabella），一名来自加州大学圣地亚哥分校的商业经济学与计算机科学专业的学生。我热衷于将数据分析与金融知识相结合，解决复杂的商业问题。
                      </p>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        作为一名有抱负的分析师，我擅长使用编程和统计工具进行数据挖掘和财务建模。我的目标是在金融科技领域建立职业生涯，将技术创新与金融分析相结合。
                      </p>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        除了学术追求，我还有多种兴趣，包括中文流行音乐（特别是杨千嬅的歌曲）、探索自然和发现美食。我相信平衡分析思维和创意表达的重要性。
                      </p>
                    </div>
                  </div>
                </motion.section>

                {/* Gallery embedded in About section */}
                <PhotoGallery darkMode={darkMode} />
              </motion.div>
            )}
            
            {section === "experience" && (
              <motion.div
                key="experience"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                {/* Experience section */}
                <motion.section
                  className={`rounded-lg p-8 shadow-lg mb-8 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm`}
                >
                  <h2 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-purple-400' : 'text-purple-800'}`}>Professional Experience</h2>
                  
                  <div className="space-y-8">
                    <ExperienceCard
                      title="Audit Intern"
                      company="Deloitte"
                      location="Beijing, China"
                      period="August 2024 – September 2024"
                      responsibilities={[
                        "Validated financial statements and tested internal controls for compliance with GAAP standards",
                        "Participated in risk assessment processes for multinational clients",
                        "Assisted senior auditors with documentation and evidence collection",
                        "Ensured compliance with regulatory requirements and supported comprehensive audit reviews"
                      ]}
                      darkMode={darkMode}
                    />
                    
                    <ExperienceCard
                      title="Data Analyst Intern"
                      company="Keller Williams Realty"
                      location="San Diego, CA"
                      period="June 2024 – August 2024"
                      responsibilities={[
                        "Built predictive pricing models using Python and historical real estate data",
                        "Developed automated dashboards for sales team performance tracking",
                        "Analyzed market trends to identify potential investment opportunities",
                        "Collaborated with real estate agents to optimize lead generation strategies"
                      ]}
                      darkMode={darkMode}
                    />
                    
                    <ExperienceCard
                      title="Data Analyst Intern"
                      company="Guotai Junan Securities"
                      location="Shanghai, China"
                      period="July 2023 – September 2023"
                      responsibilities={[
                        "Analyzed L2 market data to identify trading patterns and anomalies",
                        "Collaborated with traders to enhance quantitative trading strategies",
                        "Created visualization tools to track market microstructure metrics",
                        "Developed backtesting frameworks for algorithmic trading models"
                      ]}
                      darkMode={darkMode}
                    />
                  </div>
                </motion.section>

                {/* Skills section now combined with Experience */}
                <motion.section
                  className={`rounded-lg p-8 shadow-lg ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm`}
                >
                  <h2 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-purple-400' : 'text-purple-800'}`}>Skills</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className={`text-xl font-medium mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>Technical Skills</h3>
                      
                      <div className="space-y-4">
                        <SkillBar name="Python" percentage={85} darkMode={darkMode} />
                        <SkillBar name="SQL" percentage={80} darkMode={darkMode} />
                        <SkillBar name="Java" percentage={70} darkMode={darkMode} />
                        <SkillBar name="Excel (Advanced)" percentage={90} darkMode={darkMode} />
                        <SkillBar name="C" percentage={65} darkMode={darkMode} />
                        <SkillBar name="Stata" percentage={75} darkMode={darkMode} />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className={`text-xl font-medium mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>Other Skills</h3>
                      
                      <div className="space-y-3">
                        <SkillCategory 
                          title="Financial Analysis" 
                          skills={["Forecasting", "Variance analysis", "Regression modeling", "Risk assessment"]} 
                          darkMode={darkMode} 
                        />
                        
                        <SkillCategory 
                          title="Tools" 
                          skills={["Git", "ERP platforms", "Dashboarding tools", "Jupyter Notebook"]} 
                          darkMode={darkMode} 
                        />
                        
                        <SkillCategory 
                          title="Soft Skills" 
                          skills={["Analytical thinking", "Communication", "Leadership", "Problem-solving"]} 
                          darkMode={darkMode} 
                        />
                        
                        <SkillCategory 
                          title="Languages" 
                          skills={["English (Fluent)", "Mandarin (Native)", "Cantonese (Native)", "French (Intermediate)"]} 
                          darkMode={darkMode} 
                        />
                      </div>
                    </div>
                  </div>
                </motion.section>
              </motion.div>
            )}

            {section === "projects" && (
              <motion.div
                key="projects"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                {/* Projects section */}
                <motion.section
                  className={`rounded-lg p-8 shadow-lg mb-8 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm`}
                >
                  <h2 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-purple-400' : 'text-purple-800'}`}>Projects</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <ProjectCard
                      title="Financial Forecasting Tool"
                      description="Developed a Python-based tool for simulating various revenue and labor cost scenarios using Monte Carlo methods"
                      tags={["Python", "Pandas", "NumPy", "Financial Modeling"]}
                      darkMode={darkMode}
                    />
                    
                    <ProjectCard
                      title="Cryptocurrency Factor Model"
                      description="Created a multi-factor model for cryptocurrency investments achieving a Sharpe ratio of 2.8 in backtesting"
                      tags={["Python", "Machine Learning", "Time Series Analysis", "Crypto"]}
                      darkMode={darkMode}
                    />
                    
                    <ProjectCard
                      title="Unix Shell Implementation"
                      description="Built a functional Unix shell in C with job control and memory validation capabilities"
                      tags={["C", "Systems Programming", "Unix", "Memory Management"]}
                      darkMode={darkMode}
                    />
                    
                    <ProjectCard
                      title="Stock Market Sentiment Analyzer"
                      description="Developed an NLP model to analyze social media sentiment and predict stock price movements"
                      tags={["Python", "NLP", "Machine Learning", "Financial Analysis"]}
                      darkMode={darkMode}
                    />
                  </div>
                </motion.section>

                {/* Education section now within Projects */}
                <motion.section
                  className={`rounded-lg p-8 shadow-lg ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm`}
                >
                  <h2 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-purple-400' : 'text-purple-800'}`}>Education</h2>
                  
                  <div className={`p-6 border rounded-lg ${darkMode ? 'border-gray-700 bg-gray-700/80' : 'border-purple-100 bg-purple-50/80'}`}>
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <div>
                        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-purple-800'}`}>University of California, San Diego</h3>
                        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>B.S. in Business Economics & Mathematics-Computer-Science</p>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Minor in Finance</p>
                      </div>
                      <div className="mt-2 md:mt-0 text-right">
                        <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Graduation: June 2026</p>
                        <p className={`font-medium ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>GPA: 3.87/4.0</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className={`font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Notable Coursework:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <CourseTag name="Data Structures & Algorithms" darkMode={darkMode} />
                        <CourseTag name="Econometrics" darkMode={darkMode} />
                        <CourseTag name="Financial Accounting" darkMode={darkMode} />
                        <CourseTag name="Statistical Methods" darkMode={darkMode} />
                        <CourseTag name="Machine Learning" darkMode={darkMode} />
                        <CourseTag name="Financial Markets" darkMode={darkMode} />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className={`font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Activities & Societies:</h4>
                      <ul className={`list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>Triton Finance Club - Vice President</li>
                        <li>Data Science Student Society - Member</li>
                        <li>Women in Business - Member</li>
                        <li>Chinese Student Association - Cultural Events Coordinator</li>
                      </ul>
                    </div>
                  </div>
                </motion.section>
              </motion.div>
            )}

            {section === "interests" && (
              <Interests darkMode={darkMode} />
            )}
          </AnimatePresence>
        
          <footer className={`mt-12 pt-8 pb-6 text-center border-t ${darkMode ? 'border-gray-700 text-gray-400' : 'border-purple-200 text-gray-600'}`}>
            <p>© {new Date().getFullYear()} Yintao (Arabella) Chen. All rights reserved.</p>
            <p className="mt-2 text-sm">Made with React, Tailwind CSS, and Framer Motion</p>
            <div className="mt-3 flex justify-center space-x-3">
              <motion.span 
                whileHover={{ scale: 1.2 }} 
                className="cursor-pointer"
                aria-label="Sparkle"
                role="img"
              >
                ✨
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.2 }} 
                className="cursor-pointer"
                aria-label="Music"
                role="img"
              >
                🎵
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.2 }} 
                className="cursor-pointer"
                aria-label="Nature"
                role="img"
              >
                🍃
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.2 }} 
                className="cursor-pointer"
                aria-label="Food"
                role="img"
              >
                🍜
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.2 }} 
                className="cursor-pointer"
                aria-label="Charts"
                role="img"
              >
                📊
              </motion.span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

// Enhanced ProjectCard component with prettier design
function ProjectCard({ title, description, tags, darkMode }) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className={`p-6 rounded-lg border ${
        darkMode ? 'border-gray-700 bg-gray-700/80' : 'border-purple-100 bg-white/80'
      } h-full flex flex-col shadow-md backdrop-blur-sm`}
    >
      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-purple-800'}`}>
        {title}
      </h3>
      
      <p className={`mb-4 flex-grow ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-auto pt-3">
        {tags.map((tag, index) => (
          <motion.span 
            key={index}
            whileHover={{ scale: 1.1 }}
            className={`px-2 py-1 rounded text-xs font-medium ${
              darkMode ? 'bg-gray-800 text-purple-400' : 'bg-purple-100 text-purple-800'
            }`}
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// Enhanced NavButton component with more interactive animations
function NavButton({ children, icon, onClick, active, darkMode }) {
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
      <span>{children}</span>
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

// Component for skill bars
function SkillBar({ name, percentage, darkMode }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{name}</span>
        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{percentage}%</span>
      </div>
      <div className={`h-2.5 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.3 }}
          className={`h-2.5 rounded-full ${darkMode ? 'bg-purple-500' : 'bg-purple-600'}`}
        />
      </div>
    </div>
  );
}

// Component for skill categories
function SkillCategory({ title, skills, darkMode }) {
  return (
    <div>
      <h4 className={`font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{title}:</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span 
            key={index}
            className={`px-3 py-1 rounded-full text-sm ${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-purple-100 text-purple-800'
            }`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// Component for experience cards
function ExperienceCard({ title, company, location, period, responsibilities, darkMode }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`p-6 rounded-lg border ${
        darkMode ? 'border-gray-700 bg-gray-700' : 'border-purple-100 bg-purple-50'
      }`}
    >
      <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-purple-800'}`}>
        {title}, {company}
      </h3>
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {location} | {period}
      </p>
      
      <ul className={`mt-4 space-y-2 list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {responsibilities.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
}

// Component for course tags
function CourseTag({ name, darkMode }) {
  return (
    <span 
      className={`inline-block px-3 py-1 rounded-full text-sm ${
        darkMode ? 'bg-gray-800 text-purple-400' : 'bg-purple-100 text-purple-800'
      }`}
    >
      {name}
    </span>
  );
}
