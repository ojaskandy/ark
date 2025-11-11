import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Send, MessageCircle, Sparkles } from "lucide-react";
import partnershipHero from "@assets/partnership_hero.jpeg";
import challengesImage from "@assets/partnership_challenges.png";
import practiceLibraryImage from "@assets/partnership_practicelibrary.png";
import shifuChatImage from "@assets/partnership_shifuchat.png";
import snapFeedbackImage from "@assets/partnership_snapfeedback.png";
import workoutsImage from "@assets/image_1746812138021.png";
import liveRoutineImage from "@assets/partnership_slr.png";
import coachtProductImage from "@assets/CoachT _ AI Taekwondo Coach · 1.00pm · 07-11_1752264065573.jpeg";

const features = [
  {
    title: "challenges",
    description: "push your limits with fun dance challenges. earn rewards and see how you stack up.",
    image: challengesImage,
  },
  {
    title: "live routine",
    description: "start dancing and get real-time feedback on your moves as you groove.",
    image: liveRoutineImage,
  },
  {
    title: "move library",
    description: "explore tons of dance moves and routines. learn at your own pace, your own style.",
    image: practiceLibraryImage,
  },
  {
    title: "coach chat",
    description: "get tips and encouragement from your personal AI dance coach, always here to help.",
    image: shifuChatImage,
  },
  {
    title: "snap feedback",
    description: "snap a pic of your move and get instant feedback. nail that pose, find your style.",
    image: snapFeedbackImage,
  },
  {
    title: "workouts",
    description: "level up your dance game with workouts that build strength, flexibility, and flow.",
    image: workoutsImage,
  },
];

const testimonials_col1 = [
    { name: "sarah (mom)", city: "new york", text: "my daughter's confidence is through the roof since we started. she dances every day and her moves look amazing." },
    { name: "alex (17)", city: "chicago", text: "the AI feedback is crazy good. way more detailed than any dance class i've been to. game changer for real." },
    { name: "jennifer (mom)", city: "philadelphia", text: "finally an app that keeps my son dancing at home. he actually asks to practice now instead of playing video games!" },
    { name: "marcus (16)", city: "san diego", text: "prepping for a competition and this helps me nail every move. it's like having a pro dancer coaching me 24/7." },
    { name: "lisa (mom)", city: "columbus", text: "totally worth it. my daughter's confidence and creativity have gone up in everything, not just dance." },
]

const testimonials_col2 = [
    { name: "maria (15)", city: "los angeles", text: "the move library is fire. i can learn new routines whenever and the AI spots mistakes i didn't even know i was making." },
    { name: "david (dad)", city: "houston", text: "love seeing my son's progress tracked so clearly. makes it easy to celebrate how far he's come." },
    { name: "emma (14)", city: "san antonio", text: "i'm super competitive and the challenges keep me coming back to beat my own scores every day." },
    { name: "michael (dad)", city: "dallas", text: "my twins were getting bored with regular dance class. now they're obsessed and always trying to outdo each other!" },
    { name: "sophia (16)", city: "charlotte", text: "getting ready for auditions is way easier now. i can practice my routines perfectly at home on my own time." },
]

const testimonials_col3 = [
    { name: "ben (15)", city: "phoenix", text: "the challenges are so addicting! i've leveled up more in 3 months than in like a whole year of classes." },
    { name: "rachel (mom)", city: "austin", text: "my daughter was super shy before. now she's confident enough to teach her little brother dance moves!" },
    { name: "james (17)", city: "fort worth", text: "preparing for auditions has never been this focused. every session pushes me to get better." },
    { name: "nina (13)", city: "indianapolis", text: "love how it explains exactly what to fix. it's like having the most patient teacher who never gets tired." },
         { name: "kevin (dad)", city: "seattle", text: "best thing we've gotten for the kids. they're more confident, creative, and way more active than before." },
]

