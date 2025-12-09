import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Bot, User, Loader2, ArrowLeft, Activity, Target, Lightbulb, ChevronRight, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content?: string;
  data?: {
    message?: string;
    analysis?: string;
    correction?: string;
    drill?: string;
    tips?: string[];
  };
  image?: string;
  timestamp: Date;
}

const DANCE_STYLES = [
  { id: 'bharatanatyam', label: 'Bharatanatyam', icon: '🙏' },
  { id: 'kathak', label: 'Kathak', icon: '💃' },
  { id: 'odissi', label: 'Odissi', icon: '🌸' },
  { id: 'kuchipudi', label: 'Kuchipudi', icon: '🏺' },
  { id: 'kathakali', label: 'Kathakali', icon: '🎭' },
  { id: 'manipuri', label: 'Manipuri', icon: '🎋' },
  { id: 'mohiniyattam', label: 'Mohiniyattam', icon: '🥥' },
  { id: 'sattriya', label: 'Sattriya', icon: '📜' },
  { id: 'bollywood', label: 'Bollywood', icon: '🎬' },
  { id: 'folk', label: 'Indian Folk', icon: '🥁' },
];

export default function ArkAIPage() {
  const [, navigate] = useLocation();
  const [selectedStyle, setSelectedStyle] = useState(DANCE_STYLES[0]);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      data: {
        message: "Namaste! I'm ARK AI. Select a classical Indian dance style to begin our session.",
        tips: ["Upload a photo of a Mudra", "Ask about Adavus", "Request Abhinaya tips"]
      },
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleStyleSelect = (style: typeof DANCE_STYLES[0]) => {
    setSelectedStyle(style);
    
    // Add a system message greeting for the new style
    const greetingMessage: Message = {
      role: 'assistant',
      data: {
        message: `Hi, welcome to ARK AI. Let's get started on ${style.label}. What do you want to do today? How can I help you?`,
        tips: [`Check my ${style.label} posture`, `Explain ${style.label} mudras`, `Practice ${style.label} rhythm`]
      },
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, greetingMessage]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendMessage = async (messageText: string, imageData?: string) => {
    if ((!messageText.trim() && !imageData) || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: messageText,
      image: imageData || undefined,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const history = messages.slice(-10).map(m => ({
        role: m.role,
        content: m.role === 'user' ? m.content : JSON.stringify(m.data || m.content)
      }));

      const response = await fetch('/api/ark-ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          message: messageText,
          image: imageData,
          style: selectedStyle.id,
          history
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const botMessage: Message = {
        role: 'assistant',
        data: data,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        data: { message: "Connection interrupted. Please try again." },
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(input, selectedImage || undefined);
  };

  const handleTipClick = (tip: string) => {
    sendMessage(tip);
  };

  return (
    <div className="min-h-screen bg-purple-50/30 flex font-sans overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(/images/dance-studio.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-purple-50/50 to-pink-50/80" />
      </div>

      {/* Sidebar - Permanent on Desktop */}
      <aside className="w-64 bg-white/80 backdrop-blur-xl border-r border-purple-100 z-20 flex-col hidden md:flex shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => navigate('/app')}>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800 tracking-tight">ARK AI</h1>
              <p className="text-[10px] text-purple-600 font-semibold uppercase tracking-wider">Dance Coach</p>
            </div>
          </div>
          
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Select Style</h2>
          <div className="space-y-1 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-100">
            {DANCE_STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => handleStyleSelect(style)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm ${
                  selectedStyle.id === style.id 
                    ? 'bg-purple-100 text-purple-900 font-medium ring-1 ring-purple-200' 
                    : 'hover:bg-purple-50 text-gray-600 hover:text-purple-700'
                }`}
              >
                <span className="text-lg">{style.icon}</span>
                <span>{style.label}</span>
                {selectedStyle.id === style.id && (
                  <motion.div layoutId="active-indicator" className="ml-auto">
                    <ChevronRight className="w-3.5 h-3.5 text-purple-500" />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-auto p-4 border-t border-purple-100">
          <button 
            onClick={() => navigate('/app')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative w-full h-[100dvh]">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white/90 backdrop-blur-md border-b border-purple-100 flex items-center px-4 z-20 sticky top-0">
          <button 
            onClick={() => navigate('/app')}
            className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-gray-800">ARK AI</h1>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
          <div className="max-w-3xl mx-auto space-y-6 pb-4">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm ${
                  msg.role === 'user' ? 'bg-white border border-purple-100' : 'bg-gradient-to-br from-purple-600 to-pink-500'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-purple-600" /> : <Bot className="w-4 h-4 text-white" />}
                </div>
                
                <div className={`flex flex-col gap-2 max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  {msg.role === 'user' ? (
                    <div className="bg-purple-600 text-white rounded-2xl rounded-tr-sm px-5 py-3 shadow-md shadow-purple-200">
                      {msg.image && (
                        <div className="mb-3 rounded-lg overflow-hidden border-2 border-white/20">
                          <img src={msg.image} alt="Uploaded content" className="max-w-full max-h-64 object-cover" />
                        </div>
                      )}
                      <p className="leading-relaxed text-sm md:text-base">{msg.content}</p>
                    </div>
                  ) : (
                    <div className="w-full space-y-3">
                      {/* Main Message */}
                      {msg.data?.message && (
                        <div className="bg-white/80 border border-purple-100 backdrop-blur-sm rounded-2xl rounded-tl-sm px-6 py-4 text-gray-700 leading-relaxed shadow-sm">
                          {msg.data.message}
                        </div>
                      )}

                      {/* Analysis Card */}
                      {msg.data?.analysis && (
                        <div className="bg-white border border-indigo-100 rounded-xl p-5 shadow-sm ring-1 ring-indigo-50">
                          <h3 className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-3">
                            <Activity className="w-4 h-4" /> Analysis
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{msg.data.analysis}</p>
                        </div>
                      )}

                      {/* Correction & Drill Grid */}
                      {(msg.data?.correction || msg.data?.drill) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {msg.data.correction && (
                            <div className="bg-white border border-red-100 rounded-xl p-4 shadow-sm ring-1 ring-red-50">
                              <h3 className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-wider mb-2">
                                <Target className="w-4 h-4" /> Correction
                              </h3>
                              <p className="text-sm text-gray-600">{msg.data.correction}</p>
                            </div>
                          )}
                          {msg.data.drill && (
                            <div className="bg-white border border-emerald-100 rounded-xl p-4 shadow-sm ring-1 ring-emerald-50">
                              <h3 className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
                                <Activity className="w-4 h-4" /> Practice Drill
                              </h3>
                              <p className="text-sm text-gray-600">{msg.data.drill}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Tips - Clickable suggestion buttons */}
                      {msg.data?.tips && msg.data.tips.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {msg.data.tips.map((tip, i) => (
                            <button 
                              key={i} 
                              onClick={() => handleTipClick(tip)}
                              disabled={isLoading}
                              className="inline-flex items-center gap-1.5 bg-white hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 border border-pink-200 hover:border-pink-300 text-pink-700 text-xs font-medium px-3.5 py-2 rounded-full shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> {tip}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <span className="text-[10px] text-gray-400 px-2 font-medium">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/80 border border-purple-100 rounded-2xl rounded-tl-none px-6 py-4 flex items-center gap-3 shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                  <span className="text-sm text-gray-500 animate-pulse font-medium">
                    Analyzing {selectedStyle.label} technique...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area - Clean White Theme */}
        <div className="relative z-10 p-4 md:p-6 bg-white/80 backdrop-blur-xl border-t border-purple-100">
          <div className="max-w-3xl mx-auto">
            {selectedImage && (
              <div className="mb-3 relative inline-block group">
                <div className="absolute inset-0 bg-purple-200 rounded-lg blur-sm opacity-50"></div>
                <img src={selectedImage} alt="Preview" className="h-20 w-auto rounded-lg border-2 border-white shadow-md relative z-10" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 shadow-md z-20 border-2 border-white transition-transform hover:scale-110"
                >
                  ×
                </button>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-3 bg-purple-50 hover:bg-purple-100 border border-purple-100 rounded-full text-purple-600 transition-all hover:scale-105 shadow-sm"
                title="Upload Media"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <input 
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask ARK AI about ${selectedStyle.label.toLowerCase()}...`}
                  className="w-full bg-white border border-purple-100 text-gray-800 placeholder-gray-400 text-sm rounded-full py-3.5 px-5 focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all shadow-sm"
                />
              </div>
              
              <button
                type="submit"
                disabled={(!input.trim() && !selectedImage) || isLoading}
                className={`p-3.5 rounded-full transition-all duration-300 shadow-md ${
                  (!input.trim() && !selectedImage) || isLoading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105'
                }`}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </form>
            <div className="text-center mt-3">
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-400" /> Powered by ARK AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
