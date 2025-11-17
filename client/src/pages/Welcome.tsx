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
        body: JSON.stringify({ username: 'student', password: password.toLowerCase().trim() }),
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full px-6 md:px-12 py-6 flex justify-between items-center">
        <div className="text-xl font-medium text-gray-900">ARK</div>
        <button
          onClick={() => setShowLogin(true)}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          student portal
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center mb-20 space-y-6">
          <h1 className="text-6xl md:text-7xl font-medium text-gray-900 leading-tight">
            it's not just practice.<br />it's ARK.
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            your intelligent dance studio built to help you refine movement, perfect technique, and express yourself.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate('/live-routine')}
              className="px-8 py-4 bg-gray-900 text-white rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
            >
              start practicing — it's free
            </button>
          </div>
          <p className="text-sm text-gray-500 pt-2">loved by ambitious dancers</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Feature 1 */}
          <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mb-4">
                <span className="text-3xl">🎥</span>
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-3">whenever, wherever</h3>
              <p className="text-gray-600 leading-relaxed">
                never need a mirror at 3 a.m. again. just start practicing with ARK, your ai dance coach that's ready 24/7.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-3">safe & sound</h3>
              <p className="text-gray-600 leading-relaxed">
                practice freely — ARK's got you. your sessions are secure and confidential.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-medium text-gray-900 mb-8 text-center">your progress</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
              <p className="text-sm text-gray-500 mb-2">routines completed</p>
              <p className="text-4xl font-medium text-gray-900">0</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
              <p className="text-sm text-gray-500 mb-2">practice sessions</p>
              <p className="text-4xl font-medium text-gray-900">0</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
              <p className="text-sm text-gray-500 mb-2">improvement score</p>
              <p className="text-4xl font-medium text-gray-900">—</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 rounded-3xl p-12 border border-gray-100">
          <h2 className="text-3xl font-medium text-gray-900 mb-4">get started for free</h2>
          <p className="text-gray-600 mb-6">be seen. be understood. be better.</p>
          <button
            onClick={() => navigate('/live-routine')}
            className="px-8 py-4 bg-gray-900 text-white rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
          >
            try ARK free
          </button>
        </div>
      </main>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium text-gray-900">student portal</h2>
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
                <label className="block text-sm text-gray-600 mb-2">password</label>
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
                <p className="text-sm text-gray-600">{error}</p>
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
