"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Bell, Shield, Volume2, CreditCard, Download, ArrowLeft, Save, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile")
  const [notifications, setNotifications] = useState({
    training: true,
    achievements: true,
    leaderboard: false,
    email: true,
    push: true
  })
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe", 
    email: "john@example.com",
    bio: "Cognitive training enthusiast",
    timezone: "UTC-8",
    language: "en"
  })
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    scoresVisible: true,
    achievementsVisible: true,
    dataSharing: false
  })
  const [voice, setVoice] = useState({
    enabled: true,
    voiceId: "pNInz6obpgDQGcFmaJgB",
    speed: 1.0,
    volume: 0.8
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "voice", label: "Voice & Audio", icon: Volume2 },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "data", label: "Data Export", icon: Download },
  ]

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const handleExportData = async () => {
    // Simulate data export
    const data = {
      profile,
      trainingHistory: "...",
      achievements: "...",
      cognitiveScores: "..."
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cognitive-gym-data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-neutral-800/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-white/60 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-medium">Settings</h1>
                <p className="text-sm text-white/60">Manage your account and preferences</p>
              </div>
            </div>
            
            <motion.button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-all duration-200 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSaving ? (
                <motion.div
                  className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </motion.button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm"
            >
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input
                          type="text"
                          value={profile.firstName}
                          onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          value={profile.lastName}
                          onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                        rows={3}
                        className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 transition-colors resize-none"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Timezone</label>
                        <select
                          value={profile.timezone}
                          onChange={(e) => setProfile(prev => ({ ...prev, timezone: e.target.value }))}
                          className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
                        >
                          <option value="UTC-8">Pacific Time (UTC-8)</option>
                          <option value="UTC-5">Eastern Time (UTC-5)</option>
                          <option value="UTC+0">GMT (UTC+0)</option>
                          <option value="UTC+1">Central European Time (UTC+1)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Language</label>
                        <select
                          value={profile.language}
                          onChange={(e) => setProfile(prev => ({ ...prev, language: e.target.value }))}
                          className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Change Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-white/30 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Training Notifications</h3>
                      {[
                        { key: 'training', label: 'Daily training reminders', description: 'Get reminded to complete your daily cognitive exercises' },
                        { key: 'achievements', label: 'Achievement notifications', description: 'Be notified when you unlock new achievements and NFTs' },
                        { key: 'leaderboard', label: 'Leaderboard updates', description: 'Get notified about your ranking changes' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-start justify-between p-4 bg-neutral-800/30 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{item.label}</h4>
                            <p className="text-sm text-white/60">{item.description}</p>
                          </div>
                          <button
                            onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              notifications[item.key] ? 'bg-green-500' : 'bg-neutral-600'
                            }`}
                          >
                            <motion.div
                              className="absolute top-1 w-4 h-4 bg-white rounded-full"
                              animate={{ x: notifications[item.key] ? 26 : 2 }}
                              transition={{ duration: 0.2 }}
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Delivery Methods</h3>
                      {[
                        { key: 'email', label: 'Email notifications', description: 'Receive notifications via email' },
                        { key: 'push', label: 'Push notifications', description: 'Receive push notifications on your devices' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-start justify-between p-4 bg-neutral-800/30 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{item.label}</h4>
                            <p className="text-sm text-white/60">{item.description}</p>
                          </div>
                          <button
                            onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              notifications[item.key] ? 'bg-green-500' : 'bg-neutral-600'
                            }`}
                          >
                            <motion.div
                              className="absolute top-1 w-4 h-4 bg-white rounded-full"
                              animate={{ x: notifications[item.key] ? 26 : 2 }}
                              transition={{ duration: 0.2 }}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "privacy" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Privacy & Security</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Profile Visibility</h3>
                      {[
                        { key: 'profileVisible', label: 'Public profile', description: 'Allow others to see your profile information' },
                        { key: 'scoresVisible', label: 'Show cognitive scores', description: 'Display your cognitive scores on your public profile' },
                        { key: 'achievementsVisible', label: 'Show achievements', description: 'Display your achievements and NFTs publicly' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-start justify-between p-4 bg-neutral-800/30 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{item.label}</h4>
                            <p className="text-sm text-white/60">{item.description}</p>
                          </div>
                          <button
                            onClick={() => setPrivacy(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              privacy[item.key] ? 'bg-green-500' : 'bg-neutral-600'
                            }`}
                          >
                            <motion.div
                              className="absolute top-1 w-4 h-4 bg-white rounded-full"
                              animate={{ x: privacy[item.key] ? 26 : 2 }}
                              transition={{ duration: 0.2 }}
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Data Sharing</h3>
                      <div className="flex items-start justify-between p-4 bg-neutral-800/30 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">Anonymous research participation</h4>
                          <p className="text-sm text-white/60">Help improve cognitive training by sharing anonymized data for research</p>
                        </div>
                        <button
                          onClick={() => setPrivacy(prev => ({ ...prev, dataSharing: !prev.dataSharing }))}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            privacy.dataSharing ? 'bg-green-500' : 'bg-neutral-600'
                          }`}
                        >
                          <motion.div
                            className="absolute top-1 w-4 h-4 bg-white rounded-full"
                            animate={{ x: privacy.dataSharing ? 26 : 2 }}
                            transition={{ duration: 0.2 }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "voice" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Voice & Audio Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start justify-between p-4 bg-neutral-800/30 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">Enable voice features</h4>
                        <p className="text-sm text-white/60">Use voice commands and audio feedback during training</p>
                      </div>
                      <button
                        onClick={() => setVoice(prev => ({ ...prev, enabled: !prev.enabled }))}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          voice.enabled ? 'bg-green-500' : 'bg-neutral-600'
                        }`}
                      >
                        <motion.div
                          className="absolute top-1 w-4 h-4 bg-white rounded-full"
                          animate={{ x: voice.enabled ? 26 : 2 }}
                          transition={{ duration: 0.2 }}
                        />
                      </button>
                    </div>

                    {voice.enabled && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2">Voice Selection</label>
                          <select
                            value={voice.voiceId}
                            onChange={(e) => setVoice(prev => ({ ...prev, voiceId: e.target.value }))}
                            className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
                          >
                            <option value="pNInz6obpgDQGcFmaJgB">Rachel (Default)</option>
                            <option value="21m00Tcm4TlvDq8ikWAM">Drew</option>
                            <option value="AZnzlk1XvdvUeBnXmlld">Domi</option>
                            <option value="EXAVITQu4vr4xnSDxMaL">Bella</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Speech Speed: {voice.speed}x</label>
                          <input
                            type="range"
                            min="0.5"
                            max="2.0"
                            step="0.1"
                            value={voice.speed}
                            onChange={(e) => setVoice(prev => ({ ...prev, speed: Number.parseFloat(e.target.value) }))}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Volume: {Math.round(voice.volume * 100)}%</label>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={voice.volume}
                            onChange={(e) => setVoice(prev => ({ ...prev, volume: Number.parseFloat(e.target.value) }))}
                            className="w-full"
                          />
                        </div>

                        <button className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors">
                          Test Voice Settings
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "billing" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Billing & Subscription</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-neutral-800/30 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">Current Plan</h3>
                          <p className="text-white/60">Trainer Plan</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-light">$19</div>
                          <div className="text-sm text-white/60">per month</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-white/60">
                        <span>Next billing date</span>
                        <span>January 15, 2024</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="bg-white text-black py-3 rounded-lg font-medium hover:bg-white/90 transition-colors">
                        Upgrade Plan
                      </button>
                      <button className="border border-white/20 text-white py-3 rounded-lg font-medium hover:bg-white/5 transition-colors">
                        Manage Billing
                      </button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Payment Method</h3>
                      <div className="bg-neutral-800/30 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-5 h-5" />
                          <div>
                            <div className="font-medium">•••• •••• •••• 4242</div>
                            <div className="text-sm text-white/60">Expires 12/25</div>
                          </div>
                        </div>
                        <button className="text-white/60 hover:text-white transition-colors">
                          Update
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Billing History</h3>
                      <div className="space-y-2">
                        {[
                          { date: "Dec 15, 2023", amount: "$19.00", status: "Paid" },
                          { date: "Nov 15, 2023", amount: "$19.00", status: "Paid" },
                          { date: "Oct 15, 2023", amount: "$19.00", status: "Paid" },
                        ].map((invoice, index) => (
                          <div key={index} className="bg-neutral-800/30 rounded-lg p-4 flex items-center justify-between">
                            <div>
                              <div className="font-medium">{invoice.date}</div>
                              <div className="text-sm text-white/60">Trainer Plan</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{invoice.amount}</div>
                              <div className="text-sm text-green-400">{invoice.status}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "data" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Data Export & Management</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-2">Export Your Data</h3>
                      <p className="text-white/70 mb-4">
                        Download a complete copy of your cognitive training data, including progress history, 
                        achievements, and analysis results.
                      </p>
                      <button
                        onClick={handleExportData}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export Data</span>
                      </button>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-2">Data Retention</h3>
                      <p className="text-white/70 mb-4">
                        Your training data is stored securely and used to provide personalized insights. 
                        You can request data deletion at any time.
                      </p>
                      <div className="text-sm text-white/60">
                        <p>• Training sessions: Kept for analysis and progress tracking</p>
                        <p>• Cognitive scores: Used for personalized recommendations</p>
                        <p>• Voice data: Processed locally, not stored permanently</p>
                      </div>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-2">Delete Account</h3>
                      <p className="text-white/70 mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors">
                        Delete Account
                      </button>
                    </div>
                \
