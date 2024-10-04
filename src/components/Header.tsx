import React from 'react'
import { Wand2 } from 'lucide-react'
import { motion } from 'framer-motion'

const Header: React.FC = () => {
  return (
    <motion.header 
      className="bg-white shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Wand2 className="h-8 w-8 text-indigo-600 mr-2" />
          <span className="text-xl font-bold text-gray-900">AI Transcribe</span>
        </motion.div>
        <nav>
          <ul className="flex space-x-6">
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </motion.li>
          </ul>
        </nav>
      </div>
    </motion.header>
  )
}

export default Header