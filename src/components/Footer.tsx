import React from 'react'
import { Wand2 } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Wand2 className="h-6 w-6 text-indigo-600 mr-2" />
            <span className="text-lg font-semibold text-gray-900">AI Transcribe</span>
          </motion.div>
          <nav>
            <ul className="flex space-x-6">
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <a href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <a href="#" className="text-gray-600 hover:text-gray-900">Contact Us</a>
              </motion.li>
            </ul>
          </nav>
        </div>
        <div className="mt-4 text-center text-gray-500">
          © 2024 AI Transcribe. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer