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

const achievements = [
  { icon: '🔥', label: '7-Day Streak', unlocked: false, color: 'from-gray-300 to-gray-400' },
  { icon: '⭐', label: 'First Practice', unlocked: false, color: 'from-gray-300 to-gray-400' },
  { icon: '🎯', label: '90% Score', unlocked: false, color: 'from-gray-300 to-gray-400' },
  { icon: '👑', label: 'Master Level', unlocked: false, color: 'from-gray-300 to-gray-400' },
  { icon: '💎', label: '50 Sessions', unlocked: false, color: 'from-gray-300 to-gray-400' },
  { icon: '🚀', label: 'Perfect Week', unlocked: false, color: 'from-gray-300 to-gray-400' }
];

export default function MainPage() {
  const [, navigate] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // General user stats (reset for new users/general view)
  const userStats = {
    level: 'Beginner',
    currentStreak: 0,
    totalSessions: 0,
    totalMinutes: 0,
    averageScore: '--',
    improvementRate: 0,
    todayGoal: {
      completed: 0,
      total: 1,
      progress: 0
    }
  };

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
          <div className="mb-8">
            <img 
              src="/images/ark_logo.png" 
              alt="ARK Dance Studio" 
              className="h-16 w-auto mb-2"
            />
            <p className="text-sm text-royal-purple-light">Dance Studio</p>
          </div>

          {/* Level Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 bg-gradient-to-r from-royal-purple to-royal-purple-light text-white rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl">🌟</div>
              <div>
                <div className="text-xs opacity-90">Current Level</div>
                <div className="text-lg font-bold">{userStats.level}</div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <div className="space-y-3 mb-6">
            <div className="bg-white/60 rounded-xl p-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Streak</span>
              <span className="font-bold text-royal-purple flex items-center gap-1">
                🔥 {userStats.currentStreak} days
              </span>
            </div>
            <div className="bg-white/60 rounded-xl p-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg Score</span>
              <span className="font-bold text-royal-purple">{userStats.averageScore}%</span>
            </div>
          </div>

          <nav className="space-y-3">
            {menuItems.map((item, idx) => (
              <motion.button
                key={item.label}
                onClick={() => navigate(item.target)}
                className="w-full group relative bg-white/60 hover:bg-white/90 border border-royal-purple-light/30 hover:border-royal-purple rounded-2xl px-4 py-4 transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
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
        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-6xl mx-auto space-y-8"
          >
            {/* Welcome Header */}
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-medium text-gray-800">Welcome Back!</h2>
              <p className="text-xl text-royal-purple">Ready to dance?</p>
            </div>

            {/* Admin/Coach Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="bg-white/70 backdrop-blur-xl border border-royal-purple-light/30 rounded-3xl p-6 shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="text-6xl">📌</span>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">📢</span> Coach's Board
              </h3>
              <div className="bg-yellow-50/80 border border-yellow-100 rounded-xl p-4 text-gray-700 leading-relaxed">
                <p className="font-medium text-royal-purple mb-1">Weekly Focus:</p>
                <p>Remember to keep your core engaged during all balance drills! We're seeing great progress in the "Groove Lines" routine. Keep it up!</p>
                <div className="mt-3 text-xs text-gray-500 text-right">- Coach Arshia</div>
              </div>
            </motion.div>

            {/* Today's Goal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/70 backdrop-blur-xl border border-royal-purple-light/30 rounded-3xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-medium text-gray-800">Today's Goal</h3>
                <span className="text-3xl">🎯</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Practice Sessions</span>
                  <span className="font-medium text-royal-purple">{userStats.todayGoal.completed}/{userStats.todayGoal.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-royal-purple to-royal-purple-light"
                    initial={{ width: 0 }}
                    animate={{ width: `${userStats.todayGoal.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <p className="text-xs text-gray-500 text-center">Start your first session to hit your goal!</p>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Sessions', value: userStats.totalSessions, icon: '📊', color: 'from-blue-400 to-blue-600' },
                { label: 'Minutes', value: userStats.totalMinutes, icon: '⏱️', color: 'from-green-400 to-green-600' },
                { label: 'Improvement', value: `${userStats.improvementRate}%`, icon: '📈', color: 'from-purple-400 to-pink-600' },
                { label: 'Streak', value: `${userStats.currentStreak} days`, icon: '🔥', color: 'from-orange-400 to-red-600' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                  className="bg-white/70 backdrop-blur-md border border-royal-purple-light/30 rounded-2xl p-4 text-center shadow-lg"
                >
                  <div className={`inline-block text-3xl mb-2 p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/70 backdrop-blur-xl border border-royal-purple-light/30 rounded-3xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-medium text-gray-800">Achievements</h3>
                <span className="text-sm text-gray-500">Locked</span>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {achievements.map((achievement, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                    className={`relative aspect-square rounded-2xl p-3 flex flex-col items-center justify-center text-center ${
                      achievement.unlocked 
                        ? `bg-gradient-to-br ${achievement.color} shadow-lg cursor-pointer` 
                        : 'bg-gray-200 opacity-50'
                    }`}
                  >
                    <div className={`text-3xl mb-1 ${achievement.unlocked ? '' : 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <div className={`text-xs font-medium ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                      {achievement.label}
                    </div>
                    {achievement.unlocked && (
                      <div className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs">
                        ✓
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Practice Options */}
            <div className="space-y-4">
              <h3 className="text-2xl font-medium text-gray-800">Start Practicing</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {menuItems.map((item, idx) => (
                  <motion.button
                    key={item.label}
                    onClick={() => navigate(item.target)}
                    className="group relative bg-white/70 backdrop-blur-xl border border-royal-purple-light/30 hover:border-royal-purple rounded-3xl p-8 transition-all shadow-lg shadow-royal-purple/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + idx * 0.1 }}
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
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
