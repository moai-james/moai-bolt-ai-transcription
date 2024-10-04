import React, { useState, useRef } from 'react'
import { Mic, Upload, FileAudio, Play, Pause } from 'lucide-react'
import { useReactMediaRecorder } from 'react-media-recorder'
import OpenAI from 'openai'
import { motion } from 'framer-motion'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

const TranscriptionForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [transcription, setTranscription] = useState('')
  const [isTranscribing, setIsTranscribing] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({ audio: true })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
    }
  }

  const handleTranscribe = async () => {
    setIsTranscribing(true)
    try {
      let audioFile: File | Blob
      if (file) {
        audioFile = file
      } else if (mediaBlobUrl) {
        const response = await fetch(mediaBlobUrl)
        const blob = await response.blob()
        audioFile = new File([blob], 'recorded_audio.webm', { type: blob.type })
      } else {
        throw new Error('No audio file available')
      }

      const formData = new FormData()
      formData.append('file', audioFile)
      formData.append('model', 'whisper-1')

      const response = await openai.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-1',
      })

      setTranscription(response.text)
    } catch (error) {
      console.error('Transcription error:', error)
      setTranscription('Error during transcription. Please try again.')
    } finally {
      setIsTranscribing(false)
    }
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
      <motion.div 
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Transcribe Your Audio
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex justify-center space-x-4">
            <motion.button
              onClick={status === 'recording' ? stopRecording : startRecording}
              className={`flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                status === 'recording' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mic className="mr-2 h-5 w-5" />
              {status === 'recording' ? 'Stop Recording' : 'Start Recording'}
            </motion.button>
            <motion.label 
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload File
              <input type="file" className="hidden" onChange={handleFileUpload} accept="audio/*" />
            </motion.label>
          </div>
          {(file || mediaBlobUrl) && (
            <div className="flex items-center justify-center space-x-2">
              <FileAudio className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-500">{file ? file.name : 'Recorded Audio'}</span>
              {mediaBlobUrl && (
                <motion.button
                  onClick={handlePlayPause}
                  className="flex items-center px-2 py-1 text-sm text-indigo-600 hover:text-indigo-500"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {audioRef.current?.paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </motion.button>
              )}
            </div>
          )}
          {mediaBlobUrl && <audio ref={audioRef} src={mediaBlobUrl} className="hidden" />}
          <motion.button
            onClick={handleTranscribe}
            disabled={isTranscribing || (!file && !mediaBlobUrl)}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isTranscribing ? 'Transcribing...' : 'Transcribe'}
          </motion.button>
          {transcription && (
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-medium text-gray-900">Transcription Result:</h3>
              <p className="mt-2 text-sm text-gray-500 bg-gray-100 p-4 rounded-md">{transcription}</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default TranscriptionForm