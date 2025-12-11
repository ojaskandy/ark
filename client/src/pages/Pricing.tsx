import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

export default function Pricing() {
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
      {/* Stage Background Image - Consistent with other pages */}
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
              className="h-16 md:h-20 w-auto"
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

      {/* Pricing Content */}
      <motion.section
        className="relative z-10 py-20 px-6 md:px-12"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-black/60 backdrop-blur-sm px-8 py-4 rounded-xl mb-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                Simple Pricing
              </h1>
            </div>
            <p className="text-xl text-white max-w-2xl mx-auto" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
              Start your dance journey today. No hidden fees. Cancel anytime.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Drop-in Class */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white/95 backdrop-blur-lg border border-gray-200 rounded-3xl p-8 shadow-xl"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">💃</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Drop-In Class</h2>
                <p className="text-gray-600 mb-6">Perfect for trying us out or flexible schedules</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">$20</span>
                  <span className="text-gray-500 text-lg">/class</span>
                </div>

                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="text-pink-500 font-bold">✓</span>
                    <span>Single class access</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="text-pink-500 font-bold">✓</span>
                    <span>Full AI coaching during class</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="text-pink-500 font-bold">✓</span>
                    <span>No commitment required</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="text-pink-500 font-bold">✓</span>
                    <span>Great way to try ARK</span>
                  </li>
                </ul>

                <motion.a
                  href="mailto:arshia.x.kathpalia@gmail.com?subject=Drop-In Class Inquiry"
                  className="block w-full py-4 border-2 border-pink-500 text-pink-600 rounded-2xl font-semibold hover:bg-pink-50 transition-all text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book a Drop-In
                </motion.a>
              </div>
            </motion.div>

            {/* Monthly Membership - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="relative bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-8 shadow-2xl text-white overflow-hidden"
            >
              {/* Popular badge */}
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                ⭐ Best Value
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">🌟</div>
                <h2 className="text-2xl font-bold mb-2">Monthly Membership</h2>
                <p className="text-white/80 mb-6">4 classes per month — the perfect routine</p>
                
                <div className="mb-2">
                  <span className="text-5xl font-bold">$60</span>
                  <span className="text-white/70 text-lg">/month</span>
                </div>
                <p className="text-white/60 text-sm mb-6">That's only $15 per class!</p>

                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-center gap-3">
                    <span className="font-bold">✓</span>
                    <span>4 classes every month</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="font-bold">✓</span>
                    <span>Unlimited AI practice at home</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="font-bold">✓</span>
                    <span>Progress tracking & reports</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="font-bold">✓</span>
                    <span>Priority booking</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="font-bold">✓</span>
                    <span>Save $20 vs drop-in rates</span>
                  </li>
                </ul>

                <motion.a
                  href="mailto:arshia.x.kathpalia@gmail.com?subject=Monthly Membership Inquiry"
                  className="block w-full py-4 bg-white text-pink-600 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Monthly Membership
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 text-center bg-white/95 backdrop-blur-lg border border-gray-200 rounded-3xl p-10 shadow-xl max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Questions? Let's Talk!
            </h3>
            <p className="text-gray-600 mb-6">
              Have questions about our classes, pricing, or special offers? We'd love to hear from you. 
              Reach out anytime — we're here to help you find the perfect fit for your dance journey.
            </p>
            <motion.a
              href="mailto:arshia.x.kathpalia@gmail.com?subject=ARK Dance Studio Inquiry"
              className="inline-block px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-lg font-semibold shadow-xl"
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(236, 72, 153, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              📧 Contact Us
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

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
