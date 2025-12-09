import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

export default function Welcome() {
  const [, navigate] = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: 'student', password: password.toLowerCase().trim() }),
      });

      if (response.ok) {
        window.location.href = '/app';
      } else {
        setError('incorrect password');
      }
    } catch (err) {
      setError('login failed');
    }
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Class Schedule', path: '/class-schedule' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Student Portal', path: null, onClick: () => setShowLogin(true) }
  ];

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Stage Background Image */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(/images/ark-stage-bg.png)',
            backgroundPosition: 'center 40%'
          }}
        />
        {/* Vibrant purple/pink overlay for aesthetic look */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-fuchsia-900/30 to-purple-950/70" />
        {/* Animated glow effects for liveliness */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-fuchsia-500/25 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute top-[30%] right-[5%] w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-[10%] left-[20%] w-[350px] h-[350px] bg-pink-500/20 rounded-full blur-[90px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-[30%] right-[25%] w-[300px] h-[300px] bg-violet-400/15 rounded-full blur-[70px] animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

      {/* Header with Logo and Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 w-full px-6 md:px-12 py-6"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img 
              src="/images/ark_logo.png" 
              alt="ARK Dance Studio" 
              className="h-20 md:h-28 w-auto"
            />
          </motion.div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-3">
            {navItems.map((item, idx) => (
              <motion.button
                key={item.label}
                onClick={item.onClick || (() => navigate(item.path!))}
                className="px-6 py-2.5 text-sm font-bold text-white/90 hover:text-white hover:bg-pink-500/30 transition-all rounded-full border border-white/20 hover:border-pink-400/50 bg-black/30 backdrop-blur-md shadow-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        className="relative z-10 min-h-[85vh] flex items-center justify-center px-6 md:px-12"
      >
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 
              className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight"
              style={{
                background: 'linear-gradient(to right, #f9a8d4, #ffffff, #e879f9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 30px rgba(236,72,153,0.5))'
              }}
            >
              ARK Dance Studio
            </h1>
            <p className="text-2xl md:text-3xl text-pink-200 font-light tracking-wide drop-shadow-lg">
              The Leading AI Dance Studio
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed"
          >
            ARK Dance Studio Uses AI To Analyze Your Movement In Real-Time.
            <br />
            Upload A Routine. Practice Live. Perfect Your Technique.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex gap-4 justify-center pt-6 flex-wrap"
          >
            <motion.button
              onClick={() => navigate('/live-routine')}
              className="group relative px-10 py-4 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-white rounded-full text-lg font-semibold overflow-hidden shadow-xl shadow-pink-500/50"
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(236, 72, 153, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">✨ Start Practicing</span>
            </motion.button>
            <motion.button
              onClick={() => navigate('/challenges')}
              className="px-10 py-4 border-2 border-pink-400/60 text-white bg-white/10 backdrop-blur-md rounded-full text-lg font-semibold hover:bg-pink-500/30 hover:border-pink-300 transition-all shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎯 View Challenges
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-medium text-white mb-4">
              Your Studio. Everywhere.
            </h2>
            <p className="text-xl text-pink-300 max-w-2xl mx-auto">
              Practice At 3 AM. Get Instant Feedback. Track Every Improvement.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎥',
                title: 'Live Analysis',
                description: 'Real-Time Pose Tracking That Follows Every Movement With Precision'
              },
              {
                icon: '✨',
                title: 'AI Feedback',
                description: 'Intelligent Coaching That Adapts To Your Style And Highlights Improvements'
              },
              {
                icon: '🎯',
                title: 'Perfect Practice',
                description: 'Upload References, Compare Your Form, Refine Your Technique Frame By Frame'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative bg-white/95 backdrop-blur-lg border border-pink-200 rounded-3xl p-8 overflow-hidden shadow-xl shadow-purple-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ARK AI Section */}
      <section className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-medium text-white mb-4">
              Meet ARK AI
            </h2>
            <p className="text-2xl text-pink-300 font-light">
              Your Personal AI Dance Coach
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-white/90 backdrop-blur-lg border border-pink-200 rounded-3xl p-8 shadow-xl shadow-purple-500/20">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Advanced Pose Analysis</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  ARK AI uses cutting-edge computer vision to track every movement in real-time. 
                  Get instant, precise feedback on your form, posture, and technique.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-pink-500 mt-1 font-bold">✓</span>
                    <span>Real-time joint angle tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-500 mt-1 font-bold">✓</span>
                    <span>Personalized improvement suggestions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-500 mt-1 font-bold">✓</span>
                    <span>Progress tracking over time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-500 mt-1 font-bold">✓</span>
                    <span>Encouraging, age-appropriate feedback</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-3xl p-8 shadow-xl shadow-pink-500/30">
                <h3 className="text-2xl font-medium mb-4">Try ARK AI Free</h3>
                <p className="text-lg mb-6 opacity-90">
                  Experience the future of dance training. No credit card required.
                </p>
                <motion.button
                  onClick={() => navigate('/live-routine')}
                  className="w-full py-4 bg-white text-pink-600 rounded-2xl text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Free Trial →
                </motion.button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { number: '10K+', label: 'Analyses' },
                  { number: '95%', label: 'Accuracy' },
                  { number: '24/7', label: 'Available' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="bg-purple-900/60 backdrop-blur-lg border border-purple-400/30 rounded-2xl p-4 text-center shadow-lg"
                  >
                    <div className="text-3xl font-bold text-pink-300">{stat.number}</div>
                    <div className="text-sm text-purple-100 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Parents Choose ARK */}
      <section className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-medium text-white mb-4">
              Why Parents Choose ARK
            </h2>
            <p className="text-xl text-pink-300 max-w-2xl mx-auto">
              Safe, Professional, Results-Driven Dance Education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '📊',
                title: 'Track Progress',
                description: 'Visual reports show improvement over time with detailed metrics'
              },
              {
                icon: '🔒',
                title: 'Safe & Secure',
                description: 'No social features, privacy-first design, parent controls'
              },
              {
                icon: '💰',
                title: 'Great Value',
                description: 'Unlimited practice at a fraction of studio costs'
              },
              {
                icon: '🎓',
                title: 'Expert-Led',
                description: 'Created by professional dance instructor Arshia Kathpalia'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-purple-900/50 backdrop-blur-lg border border-purple-400/30 rounded-3xl p-6 shadow-xl shadow-purple-500/20 text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-purple-100">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-medium text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-pink-300">
              Hear From Our Dancing Community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                role: 'Parent',
                text: 'My daughter practices every day now! The AI feedback is amazing and she loves seeing her progress. Best investment we\'ve made.',
                rating: 5
              },
              {
                name: 'Emily R.',
                role: 'Student, Age 14',
                text: 'ARK AI is like having a coach in my room 24/7. I\'ve improved so much and my recital went perfectly!',
                rating: 5
              },
              {
                name: 'Michael T.',
                role: 'Parent',
                text: 'Safe, educational, and my son is actually excited to practice. The progress tracking helps us see real improvement.',
                rating: 5
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white/95 backdrop-blur-lg border border-pink-200 rounded-3xl p-8 shadow-xl shadow-purple-500/20"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-xl drop-shadow">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t border-pink-200 pt-4">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-pink-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="relative z-10 py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/95 backdrop-blur-lg border border-pink-200 rounded-3xl p-8 shadow-xl shadow-purple-500/20"
          >
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-pink-500 mb-2">1,000+</div>
                <div className="text-gray-600">Active Dancers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-gray-600">Happy Parents</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-fuchsia-500 mb-2">4.9★</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">💯</div>
                <div className="text-gray-600">Money-Back Guarantee</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center bg-white/95 backdrop-blur-lg border border-pink-200 rounded-3xl p-12 md:p-16 shadow-xl shadow-purple-500/20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ready To Start?
            </h2>
            <p className="text-xl text-pink-500 font-medium mb-8">
              Be Seen. Be Understood. Be Better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => navigate('/registration')}
                className="px-10 py-4 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-white rounded-full text-lg font-semibold shadow-xl shadow-pink-500/40"
                whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(236, 72, 153, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
              </motion.button>
              <motion.a
                href="mailto:arshia.x.kathpalia@gmail.com"
                className="inline-block px-10 py-4 border-2 border-purple-300 text-purple-600 bg-white rounded-full text-lg font-semibold hover:bg-purple-50 hover:border-purple-400 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-pink-500/20 py-12 px-6 md:px-12 bg-black/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="text-gray-400 text-sm">© 2025 ARK Dance Studio</div>
          <div className="flex gap-6">
            <button onClick={() => navigate('/about')} className="text-gray-400 hover:text-pink-400 text-sm transition-colors">About</button>
            <a href="mailto:arshia.x.kathpalia@gmail.com" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowLogin(false);
            setPassword('');
            setError('');
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-black/80 backdrop-blur-xl border border-pink-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-pink-500/20"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium text-white">Student Portal</h2>
              <button
                onClick={() => {
                  setShowLogin(false);
                  setPassword('');
                  setError('');
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-pink-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-pink-500/30 text-white rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-colors placeholder-gray-500"
                  placeholder="Enter Password"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-sm text-pink-400">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-medium hover:shadow-lg hover:shadow-pink-500/40 transition-all"
              >
                Log In
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
