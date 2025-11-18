import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

export default function ClassSchedule() {
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

  const schedule = [
    { day: 'Monday', time: '6:00 PM - 7:30 PM', class: 'Contemporary Dance', level: 'Intermediate' },
    { day: 'Tuesday', time: '5:00 PM - 6:30 PM', class: 'Ballet Fundamentals', level: 'Beginner' },
    { day: 'Wednesday', time: '6:00 PM - 7:30 PM', class: 'Hip Hop', level: 'All Levels' },
    { day: 'Thursday', time: '5:00 PM - 6:30 PM', class: 'Jazz Dance', level: 'Intermediate' },
    { day: 'Friday', time: '6:00 PM - 7:30 PM', class: 'Modern Dance', level: 'Advanced' },
    { day: 'Saturday', time: '10:00 AM - 11:30 AM', class: 'Ballet Technique', level: 'All Levels' },
    { day: 'Saturday', time: '2:00 PM - 3:30 PM', class: 'Choreography Workshop', level: 'Advanced' }
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

      {/* Class Schedule Content */}
      <motion.section
        className="relative z-10 py-20 px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-7xl font-medium text-gray-800 mb-6">
              Class Schedule
            </h1>
            <p className="text-2xl text-royal-purple font-light">
              Find Your Perfect Class
            </p>
          </motion.div>

          {/* Schedule Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedule.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white/70 backdrop-blur-md border border-royal-purple-light/30 rounded-3xl p-8 shadow-lg shadow-royal-purple/10"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-medium text-royal-purple">{item.day}</span>
                    <span className="text-sm px-3 py-1 bg-royal-purple/10 text-royal-purple-dark rounded-full">
                      {item.level}
                    </span>
                  </div>
                  <div className="text-lg text-gray-600">{item.time}</div>
                  <div className="text-xl font-medium text-gray-800">{item.class}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center bg-white/70 backdrop-blur-md border border-royal-purple-light/50 rounded-3xl p-12 shadow-xl shadow-royal-purple/20"
          >
            <h2 className="text-3xl font-medium text-gray-800 mb-4">
              Ready To Join?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Register for classes today and start your dance journey with ARK.
            </p>
            <motion.button
              onClick={() => navigate('/registration')}
              className="px-10 py-4 bg-gradient-to-r from-royal-purple to-royal-purple-light text-white rounded-full text-lg font-medium shadow-lg shadow-royal-purple/50"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(120, 81, 169, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

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
