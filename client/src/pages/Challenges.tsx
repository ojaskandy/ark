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

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-6 py-4 flex items-center"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">Challenges</h1>
            <p className="text-xl text-white/80">Quick drills when you have 10 minutes</p>
          </motion.header>

          <div className="grid md:grid-cols-2 gap-6">
            {danceChallenges.map((challenge, idx) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative bg-white/95 backdrop-blur-lg border border-gray-200 hover:border-pink-300 rounded-3xl p-8 cursor-pointer shadow-xl"
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{challenge.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{challenge.title}</h3>
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
