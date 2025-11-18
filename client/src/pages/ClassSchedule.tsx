import React from 'react';
import { Link } from 'wouter';
import { useTheme } from '@/hooks/use-theme';
import { Clock, Users, Star, Calendar } from 'lucide-react';

export default function ClassSchedule() {
  const { isDarkMode } = useTheme();

  const classes = [
    {
      title: "Little Stars Bollywood",
      ageGroup: "Ages 5-8",
      level: "Beginner",
      schedule: "Mondays & Wednesdays, 4:00 PM - 5:00 PM",
      price: "$120/month",
      description: "Fun introduction to Bollywood dance for young children. Learn basic steps and express yourself through music and movement!"
    },
    {
      title: "Junior Bollywood",
      ageGroup: "Ages 9-12",
      level: "Beginner/Intermediate",
      schedule: "Tuesdays & Thursdays, 4:30 PM - 5:30 PM",
      price: "$120/month",
      description: "Build on fundamentals with more complex choreography. Perfect for kids who want to explore Bollywood dance styles."
    },
    {
      title: "Teen Contemporary",
      ageGroup: "Ages 13-17",
      level: "All Levels",
      schedule: "Wednesdays & Fridays, 5:30 PM - 6:30 PM",
      price: "$130/month",
      description: "Expressive contemporary dance focusing on technique, creativity, and performance skills."
    },
    {
      title: "Teen Hip-Hop",
      ageGroup: "Ages 13-17",
      level: "All Levels",
      schedule: "Saturdays, 11:00 AM - 12:00 PM",
      price: "$130/month",
      description: "High-energy hip-hop classes teaching urban dance styles, rhythm, and freestyle."
    },
    {
      title: "Adult Bollywood",
      ageGroup: "18+",
      level: "All Levels",
      schedule: "Mondays & Thursdays, 7:00 PM - 8:00 PM",
      price: "$140/month",
      description: "Experience the joy of Bollywood dance while getting a great workout. No experience necessary!"
    },
    {
      title: "Adult Contemporary",
      ageGroup: "18+",
      level: "Intermediate",
      schedule: "Tuesdays, 7:30 PM - 8:30 PM",
      price: "$140/month",
      description: "Develop your contemporary technique with focus on fluidity, expression, and performance quality."
    }
  ];

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
              <Link href="/about"><a className={`hover:text-ark-purple-light transition ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About</a></Link>
              <Link href="/classes"><a className={`font-semibold transition ${isDarkMode ? 'text-ark-lavender' : 'text-ark-purple'}`}>Classes</a></Link>
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
            Our Class Schedule
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-ark-lavender' : 'text-gray-700'}`}>
            Find the perfect class for your age and skill level
          </p>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {classes.map((classInfo, index) => (
              <div 
                key={index}
                className={`${isDarkMode ? 'bg-ark-purple/20' : 'bg-white'} rounded-xl p-6 shadow-xl border ${isDarkMode ? 'border-ark-purple' : 'border-ark-accent'} hover:shadow-2xl transition-shadow`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {classInfo.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${isDarkMode ? 'bg-ark-lavender/20 text-ark-lavender' : 'bg-ark-purple/10 text-ark-purple'}`}>
                    {classInfo.level}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className={`h-5 w-5 ${isDarkMode ? 'text-ark-lavender' : 'text-ark-purple'}`} />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{classInfo.ageGroup}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className={`h-5 w-5 ${isDarkMode ? 'text-ark-lavender' : 'text-ark-purple'}`} />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{classInfo.schedule}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Star className={`h-5 w-5 ${isDarkMode ? 'text-ark-lavender' : 'text-ark-purple'}`} />
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{classInfo.price}</span>
                  </div>
                </div>
                
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {classInfo.description}
                </p>
                
                <Link href="/register">
                  <a className="inline-block w-full text-center bg-gradient-to-r from-ark-purple to-ark-purple-light text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all">
                    Enroll Now
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Info */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className={`${isDarkMode ? 'bg-ark-purple/20' : 'bg-white'} rounded-2xl p-8 md:p-12 shadow-xl border ${isDarkMode ? 'border-ark-purple' : 'border-ark-accent'}`}>
            <h2 className={`text-3xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Class Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className={`h-6 w-6 mt-1 flex-shrink-0 ${isDarkMode ? 'text-ark-lavender' : 'text-ark-purple'}`} />
                <div>
                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Class Duration</h4>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Each class is 60 minutes long with time for warm-up, instruction, and practice.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Users className={`h-6 w-6 mt-1 flex-shrink-0 ${isDarkMode ? 'text-ark-lavender' : 'text-ark-purple'}`} />
                <div>
                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Class Size</h4>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Maximum 15 students per class to ensure personalized attention from our instructors.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Star className={`h-6 w-6 mt-1 flex-shrink-0 ${isDarkMode ? 'text-ark-lavender' : 'text-ark-purple'}`} />
                <div>
                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Trial Class</h4>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>First class is FREE! Come experience ARK before committing to a monthly membership.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className={`h-6 w-6 mt-1 flex-shrink-0 ${isDarkMode ? 'text-ark-lavender' : 'text-ark-purple'}`} />
                <div>
                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Membership</h4>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Monthly membership includes 8 classes per month. Additional drop-in classes available for $20 each.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Questions About Our Classes?
          </h2>
          <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Contact us for more information or to schedule a studio tour
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <a className="inline-block bg-gradient-to-r from-ark-purple to-ark-purple-light text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all">
                Register Now
              </a>
            </Link>
            <a 
              href="mailto:info@arkdancestudios.com"
              className={`inline-block px-8 py-4 rounded-full text-lg font-semibold border-2 transition-all hover:scale-105 ${isDarkMode ? 'border-ark-lavender text-ark-lavender hover:bg-ark-lavender/10' : 'border-ark-purple text-ark-purple hover:bg-ark-purple/10'}`}
            >
              Contact Us
            </a>
          </div>
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

