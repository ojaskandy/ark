import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';

const menuItems = [
  {
    label: 'live routine',
    target: '/live-routine',
    description: 'practice with ai feedback',
  },
  {
    label: 'challenges',
    target: '/challenges',
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
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      <aside className="md:w-64 w-full border-b md:border-b-0 md:border-r border-gray-100 bg-white px-6 py-8 space-y-8">
        <div>
          <h1 className="text-xl font-light text-gray-900">arshia</h1>
          <p className="text-xs text-gray-400 mt-1">dance studio</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.target)}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700"
            >
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-light text-gray-900">welcome back</h2>
            <p className="text-gray-500">ready to practice?</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <button
              onClick={() => navigate('/live-routine')}
              className="p-8 bg-gray-50 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors text-left"
            >
              <p className="text-sm text-gray-400 mb-2">live routine</p>
              <p className="text-gray-900 font-medium">start practicing</p>
            </button>
            <button
              onClick={() => navigate('/challenges')}
              className="p-8 bg-gray-50 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors text-left"
            >
              <p className="text-sm text-gray-400 mb-2">challenges</p>
              <p className="text-gray-900 font-medium">quick drills</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
