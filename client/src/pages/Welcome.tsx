import { useState } from 'react';
import { useLocation } from 'wouter';
import AIAssistant from '@/components/AIAssistant';

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
        body: JSON.stringify({ username: 'student', password: password.toLowerCase() }),
      });

      if (response.ok) {
        navigate('/app');
      } else {
        setError('incorrect password');
      }
    } catch (err) {
      setError('login failed');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full px-8 py-6 flex justify-end">
        <button
          onClick={() => setShowLogin(true)}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-light"
        >
          student portal
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="max-w-3xl w-full space-y-16">
          {/* Hero */}
          <div className="text-center space-y-6">
            <h1 className="text-6xl md:text-7xl font-light text-gray-900 tracking-tight">
              arshia
            </h1>
            <p className="text-lg text-gray-400 font-light">
              dance studio
            </p>
          </div>

          {/* AI Assistant Card */}
          <div className="bg-gray-50 rounded-3xl p-12 border border-gray-100">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-3xl">✨</span>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">studio assistant</p>
                  <p className="text-gray-700 text-lg leading-relaxed font-light">
                    practice with real-time ai feedback. upload a routine, mirror it live, and refine your movement.
                  </p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => navigate('/live-routine')}
                    className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-light hover:bg-gray-800 transition-colors"
                  >
                    start practicing
                  </button>
                  <button
                    onClick={() => navigate('/challenges')}
                    className="px-6 py-3 border border-gray-200 text-gray-700 rounded-full text-sm font-light hover:bg-gray-50 transition-colors"
                  >
                    view challenges
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/live-routine')}
              className="p-8 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors text-left group"
            >
              <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">live routine</p>
              <p className="text-gray-900 text-lg font-light group-hover:text-gray-700">practice with ai</p>
            </button>
            <button
              onClick={() => navigate('/challenges')}
              className="p-8 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors text-left group"
            >
              <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">challenges</p>
              <p className="text-gray-900 text-lg font-light group-hover:text-gray-700">quick drills</p>
            </button>
          </div>
        </div>
      </main>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light text-gray-900">student portal</h2>
              <button
                onClick={() => {
                  setShowLogin(false);
                  setPassword('');
                  setError('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-2 font-light">password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors font-light"
                  placeholder="enter password"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-sm text-rose-500">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gray-900 text-white rounded-xl font-light hover:bg-gray-800 transition-colors"
              >
                log in
              </button>
            </form>
          </div>
        </div>
      )}

      <AIAssistant />
    </div>
  );
}