// Interactive Help Chat Component
function InteractiveHelpChat() {
  const [userInput, setUserInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState<{feature: string, explanation: string} | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const presetSuggestions = [
    "learning new routines",
    "need motivation to practice",
    "struggling with footwork",
    "wants to nail auditions",
    "asking questions about technique",
    "getting feedback on my moves"
  ];

  const analyzeUserInput = async (prompt: string) => {
    setIsAnalyzing(true);
    setAiResponse(null);
    
    try {
      const response = await fetch('/api/analyze-kid-help', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      setAiResponse(data);
      setSelectedFeature(data.feature);
    } catch (error) {
      console.error('Error analyzing input:', error);
      setAiResponse({
        feature: "live routine",
        explanation: "our AI coach gives real-time feedback to help you nail your moves and build confidence in your dance journey."
      });
      setSelectedFeature("live routine");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      analyzeUserInput(userInput.trim());
    }
  };

  const handlePresetClick = (suggestion: string) => {
    setUserInput(suggestion);
    analyzeUserInput(suggestion);
  };

  const getFeatureData = (featureName: string) => {
    return features.find(f => f.title === featureName) || features[1]; // Default to Live Routine
  };

  return (
    <div className="space-y-8">
      {/* Chat Interface */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <MessageCircle className="w-8 h-8 text-dance-pink" />
          <h3 className="text-3xl font-bold text-white lowercase">what would help you most?</h3>
        </div>

        {/* Preset Suggestions */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {presetSuggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                onClick={() => handlePresetClick(suggestion)}
                className="px-6 py-3 bg-gray-700/50 hover:bg-red-600/50 text-gray-300 hover:text-white rounded-full text-base transition-all duration-300 border border-gray-600/50 hover:border-red-500/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="or something else..."
            className="w-full px-4 py-4 pr-12 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-dance-pink focus:border-dance-pink transition-all lowercase"
            disabled={isAnalyzing}
          />
          <button
            type="submit"
            disabled={isAnalyzing || !userInput.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-dance-pink hover:bg-dance-purple disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            {isAnalyzing ? (
              <Sparkles className="w-5 h-5 text-white animate-spin" />
            ) : (
              <Send className="w-5 h-5 text-white" />
            )}
          </button>
        </form>
      </motion.div>

      {/* AI Response & Feature Display */}
      {aiResponse && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* AI Explanation */}
          <div className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-red-900/30 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-semibold text-white mb-2 lowercase">here's how we can help with "{userInput || 'your challenge'}":</h4>
                <p className="text-gray-300 leading-relaxed lowercase">{aiResponse.explanation}</p>
              </div>
            </div>
          </div>

          {/* Recommended Feature Tile */}
            <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 group hover:border-red-500/50 transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-dance-pink rounded-full"></div>
                <span className="text-sm text-dance-pink font-medium lowercase">perfect for you</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white lowercase">{getFeatureData(selectedFeature!).title}</h3>
              <p className="text-gray-400 mb-6 lowercase">{getFeatureData(selectedFeature!).description}</p>
            </div>
            <div className="h-64 flex items-center justify-center overflow-hidden bg-gray-800/50">
              <img 
                src={getFeatureData(selectedFeature!).image} 
                alt={getFeatureData(selectedFeature!).title}
                className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6 bg-gradient-to-r from-dance-pink/10 to-dance-purple/10">
              <Link href="/early">
                <Button className="w-full bg-gradient-to-r from-dance-pink to-dance-purple hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 lowercase">
                  try {getFeatureData(selectedFeature!).title} now
                </Button>
              </Link>
            </div>
              </motion.div>
            </motion.div>
          )}
    </div>
  );
}

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation - Simplified */}
      <div className="bg-black py-4 px-6 flex justify-between items-center">
        <span className="text-2xl font-bold bg-gradient-to-r from-dance-pink to-dance-purple bg-clip-text text-transparent">moveflow</span>
        <Link href="/auth">
          <Button
            className="bg-gradient-to-r from-dance-pink to-dance-purple text-white hover:opacity-90 px-6 py-3 text-lg font-semibold"
          >
            start dancing
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-dance-purple/80 via-dance-pink/80 to-purple-600/80">
        <div className="relative z-10 px-6 pt-32 pb-20 text-center flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 leading-tight lowercase"
          >
            your AI dance<br />coach
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto lowercase"
          >
            find your flow with personalized AI coaching that vibes with your style and goals.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              variant="outline"
              className="text-white hover:bg-white/10 px-8 py-4 text-xl font-semibold rounded-lg border border-white/30 hover:border-white/50 bg-white/5 lowercase"
              onClick={() => {
                const benefitsSection = document.getElementById('statistics');
                if (benefitsSection) {
                  benefitsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              see results
            </Button>
            <Link href="/auth">
              <Button
                className="bg-white text-black hover:bg-gray-100 px-12 py-6 text-3xl font-semibold rounded-lg border border-white/50 lowercase"
              >
                start dancing
              </Button>
            </Link>
            <Button
              variant="outline"
              className="text-white hover:bg-white/10 px-8 py-4 text-xl font-semibold rounded-lg border border-white/30 hover:border-white/50 bg-white/5 lowercase"
              onClick={() => {
                const testimonialsSection = document.getElementById('testimonials');
                if (testimonialsSection) {
                  testimonialsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              what people say
            </Button>
          </motion.div>
        </div>

        <div className="relative z-10 px-6 pb-20">
          <div className="max-w-4xl mx-auto">
              <img 
                src={coachtProductImage}
                alt="AI Martial Arts Coach" 
                className="w-full h-auto rounded-lg shadow-2xl border-2 border-gray-800/50"
              />
          </div>
        </div>
      </div>

      {/* Cinematic Journey Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/young_martial_artist_kick.png"
            alt="Young Martial Artist Excellence" 
            className="w-full h-full object-cover object-center"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Gradient overlay for cinematic effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
        </div>
        
        {/* Animated Text Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-20%" }}
            className="space-y-8"
          >
            {/* First line - Main headline */}
            <motion.h2
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight lowercase"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-dance-pink via-purple-400 to-dance-purple bg-clip-text text-transparent">
                your journey to
            </span>
              <br />
              <motion.span
                className="text-white"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true }}
              >
                greatness starts now
              </motion.span>
          </motion.h2>

            {/* Second line - Statistics */}
              <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.p
                className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-4 lowercase"
                whileInView={{
                  textShadow: [
                    "0 0 20px rgba(255,255,255,0.5)",
                    "0 0 40px rgba(255,255,255,0.3)",
                    "0 0 20px rgba(255,255,255,0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <span className="bg-gradient-to-r from-yellow-400 via-dance-pink to-dance-purple bg-clip-text text-transparent font-bold">
                  95%
                </span>
                {" "}of dancers level up faster and feel more confident
              </motion.p>
              </motion.div>

            {/* Third line - Call to action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
            viewport={{ once: true }}
          >
              <motion.p
                className="text-3xl md:text-5xl lg:text-6xl text-white font-medium lowercase"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
                viewport={{ once: true }}
              >
                get your own{" "}
                <span className="bg-gradient-to-r from-dance-pink via-purple-400 to-dance-purple bg-clip-text text-transparent font-bold">
                  AI coach
                </span>
                {" "}by your side 24/7
              </motion.p>
            </motion.div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/70 text-left"
          >
            <div className="w-8 h-12 border-2 border-white/50 rounded-full mb-4 relative">
              <motion.div
                className="w-1.5 h-4 bg-white/70 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <p className="text-lg font-medium tracking-wide lowercase">scroll for results</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Statistics Details Section */}
      <div id="statistics" className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center mb-16">
            <motion.div
              className="bg-gradient-to-br from-dance-pink/20 via-dance-pink/10 to-transparent rounded-2xl p-6 border border-dance-pink/30 hover:border-dance-pink/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-dance-pink to-purple-400 bg-clip-text text-transparent mb-2">94%</div>
              <h3 className="text-xl font-bold text-white mb-2 lowercase">see results</h3>
              <p className="text-gray-300 lowercase">
                noticed better moves in just one week.
              </p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-purple-600/20 via-purple-500/10 to-transparent rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-dance-purple bg-clip-text text-transparent mb-2">5x</div>
              <h3 className="text-xl font-bold text-white mb-2 lowercase">more practice</h3>
              <p className="text-gray-300 lowercase">
                dancers practice 5x more at home because it's actually fun.
              </p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-dance-purple/20 via-dance-purple/10 to-transparent rounded-2xl p-6 border border-dance-purple/30 hover:border-dance-purple/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-dance-purple to-pink-400 bg-clip-text text-transparent mb-2">87%</div>
              <h3 className="text-xl font-bold text-white mb-2 lowercase">feel confident</h3>
              <p className="text-gray-300 lowercase">
                dancers say their confidence is way up.
              </p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-pink-600/20 via-pink-500/10 to-transparent rounded-2xl p-6 border border-pink-500/30 hover:border-pink-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-dance-pink bg-clip-text text-transparent mb-2">91%</div>
              <h3 className="text-xl font-bold text-white mb-2 lowercase">nail new moves</h3>
              <p className="text-gray-300 lowercase">
                master new choreography in first 3 sessions.
              </p>
            </motion.div>
          </div>

          {/* Feedback Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-6 h-6 text-dance-pink" />
                <h3 className="text-xl font-bold text-white lowercase">what people are saying:</h3>
              </div>

              <div className="space-y-4 text-gray-300 lowercase">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-dance-pink rounded-full mt-2 flex-shrink-0"></div>
                  <p className="italic">"maya was struggling with hip hop for months. now she's leading the crew after just 3 weeks!"</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-dance-pink rounded-full mt-2 flex-shrink-0"></div>
                  <p className="italic">"kai finally feels confident in class. he actually knows the moves now."</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-dance-pink rounded-full mt-2 flex-shrink-0"></div>
                  <p className="italic">"this saved us from quitting dance. the challenges and tracking really keep them motivated."</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-600 space-y-4">
                <Link href="/auth">
                  <motion.div
                    className="flex items-center justify-center gap-3 text-dance-pink hover:text-purple-400 transition-colors cursor-pointer group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-6 h-6 bg-dance-pink rounded-full flex items-center justify-center group-hover:bg-purple-400 transition-colors">
                      <div className="w-3 h-2 bg-white rounded"></div>
                    </div>
                    <span className="text-2xl font-bold lowercase">join 500+ dancers using moveflow</span>
                  </motion.div>
                </Link>

                <button
                  onClick={() => {
                    const testimonialsSection = document.getElementById('testimonials');
                    if (testimonialsSection) {
                      testimonialsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-400 hover:text-white transition-colors underline text-lg lowercase"
                >
                  see more reviews ↓
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="py-20 px-6 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-gray-400 text-sm mb-12 lowercase tracking-wider">
            dancers everywhere are loving it
          </div>
          <div className="relative flex flex-col gap-4">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10"></div>
            <div className="flex animate-scroll-right">
              {[
                "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
                "Philadelphia", "San Antonio", "San Diego", "Dallas", "Austin",
                "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
                "Philadelphia", "San Antonio", "San Diego", "Dallas", "Austin",
              ].map((city, i) => (
                <div key={i} className="flex-shrink-0 mx-8 text-xl font-semibold text-gray-300">{city}</div>
              ))}
            </div>
            <div className="flex animate-scroll-left">
              {[
                "Jacksonville", "Fort Worth", "Columbus", "Charlotte", "Indianapolis",
                "Seattle", "Denver", "Washington", "Boston", "El Paso",
                "Jacksonville", "Fort Worth", "Columbus", "Charlotte", "Indianapolis",
                "Seattle", "Denver", "Washington", "Boston", "El Paso",
              ].map((city, i) => (
                <div key={i} className="flex-shrink-0 mx-8 text-xl font-semibold text-gray-300">{city}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Help Section */}
      <div id="features" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 lowercase">dance like you mean it</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto lowercase">
              personalized AI coaching designed to help you find your flow and express yourself.
            </p>
          </div>
          
          <InteractiveHelpChat />
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-dance-pink/20 via-dance-purple/20 to-purple-600/20 rounded-2xl blur-3xl"></div>
            <div className="relative bg-gradient-to-r from-dance-pink/10 via-dance-purple/10 to-purple-600/10 rounded-2xl p-12 border border-gray-800">
              <h2 className="text-5xl font-bold mb-6 lowercase">start your journey today</h2>
              <p className="text-xl text-gray-300 mb-8 lowercase">
                level up your dance game with AI-powered coaching that gets you.
                </p>
                <Link href="/early">
                <Button
                  className="bg-gradient-to-r from-dance-pink to-dance-purple text-white hover:opacity-90 px-8 py-3 lowercase"
                >
                  start dancing
                  </Button>
                </Link>
              
              <div className="absolute -bottom-8 right-8">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-purple-500 to-orange-500 rounded-lg transform rotate-12 opacity-80"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="py-20 px-6 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 lowercase">loved by dancers everywhere</h2>
          <p className="text-lg text-gray-400 mb-12 lowercase">
            people all around the world choose moveflow to find their groove.
          </p>
          <div className="relative flex gap-8 h-[600px] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
            <div className="flex flex-col gap-8 animate-scroll-up">
              {[...testimonials_col1, ...testimonials_col1].map((testimonial, i) => (
                <div key={i} className="bg-white/5 p-6 rounded-lg border border-white/10">
                  <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                  <div className="text-sm text-gray-400 font-semibold">{testimonial.name}, {testimonial.city}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-8 animate-scroll-down">
              {[...testimonials_col2, ...testimonials_col2].map((testimonial, i) => (
                <div key={i} className="bg-white/5 p-6 rounded-lg border border-white/10">
                  <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                  <div className="text-sm text-gray-400 font-semibold">{testimonial.name}, {testimonial.city}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-8 animate-scroll-up">
              {[...testimonials_col3, ...testimonials_col3].map((testimonial, i) => (
                <div key={i} className="bg-white/5 p-6 rounded-lg border border-white/10">
                  <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                  <div className="text-sm text-gray-400 font-semibold">{testimonial.name}, {testimonial.city}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Demo Button Section */}
      <div className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-dance-pink via-dance-purple to-purple-600 rounded-2xl blur-xl opacity-75 animate-pulse"></div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link href="/early">
                <Button
                  className="bg-gradient-to-r from-dance-pink via-dance-purple to-purple-600 text-white hover:from-pink-600 hover:via-purple-600 hover:to-purple-700 px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl border-2 border-white/20 transform transition-all duration-300 hover:shadow-3xl lowercase"
                >
                  🎵 start dancing now
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex justify-center items-center text-center">
          <p className="text-gray-400 text-sm lowercase">
            questions? reach out to <a href="mailto:okandy@uw.edu" className="text-dance-pink underline">okandy@uw.edu</a> anytime.
          </p>
        </div>
      </footer>
    </div>
  );
}