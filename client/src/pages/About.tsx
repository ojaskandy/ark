import React from 'react';
import { Link } from 'wouter';
import { useTheme } from '@/hooks/use-theme';
import { Music, Heart, Users, Award } from 'lucide-react';

export default function About() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-ark-purple-dark to-black' : 'bg-gradient-to-b from-white to-ark-accent'}`}>
      {/* Navigation */}
      <nav className={`${isDarkMode ? 'bg-ark-purple-dark/90' : 'bg-white/90'} backdrop-blur-sm sticky top-0 z-50 border-b ${isDarkMode ? 'border-ark-purple' : 'border-ark-accent'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <a className="text-2xl font-bold bg-gradient-to-r from-ark-purple-light to-ark-lavender bg-clip-text text-transparent">
                ARK Dance Studios
              </a>
            </Link>
            <div className="flex gap-6">
              <Link href="/"><a className={`hover:text-ark-purple-light transition ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Home</a></Link>
              <Link href="/about"><a className={`font-semibold transition ${isDarkMode ? 'text-ark-lavender' : 'text-ark-purple'}`}>About</a></Link>
              <Link href="/classes"><a className={`hover:text-ark-purple-light transition ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Classes</a></Link>
              <Link href="/register"><a className={`hover:text-ark-purple-light transition ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Register</a></Link>
              <Link href="/app"><a className={`hover:text-ark-purple-light transition ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Student Portal</a></Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            About ARK Dance Studios
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-ark-lavender' : 'text-gray-700'}`}>
            Where tradition meets innovation in dance education.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className={`${isDarkMode ? 'bg-ark-purple/20' : 'bg-white'} rounded-2xl p-8 md:p-12 shadow-xl border ${isDarkMode ? 'border-ark-purple' : 'border-ark-accent'}`}>
            <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Our Mission
            </h2>
            <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              At ARK Dance Studios, we believe that dance is more than movement—it's a form of expression, a celebration of culture, and a path to confidence. Established in 2025, we're dedicated to providing world-class dance education that combines traditional techniques with cutting-edge AI technology.
            </p>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Our innovative approach uses real-time pose analysis to help students perfect their technique, while our experienced instructors provide the personal touch and cultural context that makes learning dance truly transformative.
            </p>
          </div>
        </div>
      </section>

      {/* Dance Styles Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Dance Styles We Teach
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className={`${isDarkMode ? 'bg-ark-purple/20' : 'bg-white'} rounded-xl p-6 shadow-lg border ${isDarkMode ? 'border-ark-purple' : 'border-ark-accent'}`}>
              <div className="w-16 h-16 bg-gradient-to-br from-ark-purple-light to-ark-lavender rounded-full flex items-center justify-center mb-4">
                <Music className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Bollywood</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                Experience the vibrant energy of Bollywood dance. Learn classical Indian movements fused with contemporary choreography, bringing the magic of Indian cinema to life.
              </p>
            </div>
            
            <div className={`${isDarkMode ? 'bg-ark-purple/20' : 'bg-white'} rounded-xl p-6 shadow-lg border ${isDarkMode ? 'border-ark-purple' : 'border-ark-accent'}`}>
              <div className="w-16 h-16 bg-gradient-to-br from-ark-purple-light to-ark-lavender rounded-full flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Contemporary</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                Explore expressive contemporary dance that combines technical precision with emotional storytelling. Perfect for developing versatility and artistic expression.
              </p>
            </div>
            
            <div className={`${isDarkMode ? 'bg-ark-purple/20' : 'bg-white'} rounded-xl p-6 shadow-lg border ${isDarkMode ? 'border-ark-purple' : 'border-ark-accent'}`}>
              <div className="w-16 h-16 bg-gradient-to-br from-ark-purple-light to-ark-lavender rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Hip-Hop</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                Get moving with high-energy hip-hop classes that teach rhythm, coordination, and urban dance styles. Great for building confidence and having fun!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className={`text-4xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            What Sets Us Apart
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`${isDarkMode ? 'bg-ark-purple/20' : 'bg-white'} rounded-xl p-8 shadow-lg border ${isDarkMode ? 'border-ark-purple' : 'border-ark-accent'}`}>
              <Award className={`h-12 w-12 mb-4 ${isDarkMode ? 'text-ark-lavender' : 'text-ark-purple'}`} />
              <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>AI-Powered Learning</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                Our unique technology provides real-time feedback on your movements, helping you perfect your technique faster than ever before.
              </p>
            </div>
            
            <div className={`${isDarkMode ? 'bg-ark-purple/20' : 'bg-white'} rounded-xl p-8 shadow-lg border ${isDarkMode ? 'border-ark-purple' : 'border-ark-accent'}`}>
              <Users className={`h-12 w-12 mb-4 ${isDarkMode ? 'text-ark-lavender' : 'text-ark-purple'}`} />
              <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Expert Instructors</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                Learn from professional dancers with years of performance and teaching experience. Our instructors are passionate about sharing their love of dance.
              </p>
            </div>
            
            <div className={`${isDarkMode ? 'bg-ark-purple/20' : 'bg-white'} rounded-xl p-8 shadow-lg border ${isDarkMode ? 'border-ark-purple' : 'border-ark-accent'}`}>
              <Heart className={`h-12 w-12 mb-4 ${isDarkMode ? 'text-ark-lavender' : 'text-ark-purple'}`} />
              <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Welcoming Environment</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                We create a supportive, inclusive space where dancers of all ages and skill levels feel comfortable expressing themselves.
              </p>
            </div>
            
            <div className={`${isDarkMode ? 'bg-ark-purple/20' : 'bg-white'} rounded-xl p-8 shadow-lg border ${isDarkMode ? 'border-ark-purple' : 'border-ark-accent'}`}>
              <Music className={`h-12 w-12 mb-4 ${isDarkMode ? 'text-ark-lavender' : 'text-ark-purple'}`} />
              <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Cultural Connection</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                We honor the cultural roots of each dance style while making them accessible and enjoyable for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Ready to Start Dancing?
          </h2>
          <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Join our community of passionate dancers today!
          </p>
          <Link href="/register">
            <a className="inline-block bg-gradient-to-r from-ark-purple to-ark-purple-light text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all">
              Register Now
            </a>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-ark-purple-dark' : 'bg-gray-100'} border-t ${isDarkMode ? 'border-ark-purple' : 'border-gray-200'} py-8`}>
        <div className="container mx-auto px-4 text-center">
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>© 2025 ARK Dance Studios. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

