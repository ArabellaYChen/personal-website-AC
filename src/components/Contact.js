import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

function Contact({ darkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus(prevStatus => ({ ...prevStatus, submitting: true }));
    
    try {
      const response = await axios.post('/api/contact', formData);
      
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: response.data.message }
      });
      
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: false, msg: null }
        });
      }, 5000);
      
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: error.response ? error.response.data.error : 'Something went wrong. Please try again later.' }
      });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`rounded-lg p-8 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      <h2 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-purple-400' : 'text-purple-800'}`}>
        Get In Touch
      </h2>
      
      {status.submitted ? (
        <div className={`p-4 mb-6 rounded-md ${darkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800'}`}>
          <p>{status.info.msg || "Thank you for your message! I'll get back to you soon."}</p>
        </div>
      ) : status.info.error ? (
        <div className={`p-4 mb-6 rounded-md ${darkMode ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-800'}`}>
          <p>{status.info.msg}</p>
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="name" 
            className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${
              darkMode 
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-500' 
                : 'bg-gray-50 text-gray-900 border border-gray-300 focus:ring-purple-600'
            }`}
          />
        </div>
        
        <div>
          <label 
            htmlFor="email" 
            className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${
              darkMode 
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-500' 
                : 'bg-gray-50 text-gray-900 border border-gray-300 focus:ring-purple-600'
            }`}
          />
        </div>
        
        <div>
          <label 
            htmlFor="message" 
            className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${
              darkMode 
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-500' 
                : 'bg-gray-50 text-gray-900 border border-gray-300 focus:ring-purple-600'
            }`}
          ></textarea>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={status.submitting}
          className={`w-full py-3 px-6 text-white font-medium rounded-md shadow-md ${
            darkMode 
              ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500' 
              : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-400'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`}
        >
          {status.submitting ? 'Sending...' : 'Send Message'}
        </motion.button>
      </form>
    </motion.section>
  );
}

export default Contact; 