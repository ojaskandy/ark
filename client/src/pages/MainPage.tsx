import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const menuItems = [
  {
    label: 'Live Routine',
    target: '/live-routine',
    icon: '🎥',
    description: 'Practice With AI Feedback',
  },
  {
    label: 'Challenges',
    target: '/challenges',
    icon: '⚡',
    description: 'Quick Drills',
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
    <div className="min-h-screen bg-purple-50/30">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-85"
          style={{ backgroundImage: 'url(/images/dance-studio.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 via-royal-purple/10 to-pink-50/30" />
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
            <img 
              src="/images/ark_logo.png" 
              alt="ARK Dance Studio" 
              className="h-16 w-auto mb-2"
            />
            <p className="text-sm text-royal-purple-light">Dance Studio</p>
          </div>

          <nav className="space-y-3">
            {menuItems.map((item, idx) => (
              <motion.button
                key={item.label}
                onClick={() => navigate(item.target)}
                className="w-full group relative bg-white/60 hover:bg-white/90 border border-royal-purple-light/30 hover:border-royal-purple rounded-2xl px-4 py-4 transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="text-left flex-1">
                    <p className="text-royal-purple-dark font-medium">{item.label}</p>
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
              <h2 className="text-5xl md:text-6xl font-medium text-gray-800">Welcome Back</h2>
              <p className="text-xl text-royal-purple">Ready To Practice?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {menuItems.map((item, idx) => (
                <motion.button
                  key={item.label}
                  onClick={() => navigate(item.target)}
                  className="group relative bg-white/70 backdrop-blur-xl border border-royal-purple-light/30 hover:border-royal-purple rounded-3xl p-8 transition-all shadow-lg shadow-royal-purple/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <div className="relative z-10 text-left space-y-4">
                    <div className="text-5xl">{item.icon}</div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{item.description}</p>
                      <p className="text-2xl text-royal-purple-dark font-medium">{item.label}</p>
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
