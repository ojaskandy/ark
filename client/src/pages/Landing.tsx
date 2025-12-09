import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import UserProfileCard from '@/components/UserProfileCard';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../hooks/use-theme';
import { Capacitor } from '@capacitor/core';

export default function Landing() {
  const [scrollY, setScrollY] = useState(0);
  const [routineNotes, setRoutineNotes] = useState('');
  const { user, logoutMutation } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Handle login button click - detect Capacitor and open system browser or navigate
  const handleLoginClick = async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        setIsLoading(true);
        // For native platforms, open in system browser
        // @ts-ignore - Capacitor global may not be typed
        if ((window as any).Capacitor?.Plugins?.Browser) {
          await (window as any).Capacitor.Plugins.Browser.open({ 
            url: 'https://www.arkdancestudios.com/auth'
          });
        } else {
          // Fallback to window.open
          window.open('https://www.arkdancestudios.com/auth', '_system');
        }
      } catch (error) {
        console.error('Failed to open login in system browser:', error);
        // Fallback to normal navigation
        navigate('/auth');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Normal web browser - navigate to /auth route
      navigate('/auth');
    }
  };
  
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Load routine notes from localStorage when component mounts
  useEffect(() => {
    const savedNotes = localStorage.getItem('routineNotes');
    if (savedNotes) {
      setRoutineNotes(savedNotes);
    }
  }, []);
  
  // Save routine notes to localStorage when they change
  useEffect(() => {
    localStorage.setItem('routineNotes', routineNotes);
  }, [routineNotes]);

  // Handle logout
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        // Navigate to auth page after logout
        navigate('/auth');
      }
    });
  };

  // Auto-redirect to home page if user is logged in
  useEffect(() => {
    // Wait for loading to complete
    if (!isLoading && user) {
      // If user is already logged in, show user profile
      // Note: We now show profile in place instead of redirecting
    }
  }, [user, isLoading, navigate]);

  return (
    <div className={`min-h-screen flex flex-col overflow-hidden relative ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      {/* Beautiful Stage Background Image */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/images/ark-stage-bg.jpg)',
            backgroundPosition: 'center 30%'
          }}
        />
        {/* Dark gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-purple-950/60 to-black/90" />
        {/* Animated purple glow effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-600/15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] rounded-full bg-fuchsia-500/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
      
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md py-4 border-b border-purple-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 text-ark-purple-light mr-2 animate-bounce" style={{ animationDuration: '3s' }}>
              <span className="material-icons text-3xl">music_note</span>
            </div>
            <div className="relative">
              {isDarkMode ? (
                <>
                  <h1 className="text-2xl font-serif font-bold logo-dark absolute">
                    ARK
                  </h1>
                  <h1 className="text-2xl font-serif font-bold logo-dark-glow absolute">
                    ARK
                  </h1>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-serif font-bold logo-light absolute">
                    ARK
                  </h1>
                  <h1 className="text-2xl font-serif font-bold logo-light-glow absolute">
                    ARK
                  </h1>
                </>
              )}
              <h1 className="text-2xl font-serif font-bold invisible">
                ARK
              </h1>
            </div>
          </div>
          
          {/* Theme toggle button */}
          <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-full ${isDarkMode ? 'bg-black/60 border-ark-purple/50' : 'bg-white/60 border-ark-lavender/50'} border transition-all duration-300 mr-4`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(124, 58, 237, 0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B2C6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-pink-400" />
            ) : user ? (
              <>
                <Link to="/app">
                  <button className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white transition duration-300 flex items-center space-x-1 shadow-lg shadow-pink-500/30">
                    <span className="material-icons text-sm">play_arrow</span>
                    <span>Start Routine</span>
                  </button>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-full border border-pink-400/50 text-pink-300 hover:bg-pink-500/20 transition duration-300 flex items-center space-x-1"
                >
                  <span className="material-icons text-sm">logout</span>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={handleLoginClick}
                  disabled={isLoading}
                  className="px-5 py-2 rounded-full border border-pink-400/50 text-pink-300 hover:bg-pink-500/20 transition duration-300 flex items-center space-x-1 disabled:opacity-50"
                >
                  <span className="material-icons text-sm">
                    {isLoading ? 'hourglass_empty' : 'login'}
                  </span>
                  <span>{isLoading ? 'Opening...' : 'Login'}</span>
                </button>
                <Link to="/auth?tab=register">
                  <button className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white transition duration-300 flex items-center space-x-1 shadow-lg shadow-pink-500/30">
                    <span className="material-icons text-sm">person_add</span>
                    <span>Register</span>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content - Show either user profile or landing page */}
      <main className="flex-1 relative z-10">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="h-10 w-10 animate-spin text-ark-purple-light" />
          </div>
        ) : user ? (
          // Show user profile and dashboard
          <div className="container mx-auto px-4 py-8">
            <UserProfileCard />
            
            <div className="mt-8 w-full bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 animate-fade-in">
              <div className="flex items-center mb-3">
                <span className="material-icons text-pink-400 mr-2">edit_note</span>
                <h3 className="text-lg font-medium text-purple-200">Routine Notes</h3>
              </div>
              <textarea 
                className="w-full h-32 bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
                placeholder="Write your notes for this training session here..."
                value={routineNotes}
                onChange={(e) => setRoutineNotes(e.target.value)}
              ></textarea>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Link to="/app">
                <div className="inline-block relative group animate-fade-in">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 rounded-xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
                  <div className="relative px-12 py-6 bg-black/60 backdrop-blur-sm border border-pink-500/40 rounded-xl leading-none flex items-center hover:bg-black/80 transition-all">
                    <span className="flex items-center space-x-5">
                      <span className="pr-6 text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        START DANCING
                      </span>
                    </span>
                    <span className="material-icons text-pink-400 text-xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          // Show landing page for non-logged in users
          <div className="min-h-[90vh] flex flex-col items-center justify-center relative">
            {/* Decorative sparkles/lights effect */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[15%] left-[15%] w-2 h-2 bg-purple-400/60 rounded-full animate-pulse shadow-lg shadow-purple-400/50" style={{ animationDuration: '2s' }}></div>
              <div className="absolute top-[25%] right-[20%] w-3 h-3 bg-pink-400/50 rounded-full animate-pulse shadow-lg shadow-pink-400/50" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-[30%] left-[25%] w-2 h-2 bg-fuchsia-400/60 rounded-full animate-pulse shadow-lg shadow-fuchsia-400/50" style={{ animationDuration: '2.5s', animationDelay: '1s' }}></div>
              <div className="absolute top-[40%] right-[10%] w-2 h-2 bg-purple-300/50 rounded-full animate-pulse shadow-lg shadow-purple-300/50" style={{ animationDuration: '4s', animationDelay: '1.5s' }}></div>
              <div className="absolute bottom-[20%] right-[30%] w-3 h-3 bg-pink-300/40 rounded-full animate-pulse shadow-lg shadow-pink-300/50" style={{ animationDuration: '3.5s', animationDelay: '2s' }}></div>
            </div>
            
            {/* Main hero content */}
            <div 
              className="text-center px-4 py-16 transform transition-all duration-1000"
              style={{ 
                transform: `translateY(${scrollY * 0.2}px)`,
                opacity: 1 - scrollY / 500
              }}
            >
              <div className="animate-fade-in">
                <div className="relative mb-6">
                  <h2 className="text-7xl sm:text-8xl md:text-9xl font-serif font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-2xl">
                    ARK
                  </h2>
                  <p className="text-lg md:text-xl text-purple-200/80 font-medium tracking-widest uppercase mt-2">
                    Dance Studios
                  </p>
                </div>
                <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-white/90 font-light">
                  AI-powered dance technique perfection.
                </p>
              </div>
              
              {/* Feature icons */}
              <div className="flex justify-center gap-8 md:gap-16 mb-16 flex-wrap">
                <div className="feature-icon-container animate-float" style={{animationDelay: '0.2s'}}>
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/40 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 border border-white/20">
                    <span className="material-icons text-white text-3xl md:text-4xl">motion_photos_on</span>
                  </div>
                  <p className="text-sm mt-2 text-purple-100/80">Real-time tracking</p>
                </div>
                
                <div className="feature-icon-container animate-float" style={{animationDelay: '0.4s'}}>
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-pink-600 to-purple-500 flex items-center justify-center shadow-lg shadow-pink-500/40 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 border border-white/20">
                    <span className="material-icons text-white text-3xl md:text-4xl">auto_fix_high</span>
                  </div>
                  <p className="text-sm mt-2 text-purple-100/80">Form analysis</p>
                </div>
                
                <div className="feature-icon-container animate-float" style={{animationDelay: '0.6s'}}>  
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-fuchsia-600 to-pink-500 flex items-center justify-center shadow-lg shadow-fuchsia-500/40 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 border border-white/20">
                    <span className="material-icons text-white text-3xl md:text-4xl">compare</span>
                  </div>
                  <p className="text-sm mt-2 text-purple-100/80">Video comparison</p>
                </div>
              </div>
              
              {/* Routine Notes Section */}
              <div className="w-full max-w-lg mx-auto mb-10 bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 animate-fade-in">
                <div className="flex items-center mb-3">
                  <span className="material-icons text-pink-400 mr-2">edit_note</span>
                  <h3 className="text-lg font-medium text-purple-200">Routine Notes</h3>
                </div>
                <textarea 
                  className="w-full h-32 rounded-lg p-3 bg-black/50 border border-purple-500/30 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
                  placeholder="Write your notes for this training session here..."
                  value={routineNotes}
                  onChange={(e) => setRoutineNotes(e.target.value)}
                ></textarea>
              </div>

              {/* Launch button with advanced animation */}
              <button onClick={handleLoginClick} disabled={isLoading} className="inline-block relative group animate-fade-in mt-6 disabled:opacity-50">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 rounded-xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
                <div className="relative px-12 py-6 bg-black/60 backdrop-blur-sm border border-pink-500/40 rounded-xl leading-none flex items-center hover:bg-black/80 transition-all">
                  <span className="flex items-center space-x-5">
                    <span className="pr-6 text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {isLoading ? 'OPENING...' : 'START DANCING'}
                    </span>
                  </span>
                  <span className="material-icons text-pink-400 text-xl group-hover:translate-x-2 transition-transform">
                    {isLoading ? 'hourglass_empty' : 'arrow_forward'}
                  </span>
                </div>
              </button>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="mt-auto backdrop-blur-md py-6 border-t border-purple-500/20 relative z-10 bg-black/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-purple-200/80">© 2025 ARK Dance Studios</p>
          <p className="text-purple-300/50 text-sm mt-1">
            Powered by AI & TensorFlow.js
          </p>
        </div>
      </footer>
    </div>
  );
}