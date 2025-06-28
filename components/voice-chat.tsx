"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, Volume2, VolumeX, Send, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface VoiceChatProps {
  onResponse?: (response: any) => void
  includeAvatar?: boolean
  className?: string
}

export function VoiceChat({ onResponse, includeAvatar = false, className }: VoiceChatProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversation, setConversation] = useState<
    Array<{
      role: "user" | "assistant"
      content: string
      timestamp: string
      voiceData?: any
    }>
  >([])

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)

      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        await processAudioInput(audioBlob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error starting recording:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const processAudioInput = async (audioBlob: Blob) => {
    setIsLoading(true)

    try {
      // Convert blob to base64
      const arrayBuffer = await audioBlob.arrayBuffer()
      const base64Audio = Buffer.from(arrayBuffer).toString("base64")

      const response = await fetch("/api/voice/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audioData: base64Audio,
          includeAvatar,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const result = await response.json()

      // Add user message to conversation
      if (result.transcript) {
        setConversation((prev) => [
          ...prev,
          {
            role: "user",
            content: result.transcript,
            timestamp: new Date().toISOString(),
            voiceData: result.voiceAnalysis,
          },
        ])
      }

      // Add AI response to conversation
      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: result.response,
          timestamp: new Date().toISOString(),
        },
      ])

      // Play audio response
      if (result.audioUrl) {
        playAudio(result.audioUrl)
      }

      // Notify parent component
      if (onResponse) {
        onResponse(result)
      }
    } catch (error) {
      console.error("Error processing audio:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const sendTextMessage = async () => {
    if (!message.trim() || isLoading) return

    setIsLoading(true)

    try {
      const response = await fetch("/api/voice/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          includeAvatar,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const result = await response.json()

      // Add user message to conversation
      setConversation((prev) => [
        ...prev,
        {
          role: "user",
          content: message,
          timestamp: new Date().toISOString(),
        },
      ])

      // Add AI response to conversation
      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: result.response,
          timestamp: new Date().toISOString(),
        },
      ])

      // Play audio response
      if (result.audioUrl) {
        playAudio(result.audioUrl)
      }

      // Notify parent component
      if (onResponse) {
        onResponse(result)
      }

      setMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const playAudio = (audioUrl: string) => {
    if (audioRef.current) {
      audioRef.current.pause()
    }

    const audio = new Audio(audioUrl)
    audioRef.current = audio

    audio.onplay = () => setIsPlaying(true)
    audio.onended = () => setIsPlaying(false)
    audio.onerror = () => setIsPlaying(false)

    audio.play().catch(console.error)
  }

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  return (
    <Card className={`p-6 bg-neutral-900/40 border-neutral-800/50 backdrop-blur-sm ${className}`}>
      <div className="space-y-4">
        {/* Conversation Display */}
        <div className="max-h-96 overflow-y-auto space-y-4">
          <AnimatePresence>
            {conversation.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === "user" ? "bg-blue-600 text-white" : "bg-neutral-700 text-white"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  {msg.voiceData && (
                    <div className="mt-2 text-xs opacity-70">
                      Emotion: {msg.voiceData.emotion} | Confidence: {Math.round(msg.voiceData.confidence * 100)}%
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-neutral-700 text-white p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 animate-pulse" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Controls */}
        <div className="space-y-4">
          <div className="flex items-end space-x-2">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message or use voice input..."
              className="flex-1 bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-400"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  sendTextMessage()
                }
              }}
            />
            <Button
              onClick={sendTextMessage}
              disabled={!message.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isLoading}
              variant={isRecording ? "destructive" : "secondary"}
              className="flex items-center space-x-2"
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{isRecording ? "Stop Recording" : "Start Recording"}</span>
            </Button>

            <Button
              onClick={isPlaying ? stopAudio : undefined}
              disabled={!isPlaying}
              variant="secondary"
              className="flex items-center space-x-2"
            >
              {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlaying ? "Stop Audio" : "Audio Ready"}</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
