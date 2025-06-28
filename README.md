# 🧠 Cognitive Gym - Advanced Cognitive Bias Training Platform

A comprehensive, AI-powered platform for cognitive bias training featuring interactive 3D avatars, voice interaction, and personalized learning experiences.

## 🌟 **Key Features**

### 🎯 **Core Training Platform**
- **Interactive Bias Training**: Confirmation bias, anchoring bias, availability heuristic, and more
- **Gamified Learning**: Cognitive labyrinth, progress tracking, achievements
- **Advanced Analytics**: Observatory view with detailed cognitive pattern analysis
- **NFT Achievements**: Blockchain-based reward system for milestones

### 🤖 **AI-Powered Coaching**
- **Gemini AI Integration**: Advanced conversational AI for personalized coaching
- **Voice Interaction**: Real-time speech-to-text and text-to-speech
- **Emotion Detection**: Voice pattern analysis for adaptive responses
- **3D Avatar Coach**: Interactive avatar with facial expressions and lip-sync

### 🔊 **Multi-Modal Experience**
- **Voice Chat**: Natural conversation with AI coach
- **3D Avatar Interface**: Immersive visual interaction
- **Real-time Audio Processing**: ElevenLabs TTS and Google Cloud STT
- **LiveKit Integration**: Real-time communication capabilities

### 💼 **Enterprise Features**
- **Supabase Backend**: Scalable database and authentication
- **Stripe Integration**: Subscription management and payments
- **Progressive Web App**: Mobile-responsive design
- **API Access**: RESTful APIs for integration

## 🏗️ **Architecture Overview**

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    COGNITIVE GYM PLATFORM                   │
├─────────────────────────────────────────────────────────────┤
│  Next.js Web App (Main Platform)                           │
│  ├── Training Modules                                       │
│  ├── Dashboard & Analytics                                  │
│  ├── User Management                                        │
│  └── API Routes                                            │
├─────────────────────────────────────────────────────────────┤
│  AI Voice Agent (Python + LiveKit)                         │
│  ├── Real-time Conversation                                │
│  ├── Gemini AI Integration                                 │
│  └── Voice Processing                                       │
├─────────────────────────────────────────────────────────────┤
│  3D Avatar Frontend (React + Three.js)                     │
│  ├── 3D Character Rendering                                │
│  ├── Facial Expressions                                    │
│  └── Lip Sync Animation                                    │
├─────────────────────────────────────────────────────────────┤
│  Backend Services (Node.js)                                │
│  ├── Audio Processing                                      │
│  ├── Voice Synthesis                                       │
│  └── Real-time Communication                               │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- Git

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/your-org/cognitive-gym.git
cd cognitive-gym

