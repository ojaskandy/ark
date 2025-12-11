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
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div 
          className="absolute bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(/images/ark-stage-bg.png)',
            backgroundPosition: 'center 40%',
            top: '-2.5%',
            left: '-2.5%',
            right: '-2.5%',
            bottom: '-2.5%',
            width: '105%',
            height: '105%'
          }}
        />
        {/* Subtle dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
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

          {/* Navigation - Light themed buttons */}
          <nav className="flex flex-wrap items-center justify-center gap-3">
            {navItems.map((item, idx) => (
              <motion.button
                key={item.label}
                onClick={item.onClick || (() => navigate(item.path!))}
                className="px-6 py-2.5 text-sm font-semibold text-gray-800 hover:text-pink-600 bg-white/90 backdrop-blur-md rounded-full border border-pink-200 hover:border-pink-400 hover:bg-white shadow-lg transition-all"
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
            {/* Title with dark background for contrast */}
            <div className="inline-block bg-black/60 backdrop-blur-sm px-8 py-6 rounded-2xl">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight text-white">
                ARK Dance Studio
              </h1>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-white max-w-3xl mx-auto font-light leading-relaxed"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
          >
            AI-Powered Dance Training. Upload A Routine. Practice Live. Perfect Your Technique.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex gap-4 justify-center pt-6 flex-wrap"
          >
            <motion.button
              onClick={() => setShowLogin(true)}
              className="group relative px-10 py-4 bg-white text-gray-900 rounded-full text-lg font-semibold overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">✨ Start Practicing</span>
            </motion.button>
            <motion.button
              onClick={() => navigate('/challenges')}
              className="px-10 py-4 border-2 border-white/80 text-white bg-white/10 backdrop-blur-md rounded-full text-lg font-semibold hover:bg-white/20 transition-all shadow-lg"
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
            {/* White title with dark background for contrast */}
            <div className="inline-block bg-black/60 backdrop-blur-sm px-8 py-4 rounded-xl mb-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Your Studio. Everywhere.
              </h2>
            </div>
            <p className="text-xl text-white max-w-2xl mx-auto" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
              Practice Anytime. Get Instant Feedback. Track Every Improvement.
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
                className="group relative bg-white/95 backdrop-blur-lg border border-gray-200 rounded-3xl p-8 overflow-hidden shadow-xl"
              >
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

      {/* ARK AI Section - Simplified */}
      <section className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/95 backdrop-blur-lg border border-gray-200 rounded-3xl p-10 shadow-xl"
          >
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🤖</div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet ARK AI</h2>
              <p className="text-xl text-gray-600">Your Personal AI Dance Coach</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Advanced Pose Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  ARK AI uses cutting-edge computer vision to track every movement in real-time. 
                  Get instant, precise feedback on your form, posture, and technique.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-pink-500 font-bold">✓</span>
                    <span>Real-time joint angle tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-500 font-bold">✓</span>
                    <span>Personalized improvement suggestions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-500 font-bold">✓</span>
                    <span>Progress tracking over time</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Why It Works</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-pink-50 rounded-2xl p-4 text-center border border-pink-100">
                    <div className="text-3xl font-bold text-pink-600">95%</div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-4 text-center border border-purple-100">
                    <div className="text-3xl font-bold text-purple-600">24/7</div>
                    <div className="text-sm text-gray-600">Available</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Our AI coach provides encouraging, age-appropriate feedback for dancers of all levels.
                </p>
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
            className="text-center bg-white/95 backdrop-blur-lg border border-gray-200 rounded-3xl p-12 md:p-16 shadow-xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ready To Start?
            </h2>
            <p className="text-xl text-gray-600 font-medium mb-8">
              Be Seen. Be Understood. Be Better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => setShowLogin(true)}
                className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-lg font-semibold shadow-xl"
                whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(236, 72, 153, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
              <motion.a
                href="mailto:arshia.x.kathpalia@gmail.com"
                className="inline-block px-10 py-4 border-2 border-gray-300 text-gray-700 bg-white rounded-full text-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all"
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
      <footer className="relative z-10 border-t border-white/10 py-12 px-6 md:px-12 bg-black/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="text-white/70 text-sm">© 2025 ARK Dance Studio</div>
          <div className="flex gap-6">
            <button onClick={() => navigate('/about')} className="text-white/70 hover:text-white text-sm transition-colors">About</button>
            <a href="mailto:arshia.x.kathpalia@gmail.com" className="text-white/70 hover:text-white text-sm transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Login Modal - Light themed */}
      {showLogin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4"
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
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-200"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Student Portal</h2>
              <button
                onClick={() => {
                  setShowLogin(false);
                  setPassword('');
                  setError('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2 font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-colors placeholder-gray-400"
                  placeholder="Enter Password"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
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
