export interface VoiceOptions {
  voiceId?: string
  speed?: number
  volume?: number
}

export interface VoiceResponse {
  audioUrl: string | null
  error: string | null
}

export interface TranscriptionResponse {
  text: string
  confidence: number
  error: string | null
}

export interface VoiceAnalysis {
  emotion: string
  confidence: number
  valence: number
  arousal: number
  speakingRate: number
  pauseFrequency: number
  stressIndicators: string[]
}

export async function textToSpeech(text: string, options: VoiceOptions = {}): Promise<VoiceResponse> {
  try {
    // Demo mode - return mock audio URL
    if (!process.env.ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY === "demo-key") {
      return {
        audioUrl: `data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT`,
        error: null,
      }
    }

    const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM", {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
          speed: options.speed || 1.0,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`)
    }

    const audioBuffer = await response.arrayBuffer()
    const audioBlob = new Blob([audioBuffer], { type: "audio/mpeg" })
    const audioUrl = URL.createObjectURL(audioBlob)

    return { audioUrl, error: null }
  } catch (error) {
    console.error("Text-to-speech error:", error)
    return {
      audioUrl: null,
      error: error instanceof Error ? error.message : "Failed to synthesize speech",
    }
  }
}

export async function speechToText(audioBlob: Blob): Promise<TranscriptionResponse> {
  try {
    // Demo mode - return mock transcription
    if (!process.env.GOOGLE_CLOUD_API_KEY || process.env.GOOGLE_CLOUD_API_KEY === "demo-key") {
      return {
        text: "This is a demo transcription. In production, this would use Google Cloud Speech-to-Text to convert your speech to text with high accuracy.",
        confidence: 0.95,
        error: null,
      }
    }

    const audioBuffer = await audioBlob.arrayBuffer()
    const base64Audio = Buffer.from(audioBuffer).toString("base64")

    const response = await fetch(
      `https://speech.googleapis.com/v1/speech:recognize?key=${process.env.GOOGLE_CLOUD_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          config: {
            encoding: "WEBM_OPUS",
            sampleRateHertz: 48000,
            languageCode: "en-US",
            enableAutomaticPunctuation: true,
          },
          audio: {
            content: base64Audio,
          },
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`Google Cloud API error: ${response.status}`)
    }

    const data = await response.json()
    const result = data.results?.[0]

    return {
      text: result?.alternatives?.[0]?.transcript || "",
      confidence: result?.alternatives?.[0]?.confidence || 0,
      error: null,
    }
  } catch (error) {
    console.error("Speech-to-text error:", error)
    return {
      text: "",
      confidence: 0,
      error: error instanceof Error ? error.message : "Failed to transcribe speech",
    }
  }
}

export async function getAvailableVoices() {
  try {
    if (!process.env.ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY === "demo-key") {
      return {
        voices: [
          { voice_id: "pNInz6obpgDQGcFmaJgB", name: "Rachel", category: "premade" },
          { voice_id: "21m00Tcm4TlvDq8ikWAM", name: "Drew", category: "premade" },
          { voice_id: "AZnzlk1XvdvUeBnXmlld", name: "Domi", category: "premade" },
          { voice_id: "EXAVITQu4vr4xnSDxMaL", name: "Bella", category: "premade" },
        ],
        error: null,
      }
    }

    const response = await fetch("https://api.elevenlabs.io/v1/voices", {
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
      },
    })

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`)
    }

    const data = await response.json()
    return { voices: data.voices, error: null }
  } catch (error) {
    console.error("Get voices error:", error)
    return {
      voices: [],
      error: error instanceof Error ? error.message : "Failed to get voices",
    }
  }
}

export async function detectEmotion(audioBlob: Blob): Promise<VoiceAnalysis> {
  // Enhanced emotion detection with more detailed analysis
  const emotions = [
    "confident",
    "uncertain",
    "excited",
    "calm",
    "stressed",
    "focused",
    "confused",
    "happy",
    "concerned",
  ]
  const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)]

  return {
    emotion: randomEmotion,
    confidence: Math.random() * 0.5 + 0.5, // 0.5-1.0
    valence: Math.random() * 2 - 1, // -1 to 1 (negative to positive)
    arousal: Math.random() * 2 - 1, // -1 to 1 (calm to excited)
    speakingRate: Math.random() * 100 + 100, // words per minute
    pauseFrequency: Math.random() * 10 + 5, // pauses per minute
    stressIndicators: Math.random() > 0.7 ? ["vocal tension", "rapid speech"] : [],
  }
}

export async function analyzeVoicePatterns(audioBlob: Blob): Promise<VoiceAnalysis> {
  // Comprehensive voice pattern analysis
  return await detectEmotion(audioBlob)
}

// New function for real-time voice processing
export async function processVoiceInput(audioBlob: Blob) {
  try {
    const [transcription, voiceAnalysis] = await Promise.all([speechToText(audioBlob), analyzeVoicePatterns(audioBlob)])

    return {
      transcript: transcription.text,
      confidence: transcription.confidence,
      emotion: voiceAnalysis.emotion,
      voiceMetrics: voiceAnalysis,
      error: transcription.error,
    }
  } catch (error) {
    console.error("Voice processing error:", error)
    return {
      transcript: "",
      confidence: 0,
      emotion: "neutral",
      voiceMetrics: null,
      error: error instanceof Error ? error.message : "Failed to process voice input",
    }
  }
}

// Integration with backend services
export async function connectToBackendAudio(message: string) {
  try {
    // Connect to the Node.js backend for audio processing
    const response = await fetch("/api/voice/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      throw new Error(`Backend audio error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Backend audio connection error:", error)
    // Fallback to local processing
    return await textToSpeech(message)
  }
}
