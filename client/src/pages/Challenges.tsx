import React from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';

const danceChallenges = [
  {
    id: 1,
    title: 'eight-count resets',
    description: 'hit the same combo at 3 tempos back-to-back',
    vibe: 'groove',
  },
  {
    id: 2,
    title: 'floor glide loop',
    description: 'practice low-level transitions',
    vibe: 'slow flow',
  },
  {
    id: 3,
    title: 'precision snaps',
    description: 'lock shapes on counts 1 + 3 only',
    vibe: 'precision',
  },
  {
    id: 4,
    title: 'performance sprint',
    description: '60 seconds, max energy',
    vibe: 'performance',
  }
];

const vibeColors: Record<string, string> = {
  groove: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  'slow flow': 'bg-sky-50 text-sky-700 border-sky-100',
  precision: 'bg-amber-50 text-amber-700 border-amber-100',
  performance: 'bg-rose-50 text-rose-700 border-rose-100'
};

const Challenges: React.FC = () => {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-6 py-4 flex items-center">
        <button
          onClick={() => navigate('/app')}
          className="flex items-center text-gray-600 hover:text-gray-900 font-light"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> back
        </button>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="space-y-4">
            <h1 className="text-4xl font-light text-gray-900">challenges</h1>
            <p className="text-gray-500">quick drills when you have 10 minutes</p>
          </header>

          <div className="grid md:grid-cols-2 gap-4">
            {danceChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-lg font-medium text-gray-900">{challenge.title}</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${vibeColors[challenge.vibe]}`}>
                    {challenge.vibe}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
