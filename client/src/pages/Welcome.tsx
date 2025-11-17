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
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          student portal
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-8">
        <div className="max-w-2xl w-full space-y-12">
          {/* Hero */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 tracking-tight">
              arshia dance studio
            </h1>
            <p className="text-lg text-gray-500 font-light">
              ai-powered movement analysis for dancers
            </p>
          </div>

          {/* AI Assistant */}
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                <span className="text-rose-500 text-xl">✨</span>
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-sm text-gray-400 uppercase tracking-wider">studio assistant</p>
                <p className="text-gray-700 leading-relaxed">
                  upload a routine, practice live, and get real-time feedback on your lines, timing, and flow.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => navigate('/live-routine')}
                    className="px-6 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    start practicing
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/live-routine')}
              className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors text-left"
            >
              <p className="text-sm text-gray-400 mb-2">live routine</p>
              <p className="text-gray-900 font-medium">practice with ai</p>
            </button>
            <button
              onClick={() => navigate('/challenges')}
              className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors text-left"
            >
              <p className="text-sm text-gray-400 mb-2">challenges</p>
              <p className="text-gray-900 font-medium">quick drills</p>
            </button>
          </div>
        </div>
      </main>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl">
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
                <label className="block text-sm text-gray-500 mb-2">password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                  placeholder="enter password"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-sm text-rose-500">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
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