# Install all dependencies
npm run install:all

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys
\`\`\`

### Environment Variables

\`\`\`bash
# Core Platform
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI Services
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_key  # Optional fallback

# Voice Services
ELEVENLABS_API_KEY=your_elevenlabs_key
GOOGLE_CLOUD_API_KEY=your_google_cloud_key

# Payment Processing
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
STRIPE_TRAINER_MONTHLY_PRICE_ID=price_xxx
STRIPE_TRAINER_YEARLY_PRICE_ID=price_xxx
STRIPE_MASTER_MONTHLY_PRICE_ID=price_xxx
STRIPE_MASTER_YEARLY_PRICE_ID=price_xxx

# Blockchain (Optional)
BLOCKCHAIN_PRIVATE_KEY=your_private_key
NFT_CONTRACT_ADDRESS=your_contract_address

# LiveKit (For real-time features)
LIVEKIT_API_KEY=your_livekit_key
LIVEKIT_API_SECRET=your_livekit_secret
LIVEKIT_WS_URL=wss://your-livekit-server.com
\`\`\`

### Development

\`\`\`bash
# Start all services
npm run dev:all

# Or start individually:
npm run dev          # Next.js web app (port 3000)
npm run backend      # Node.js backend (port 3001)
npm run frontend-3d  # 3D Avatar frontend (port 5173)
python agent.py      # AI voice agent
\`\`\`

## 📱 **Application Structure**

### Main Web Application (`/`)
- **Landing Page**: Marketing and feature overview
- **Dashboard**: User progress and training overview
- **Training Modules**: Interactive bias training exercises
- **Observatory**: Advanced analytics and insights
- **Labyrinth**: Gamified maze-based training
- **Avatar Coach**: AI-powered voice interaction
- **Settings**: User preferences and subscription management

### API Routes (`/api/`)
- `/api/chat` - AI conversation endpoint
- `/api/voice/process` - Voice processing and synthesis
- `/api/training/save` - Save training session data
- `/api/achievements/create` - Create user achievements
- `/api/nft/mint` - Mint achievement NFTs
- `/api/analysis/cognitive` - Cognitive pattern analysis

### 3D Avatar System (`/apps/frontend/`)
- Real-time 3D character rendering
- Facial expression mapping
- Lip-sync animation
- Voice-driven interactions

### Backend Services (`/apps/backend/`)
- Audio processing pipeline
- Voice synthesis and recognition
- Real-time communication handling

## 🎮 **Training Modules**

### 1. **Confirmation Bias Training**
- Scenario-based decision making
- Evidence evaluation exercises
- Devil's advocate techniques

### 2. **Anchoring Bias Training**
- Numerical estimation challenges
- Negotiation simulations
- Independent value assessment

### 3. **Availability Heuristic Training**
- Risk assessment scenarios
- Statistical vs. anecdotal evidence
- Base rate evaluation

### 4. **Cognitive Labyrinth**
- Interactive maze navigation
- Bias detection challenges
- Real-time scoring system

## 🤖 **AI Integration**

### Gemini AI Features
- Contextual conversation understanding
- Personalized coaching recommendations
- Cognitive pattern analysis
- Adaptive difficulty adjustment

### Voice Processing
- Real-time speech-to-text transcription
- Emotion detection from voice patterns
- Natural text-to-speech synthesis
- Multi-language support (planned)

## 🔧 **Technical Implementation**

### Frontend Stack
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **Three.js**: 3D graphics rendering
- **shadcn/ui**: Modern UI components

### Backend Stack
- **Supabase**: Database and authentication
- **Node.js**: Backend services
- **Python**: AI agent and processing
- **LiveKit**: Real-time communication
- **Stripe**: Payment processing

### AI & Voice Services
- **Google Gemini**: Conversational AI
- **ElevenLabs**: Text-to-speech synthesis
- **Google Cloud**: Speech-to-text recognition
- **Custom Models**: Emotion and pattern detection

## 📊 **Analytics & Insights**

### User Progress Tracking
- Cognitive score evolution
- Bias detection accuracy
- Training session analytics
- Streak and engagement metrics

### Advanced Analytics
- Voice pattern analysis
- Decision-making speed tracking
- Confidence calibration metrics
- Personalized improvement recommendations

## 🏆 **Gamification Features**

### Achievement System
- Training milestones
- Accuracy achievements
- Streak rewards
- Special challenge completions

### NFT Integration
- Blockchain-based certificates
- Tradeable achievement tokens
- Rarity-based rewards
- Community leaderboards

## 🔒 **Security & Privacy**

### Data Protection
- End-to-end encryption for voice data
- GDPR-compliant data handling
- Secure API authentication
- Privacy-first design principles

### Authentication
- Supabase Auth integration
- Multi-factor authentication support
- Social login options
- Secure session management

## 🚀 **Deployment**

### Vercel Deployment (Recommended)
\`\`\`bash
# Deploy to Vercel
vercel --prod

# Set environment variables in Vercel dashboard
# Configure custom domain
# Enable analytics and monitoring
\`\`\`

### Docker Deployment
\`\`\`bash
# Build containers
docker-compose build

# Start services
docker-compose up -d

# Scale services
docker-compose up --scale backend=3
\`\`\`

## 🤝 **Contributing**

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Code Standards
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Conventional commits for git history

## 📈 **Roadmap**

### Phase 1 (Current)
- ✅ Core training modules
- ✅ AI voice integration
- ✅ 3D avatar system
- ✅ Basic analytics

### Phase 2 (Q2 2024)
- 🔄 Advanced emotion recognition
- 🔄 Multi-language support
- 🔄 Mobile app (React Native)
- 🔄 Team training features

### Phase 3 (Q3 2024)
- 📋 VR/AR integration
- 📋 Advanced AI coaching
- 📋 Corporate training modules
- 📋 API marketplace

## 📞 **Support**

### Documentation
- [API Documentation](./docs/api.md)
- [Training Guide](./docs/training.md)
- [Deployment Guide](./docs/deployment.md)

### Community
- [Discord Server](https://discord.gg/cognitive-gym)
- [GitHub Discussions](https://github.com/your-org/cognitive-gym/discussions)
- [Support Email](mailto:support@cognitivegym.com)

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- OpenAI for AI research foundations
- Google for Gemini AI capabilities
- ElevenLabs for voice synthesis technology
- The cognitive psychology research community
- Open source contributors and maintainers

---

**Built with ❤️ for better decision-making and cognitive awareness**
