import React from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const danceChallenges = [
  {
    id: 1,
    title: 'eight-count resets',
    description: 'hit the same combo at 3 tempos back-to-back',
    icon: '🎵',
  },
  {
    id: 2,
    title: 'floor glide loop',
    description: 'practice low-level transitions',
    icon: '🌊',
  },
  {
    id: 3,
    title: 'precision snaps',
    description: 'lock shapes on counts 1 + 3 only',
    icon: '⚡',
  },
  {
    id: 4,
    title: 'performance sprint',
    description: '60 seconds, max energy',
    icon: '🔥',
  }
];

const Challenges: React.FC = () => {
  const [, navigate] = useLocation();

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

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 border-b border-gray-200/50 bg-white/70 backdrop-blur px-6 py-4 flex items-center"
      >
        <button
          onClick={() => navigate('/app')}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> back
        </button>
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-6xl font-medium text-gray-800">challenges</h1>
            <p className="text-xl text-gray-600">quick drills when you have 10 minutes</p>
          </motion.header>

          <div className="grid md:grid-cols-2 gap-6">
            {danceChallenges.map((challenge, idx) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative bg-white/70 backdrop-blur-xl border border-gray-200/50 hover:border-pink-200 rounded-3xl p-8 cursor-pointer shadow-lg shadow-pink-100/20"
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{challenge.icon}</div>
                  </div>
                  <h3 className="text-2xl font-medium text-gray-800 mb-3">{challenge.title}</h3>
                  <p className="text-gray-600">{challenge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
