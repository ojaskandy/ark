import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const menuItems = [
  {
    label: 'live routine',
    target: '/live-routine',
    icon: '🎥',
    description: 'practice with ai feedback',
  },
  {
    label: 'challenges',
    target: '/challenges',
    icon: '⚡',
    description: 'quick drills',
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
    <div className="min-h-screen bg-rose-50/30">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(/images/dance-studio.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/90 via-rose-50/80 to-orange-50/90" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="md:w-72 w-full border-b md:border-b-0 md:border-r border-gray-200/50 bg-white/70 backdrop-blur-xl px-6 py-8"
        >
          <div className="mb-12">
            <h1 className="text-2xl font-medium text-gray-800 mb-1">ark</h1>
            <p className="text-sm text-gray-500">dance studio</p>
          </div>

          <nav className="space-y-3">
            {menuItems.map((item, idx) => (
              <motion.button
                key={item.label}
                onClick={() => navigate(item.target)}
                className="w-full group relative bg-white/60 hover:bg-white/90 border border-gray-200/50 hover:border-pink-200 rounded-2xl px-4 py-4 transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="text-left flex-1">
                    <p className="text-gray-800 font-medium">{item.label}</p>
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
              <h2 className="text-5xl md:text-6xl font-medium text-gray-800">welcome back</h2>
              <p className="text-xl text-gray-600">ready to practice?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {menuItems.map((item, idx) => (
                <motion.button
                  key={item.label}
                  onClick={() => navigate(item.target)}
                  className="group relative bg-white/70 backdrop-blur-xl border border-gray-200/50 hover:border-pink-200 rounded-3xl p-8 transition-all shadow-lg shadow-pink-100/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <div className="relative z-10 text-left space-y-4">
                    <div className="text-5xl">{item.icon}</div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{item.description}</p>
                      <p className="text-2xl text-gray-800 font-medium">{item.label}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
