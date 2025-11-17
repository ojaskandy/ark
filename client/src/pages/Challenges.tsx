import React from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const danceChallenges = [
  {
    id: 1,
    title: 'Eight-Count Resets',
    description: 'Hit the same combo at 3 tempos back-to-back',
    icon: '🎵',
  },
  {
    id: 2,
    title: 'Floor Glide Loop',
    description: 'Practice low-level transitions',
    icon: '🌊',
  },
  {
    id: 3,
    title: 'Precision Snaps',
    description: 'Lock shapes on counts 1 + 3 only',
    icon: '⚡',
  },
  {
    id: 4,
    title: 'Performance Sprint',
    description: '60 seconds, max energy',
    icon: '🔥',
  }
];

const Challenges: React.FC = () => {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-gray-950 to-orange-500/10" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 border-b border-gray-800 bg-gray-900/30 backdrop-blur px-6 py-4 flex items-center"
      >
        <button
          onClick={() => navigate('/app')}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
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
            <h1 className="text-5xl md:text-6xl font-bold text-white">Challenges</h1>
            <p className="text-xl text-gray-400">Quick drills when you have 10 minutes</p>
          </motion.header>

          <div className="grid md:grid-cols-2 gap-6">
            {danceChallenges.map((challenge, idx) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-800 hover:border-pink-500/50 rounded-3xl p-8 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-orange-500/0 group-hover:from-pink-500/10 group-hover:to-orange-500/10 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{challenge.icon}</div>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">{challenge.title}</h3>
                  <p className="text-gray-400">{challenge.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
