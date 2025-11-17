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

  return (
    <div className="min-h-screen bg-rose-50/30 overflow-x-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{ 
            backgroundImage: 'url(/images/dance-studio.png)',
            filter: 'blur(0px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/40 via-pink-50/30 to-orange-50/40" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 w-full px-6 md:px-12 py-8 flex justify-between items-center"
      >
        <motion.div
          className="text-2xl font-medium text-gray-800 tracking-tight"
          whileHover={{ scale: 1.02 }}
        >
          ark
        </motion.div>
        <motion.button
          onClick={() => setShowLogin(true)}
          className="px-5 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors rounded-full border border-gray-300 hover:border-gray-400 bg-white/60 backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          student portal
        </motion.button>
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
              dance better.
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 font-light">
              the leading ai dance studio
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
          >
            ark dance studio uses ai to analyze your movement in real-time.
            <br />
            upload a routine. practice live. perfect your technique.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex gap-4 justify-center pt-6"
          >
            <motion.button
              onClick={() => navigate('/live-routine')}
              className="group relative px-10 py-4 bg-gradient-to-r from-pink-300 to-orange-300 text-white rounded-full text-lg font-medium overflow-hidden shadow-lg shadow-pink-200/50"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(251, 207, 232, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">start practicing</span>
            </motion.button>
            <motion.button
              onClick={() => navigate('/challenges')}
              className="px-10 py-4 border border-gray-300 text-gray-700 bg-white/60 backdrop-blur-sm rounded-full text-lg font-medium hover:bg-white/80 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              view challenges
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
              your studio. everywhere.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              practice at 3 am. get instant feedback. track every improvement.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎥',
                title: 'live analysis',
                description: 'real-time pose tracking that follows every movement with precision'
              },
              {
                icon: '✨',
                title: 'ai feedback',
                description: 'intelligent coaching that adapts to your style and highlights improvements'
              },
              {
                icon: '🎯',
                title: 'perfect practice',
                description: 'upload references, compare your form, refine your technique frame by frame'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-3xl p-8 overflow-hidden shadow-lg shadow-pink-100/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50/0 to-orange-50/0 group-hover:from-pink-50/50 group-hover:to-orange-50/50 transition-all duration-500" />
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

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-3xl p-12 md:p-16 shadow-xl shadow-pink-100/30"
          >
            <h2 className="text-4xl md:text-5xl font-medium text-gray-800 mb-4">
              get started for free
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              be seen. be understood. be better.
            </p>
            <motion.button
              onClick={() => navigate('/live-routine')}
              className="px-10 py-4 bg-gradient-to-r from-pink-300 to-orange-300 text-white rounded-full text-lg font-medium shadow-lg shadow-pink-200/50"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(251, 207, 232, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              try ark free
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200/50 py-12 px-6 md:px-12 bg-white/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="text-gray-500 text-sm">© 2025 ark dance studio</div>
          <div className="flex gap-6">
            <button className="text-gray-500 hover:text-gray-700 text-sm transition-colors">about</button>
            <button className="text-gray-500 hover:text-gray-700 text-sm transition-colors">contact</button>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-pink-100/40 backdrop-blur-lg flex items-center justify-center z-50 p-4"
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
            className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-pink-200/20"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium text-gray-800">student portal</h2>
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
                <label className="block text-sm text-gray-600 mb-2">password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 text-gray-800 rounded-2xl focus:outline-none focus:border-pink-300 transition-colors"
                  placeholder="enter password"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-sm text-gray-500">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-pink-300 to-orange-300 text-white rounded-2xl font-medium hover:shadow-lg hover:shadow-pink-200/50 transition-all"
              >
                log in
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
