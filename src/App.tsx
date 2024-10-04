import React, { useState } from 'react'
import LandingPage from './components/LandingPage'
import TranscriptionForm from './components/TranscriptionForm'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [showTranscriptionForm, setShowTranscriptionForm] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {showTranscriptionForm ? (
          <TranscriptionForm />
        ) : (
          <LandingPage onGetStarted={() => setShowTranscriptionForm(true)} />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App