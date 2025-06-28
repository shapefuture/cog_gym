"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Code, Key, Book, Zap, Shield, Globe, Copy, Check } from "lucide-react"

export default function APIDocumentation() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)

  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/training/save",
      description: "Save a completed training session",
      parameters: [
        { name: "userId", type: "string", required: true, description: "User identifier" },
        { name: "type", type: "string", required: true, description: "Training type (e.g., 'confirmation-bias')" },
        { name: "score", type: "number", required: true, description: "Session score (0-100)" },
        { name: "duration", type: "number", required: true, description: "Session duration in seconds" },
        { name: "biasesDetected", type: "array", required: false, description: "Array of detected biases" },
      ],
      example: `{
  "userId": "user_123",
  "type": "confirmation-bias",
  "score": 85,
  "duration": 420,
  "biasesDetected": ["confirmation-bias", "anchoring"]
}`,
    },
    {
      method: "POST",
      endpoint: "/api/achievements/create",
      description: "Create a new achievement for a user",
      parameters: [
        { name: "userId", type: "string", required: true, description: "User identifier" },
        { name: "type", type: "string", required: true, description: "Achievement type" },
        { name: "title", type: "string", required: true, description: "Achievement title" },
        { name: "description", type: "string", required: true, description: "Achievement description" },
      ],
      example: `{
  "userId": "user_123",
  "type": "first-session",
  "title": "First Steps",
  "description": "Completed your first training session"
}`,
    },
    {
      method: "POST",
      endpoint: "/api/nft/mint",
      description: "Mint an NFT achievement",
      parameters: [
        { name: "userId", type: "string", required: true, description: "User identifier" },
        { name: "achievementType", type: "string", required: true, description: "Type of achievement" },
        { name: "metadata", type: "object", required: false, description: "Additional NFT metadata" },
      ],
      example: `{
  "userId": "user_123",
  "achievementType": "bias-master",
  "metadata": {
    "cognitiveScore": 95,
    "streakDays": 30
  }
}`,
    },
    {
      method: "POST",
      endpoint: "/api/voice/synthesize",
      description: "Convert text to speech",
      parameters: [
        { name: "text", type: "string", required: true, description: "Text to synthesize" },
        { name: "voiceId", type: "string", required: false, description: "Voice identifier" },
        { name: "speed", type: "number", required: false, description: "Speech speed (0.5-2.0)" },
      ],
      example: `{
  "text": "Welcome to your cognitive training session",
  "voiceId": "rachel",
  "speed": 1.0
}`,
    },
    {
      method: "POST",
      endpoint: "/api/analysis/cognitive",
      description: "Analyze cognitive patterns and biases",
      parameters: [
        { name: "sessionData", type: "object", required: true, description: "Training session data" },
        { name: "userHistory", type: "array", required: false, description: "User's historical data" },
      ],
      example: `{
  "sessionData": {
    "responses": [...],
    "timings": [...],
    "confidence": [...]
  },
  "userHistory": [...]
}`,
    },
  ]

  const sdkExamples = [
    {
      language: "JavaScript",
      code: `import { CognitiveGymAPI } from '@cognitive-gym/sdk';

const api = new CognitiveGymAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.cognitivegym.com'
});

// Save training session
const session = await api.training.save({
  userId: 'user_123',
  type: 'confirmation-bias',
  score: 85,
  duration: 420
});

// Create achievement
const achievement = await api.achievements.create({
  userId: 'user_123',
  type: 'first-session',
  title: 'First Steps'
});`,
    },
    {
      language: "Python",
      code: `from cognitive_gym import CognitiveGymAPI

api = CognitiveGymAPI(
    api_key='your-api-key',
    base_url='https://api.cognitivegym.com'
)

# Save training session
session = api.training.save(
    user_id='user_123',
    type='confirmation-bias',
    score=85,
    duration=420
)

# Create achievement
achievement = api.achievements.create(
    user_id='user_123',
    type='first-session',
    title='First Steps'
)`,
    },
    {
      language: "cURL",
      code: `# Save training session
curl -X POST https://api.cognitivegym.com/api/training/save \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "userId": "user_123",
    "type": "confirmation-bias",
    "score": 85,
    "duration": 420
  }'

# Create achievement
curl -X POST https://api.cognitivegym.com/api/achievements/create \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "userId": "user_123",
    "type": "first-session",
    "title": "First Steps"
  }'`,
    },
  ]

  const features = [
    {
      icon: Zap,
      title: "Real-time Analysis",
      description: "Get instant cognitive bias analysis and recommendations",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security with end-to-end encryption",
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "99.9% uptime with global CDN and edge computing",
    },
    {
      icon: Code,
      title: "Developer Friendly",
      description: "RESTful API with comprehensive SDKs and documentation",
    },
  ]

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text)
    setCopiedEndpoint(endpoint)
    setTimeout(() => setCopiedEndpoint(null), 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-neutral-800/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-white/60 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-medium">API Documentation</h1>
                <p className="text-sm text-white/60">Integrate Cognitive Gym into your applications</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">v1.0 Stable</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-20 h-20 bg-green-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Code className="w-10 h-10 text-green-400" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-light mb-6">Cognitive Gym API</h1>
          <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Build powerful applications with our cognitive bias detection and training API. Integrate advanced
            AI-powered insights into your products and services.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#get-started"
              className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200"
            >
              Get Started
            </Link>
            <Link
              href="#endpoints"
              className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/5 transition-all duration-200"
            >
              View Endpoints
            </Link>
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-12 text-center">API Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-neutral-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Getting Started */}
        <motion.section
          id="get-started"
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Key className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
                <p className="text-white/70">
                  Get your API key and start integrating Cognitive Gym into your applications in minutes.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neutral-800/30 rounded-xl p-6">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-400 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Get API Key</h3>
                <p className="text-white/70 text-sm">
                  Sign up for a developer account and generate your API key from the dashboard.
                </p>
              </div>

              <div className="bg-neutral-800/30 rounded-xl p-6">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-purple-400 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Install SDK</h3>
                <p className="text-white/70 text-sm">
                  Install our SDK for your preferred language or use the REST API directly.
                </p>
              </div>

              <div className="bg-neutral-800/30 rounded-xl p-6">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-green-400 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Start Building</h3>
                <p className="text-white/70 text-sm">
                  Make your first API call and start integrating cognitive training features.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* API Endpoints */}
        <motion.section
          id="endpoints"
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-12">API Endpoints</h2>

          <div className="space-y-8">
            {apiEndpoints.map((endpoint, index) => (
              <motion.div
                key={endpoint.endpoint}
                className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          endpoint.method === "GET"
                            ? "bg-blue-500/20 text-blue-300"
                            : endpoint.method === "POST"
                              ? "bg-green-500/20 text-green-300"
                              : endpoint.method === "PUT"
                                ? "bg-yellow-500/20 text-yellow-300"
                                : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {endpoint.method}
                      </span>
                      <code className="text-white/80 font-mono">{endpoint.endpoint}</code>
                    </div>
                    <p className="text-white/70">{endpoint.description}</p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(endpoint.endpoint, endpoint.endpoint)}
                    className="p-2 hover:bg-neutral-800/50 rounded-lg transition-colors"
                  >
                    {copiedEndpoint === endpoint.endpoint ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5 text-white/60" />
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Parameters */}
                  <div>
                    <h4 className="font-semibold mb-4">Parameters</h4>
                    <div className="space-y-3">
                      {endpoint.parameters.map((param, paramIndex) => (
                        <div key={paramIndex} className="bg-neutral-800/30 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <code className="text-blue-400 font-mono text-sm">{param.name}</code>
                            <span className="text-white/60 text-sm">{param.type}</span>
                            {param.required && (
                              <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs">Required</span>
                            )}
                          </div>
                          <p className="text-white/70 text-sm">{param.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Example */}
                  <div>
                    <h4 className="font-semibold mb-4">Example Request</h4>
                    <div className="bg-neutral-800/50 rounded-lg p-4 relative">
                      <button
                        onClick={() => copyToClipboard(endpoint.example, `${endpoint.endpoint}-example`)}
                        className="absolute top-3 right-3 p-1 hover:bg-neutral-700/50 rounded transition-colors"
                      >
                        {copiedEndpoint === `${endpoint.endpoint}-example` ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-white/60" />
                        )}
                      </button>
                      <pre className="text-sm text-white/80 font-mono overflow-x-auto">{endpoint.example}</pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SDK Examples */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-semibold mb-12">SDK Examples</h2>

          <div className="space-y-8">
            {sdkExamples.map((example, index) => (
              <motion.div
                key={example.language}
                className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">{example.language}</h3>
                  <button
                    onClick={() => copyToClipboard(example.code, example.language)}
                    className="flex items-center space-x-2 px-4 py-2 bg-neutral-800/50 hover:bg-neutral-700/50 rounded-lg transition-colors"
                  >
                    {copiedEndpoint === example.language ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-white/60" />
                        <span className="text-white/60 text-sm">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-neutral-800/50 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-sm text-white/80 font-mono">{example.code}</pre>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Support Section */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Book className="w-8 h-8 text-green-400" />
            </div>

            <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Our developer support team is here to help you integrate the Cognitive Gym API. Check out our
              comprehensive documentation or reach out directly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs"
                className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200"
              >
                Full Documentation
              </Link>
              <Link
                href="/contact"
                className="border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/5 transition-all duration-200"
              >
                Developer Support
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
