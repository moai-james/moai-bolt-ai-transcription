import React from 'react'
import { FileText, Clock, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import Marquee from './Marquee'

interface LandingPageProps {
  onGetStarted: () => void
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="space-y-24">
      <Hero onGetStarted={onGetStarted} />
      <Marquee className="py-12 bg-gray-100">
        <div className="flex space-x-12">
          {['Accurate', 'Fast', 'Secure', 'Multilingual', 'Affordable', 'Scalable'].map((word) => (
            <span key={word} className="text-4xl font-bold text-gray-800">{word}</span>
          ))}
        </div>
      </Marquee>
      <Features />
      <Pricing />
      <CTA onGetStarted={onGetStarted} />
    </div>
  )
}

const Hero: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
    <motion.h1 
      className="text-6xl font-extrabold text-gray-900 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Transform Your Audio<br />with AI Magic
    </motion.h1>
    <motion.p 
      className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      Experience lightning-fast, incredibly accurate transcriptions powered by cutting-edge AI technology.
    </motion.p>
    <motion.button
      onClick={onGetStarted}
      className="px-8 py-3 text-lg font-semibold text-white bg-black rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Get Started Free
    </motion.button>
  </section>
)

const Features: React.FC = () => (
  <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Magical Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <FeatureCard
        icon={<FileText className="w-12 h-12 text-indigo-600" />}
        title="Multiple File Formats"
        description="Support for various audio and video file formats, making transcription a breeze."
      />
      <FeatureCard
        icon={<Clock className="w-12 h-12 text-indigo-600" />}
        title="Lightning Fast"
        description="Get your transcriptions in minutes, not hours. Time is on your side with AI Transcribe."
      />
      <FeatureCard
        icon={<Globe className="w-12 h-12 text-indigo-600" />}
        title="Global Language Support"
        description="Transcribe content in over 30 languages, breaking down language barriers effortlessly."
      />
    </div>
  </section>
)

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <motion.div 
    className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

const Pricing: React.FC = () => (
  <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Choose Your Magic Plan</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <PricingCard
        title="Starter"
        description="For those dipping their toes"
        price="$9.99"
        features={[
          "Up to 10 hours of audio",
          "Standard accuracy",
          "Email support"
        ]}
        buttonText="Choose Starter"
      />
      <PricingCard
        title="Pro"
        description="For the serious magicians"
        price="$24.99"
        features={[
          "Up to 50 hours of audio",
          "High accuracy",
          "Priority email support"
        ]}
        buttonText="Choose Pro"
        popular
      />
      <PricingCard
        title="Enterprise"
        description="For transcription wizards"
        price="Custom"
        features={[
          "Unlimited audio",
          "Highest accuracy",
          "24/7 phone & email support"
        ]}
        buttonText="Contact Sales"
      />
    </div>
  </section>
)

const PricingCard: React.FC<{ title: string; description: string; price: string; features: string[]; buttonText: string; popular?: boolean }> = ({ title, description, price, features, buttonText, popular }) => (
  <motion.div 
    className={`bg-white p-8 rounded-lg shadow-lg ${popular ? 'ring-2 ring-indigo-600' : ''}`}
    whileHover={{ y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {popular && <span className="text-sm font-semibold text-indigo-600 uppercase mb-2 block">Popular</span>}
    <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <p className="text-4xl font-bold text-gray-900 mb-6">{price} <span className="text-lg font-normal text-gray-600">{price !== 'Custom' && 'per month'}</span></p>
    <ul className="mb-8 space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          {feature}
        </li>
      ))}
    </ul>
    <motion.button 
      className={`w-full py-2 px-4 rounded-full font-semibold ${popular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'} transition-colors duration-300`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {buttonText}
    </motion.button>
  </motion.div>
)

const CTA: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
    <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Experience the Magic?</h2>
    <p className="text-xl text-gray-600 mb-8">Join thousands of satisfied users and start transcribing with AI today.</p>
    <div className="max-w-md mx-auto">
      <div className="flex">
        <input type="email" placeholder="Enter your email" className="flex-grow px-4 py-2 rounded-l-full border-2 border-r-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent" />
        <motion.button 
          onClick={onGetStarted} 
          className="px-6 py-2 rounded-r-full bg-black text-white font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </div>
      <p className="mt-2 text-sm text-gray-500">Start your free trial. No credit card required.</p>
    </div>
  </section>
)

export default LandingPage