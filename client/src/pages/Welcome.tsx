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
    { label: 'Registration', path: '/registration' },
    { label: 'Student Portal', path: null, onClick: () => setShowLogin(true) }
  ];

  return (
    <div className="min-h-screen bg-purple-50/30 overflow-x-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{ 
            backgroundImage: 'url(/images/dance-studio.png)',
            filter: 'blur(0px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/40 via-royal-purple/10 to-pink-50/40" />
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
              className="h-16 md:h-20 w-auto"
            />
          </motion.div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-3">
            {navItems.map((item, idx) => (
              <motion.button
                key={item.label}
                onClick={item.onClick || (() => navigate(item.path!))}
                className="px-6 py-2.5 text-sm font-medium text-royal-purple-dark hover:text-white hover:bg-royal-purple transition-all rounded-full border border-royal-purple-light hover:border-royal-purple bg-white/60 backdrop-blur-sm shadow-sm"
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
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-medium text-gray-800 leading-none tracking-tight">
              ARK Dance Studio
            </h1>
            <p className="text-2xl md:text-3xl text-royal-purple font-light">
              The Leading AI Dance Studio
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
          >
            ARK Dance Studio Uses AI To Analyze Your Movement In Real-Time.
            <br />
            Upload A Routine. Practice Live. Perfect Your Technique.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex gap-4 justify-center pt-6"
          >
            <motion.button
              onClick={() => navigate('/live-routine')}
              className="group relative px-10 py-4 bg-gradient-to-r from-royal-purple to-royal-purple-light text-white rounded-full text-lg font-medium overflow-hidden shadow-lg shadow-royal-purple/50"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(120, 81, 169, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Start Practicing</span>
            </motion.button>
            <motion.button
              onClick={() => navigate('/challenges')}
              className="px-10 py-4 border border-royal-purple-light text-royal-purple-dark bg-white/60 backdrop-blur-sm rounded-full text-lg font-medium hover:bg-white/80 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Challenges
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
            <h2 className="text-5xl md:text-6xl font-medium text-gray-800 mb-4">
              Your Studio. Everywhere.
            </h2>
            <p className="text-xl text-royal-purple max-w-2xl mx-auto">
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
                className="group relative bg-white/70 backdrop-blur-md border border-royal-purple-light/30 rounded-3xl p-8 overflow-hidden shadow-lg shadow-royal-purple/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-royal-purple/0 group-hover:from-purple-50/50 group-hover:to-royal-purple/20 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-medium text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
            className="text-center bg-white/70 backdrop-blur-md border border-royal-purple-light/50 rounded-3xl p-12 md:p-16 shadow-xl shadow-royal-purple/20"
          >
            <h2 className="text-4xl md:text-5xl font-medium text-gray-800 mb-4">
              Contact Us
            </h2>
            <p className="text-xl text-royal-purple mb-8">
              Be Seen. Be Understood. Be Better.
            </p>
            <motion.a
              href="mailto:arshia.x.kathpalia@gmail.com"
              className="inline-block px-10 py-4 bg-gradient-to-r from-royal-purple to-royal-purple-light text-white rounded-full text-lg font-medium shadow-lg shadow-royal-purple/50"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(120, 81, 169, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-royal-purple-light/30 py-12 px-6 md:px-12 bg-white/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="text-gray-500 text-sm">© 2025 ARK Dance Studio</div>
          <div className="flex gap-6">
            <button onClick={() => navigate('/about')} className="text-gray-500 hover:text-royal-purple text-sm transition-colors">About</button>
            <a href="mailto:arshia.x.kathpalia@gmail.com" className="text-gray-500 hover:text-royal-purple text-sm transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-royal-purple/20 backdrop-blur-lg flex items-center justify-center z-50 p-4"
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
            className="bg-white/90 backdrop-blur-xl border border-royal-purple-light/50 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-royal-purple/30"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium text-royal-purple">Student Portal</h2>
              <button
                onClick={() => {
                  setShowLogin(false);
                  setPassword('');
                  setError('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-royal-purple mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/80 border border-royal-purple-light text-gray-800 rounded-2xl focus:outline-none focus:border-royal-purple transition-colors"
                  placeholder="Enter Password"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-sm text-gray-500">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-royal-purple to-royal-purple-light text-white rounded-2xl font-medium hover:shadow-lg hover:shadow-royal-purple/50 transition-all"
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
