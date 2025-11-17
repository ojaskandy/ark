import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const menuItems = [
  {
    label: 'Live Routine',
    target: '/live-routine',
    icon: '🎥',
    description: 'Practice with AI feedback',
  },
  {
    label: 'Challenges',
    target: '/challenges',
    icon: '⚡',
    description: 'Quick drills',
  }
];

export default function MainPage() {
  const [, navigate] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/user', { credentials: 'include' });
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          window.location.href = '/';
        }
      } catch {
        window.location.href = '/';
      }
    };
    checkAuth();
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-gray-950 to-orange-500/10" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="md:w-72 w-full border-b md:border-b-0 md:border-r border-gray-800 bg-gray-900/50 backdrop-blur-xl px-6 py-8"
        >
          <div className="mb-12">
            <h1 className="text-2xl font-bold text-white mb-1">ARK</h1>
            <p className="text-sm text-gray-500">Dance Studio</p>
          </div>

          <nav className="space-y-3">
            {menuItems.map((item, idx) => (
              <motion.button
                key={item.label}
                onClick={() => navigate(item.target)}
                className="w-full group relative bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-pink-500/50 rounded-2xl px-4 py-4 transition-all overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-orange-500/0 group-hover:from-pink-500/10 group-hover:to-orange-500/10 transition-all duration-300" />
                <div className="relative flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="text-left flex-1">
                    <p className="text-white font-medium">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Welcome back</h2>
              <p className="text-xl text-gray-400">Ready to practice?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {menuItems.map((item, idx) => (
                <motion.button
                  key={item.label}
                  onClick={() => navigate(item.target)}
                  className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl border border-gray-800 hover:border-pink-500/50 rounded-3xl p-8 transition-all overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-orange-500/0 to-pink-500/0 group-hover:from-pink-500/10 group-hover:via-orange-500/5 group-hover:to-pink-500/10 transition-all duration-500" />
                  <div className="relative z-10 text-left space-y-4">
                    <div className="text-5xl">{item.icon}</div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{item.description}</p>
                      <p className="text-2xl text-white font-semibold">{item.label}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
