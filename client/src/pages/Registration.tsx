import React, { useState } from 'react';
import { Link } from 'wouter';
import { useTheme } from '@/hooks/use-theme';
import { User, Mail, Phone, Calendar, Users, CreditCard, Check } from 'lucide-react';

export default function Registration() {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    studentName: '',
    studentAge: '',
    parentName: '',
    email: '',
    phone: '',
    selectedClass: '',
    emergencyContact: '',
    emergencyPhone: '',
    comments: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a server
    console.log('Registration submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-b from-ark-purple-dark to-black' : 'bg-gradient-to-b from-white to-ark-accent'}`}>
        <div className={`max-w-2xl mx-auto px-4 text-center`}>
          <div className={`${isDarkMode ? 'bg-ark-purple/20' : 'bg-white'} rounded-2xl p-12 shadow-2xl border ${isDarkMode ? 'border-ark-purple' : 'border-ark-accent'}`}>
            <div className="w-20 h-20 bg-gradient-to-br from-ark-purple-light to-ark-lavender rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-white" />
            </div>
            <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Registration Successful!
            </h2>
            <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Thank you for registering with ARK Dance Studios! We'll contact you within 24 hours to confirm your enrollment and schedule your first class.
            </p>
            <Link href="/">
              <a className="inline-block bg-gradient-to-r from-ark-purple to-ark-purple-light text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all">
                Return Home
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              <Link href="/classes"><a className={`hover:text-ark-purple-light transition ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Classes</a></Link>
              <Link href="/register"><a className={`font-semibold transition ${isDarkMode ? 'text-ark-lavender' : 'text-ark-purple'}`}>Register</a></Link>
              <Link href="/app"><a className={`hover:text-ark-purple-light transition ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Student Portal</a></Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Register for Classes
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-ark-lavender' : 'text-gray-700'}`}>
            Join the ARK Dance Studios family and start your dance journey today!
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-12 px-4 pb-20">
        <div className="container mx-auto max-w-3xl">
          <form onSubmit={handleSubmit} className={`${isDarkMode ? 'bg-ark-purple/20' : 'bg-white'} rounded-2xl p-8 md:p-12 shadow-2xl border ${isDarkMode ? 'border-ark-purple' : 'border-ark-accent'}`}>
            
            {/* Student Information */}
            <div className="mb-8">
              <h3 className={`text-2xl font-bold mb-6 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <User className="h-6 w-6 mr-2 text-ark-purple-light" />
                Student Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={`block mb-2 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    required
                    value={formData.studentName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-ark-purple-dark/50 border-ark-purple text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-ark-purple-light focus:border-transparent`}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className={`block mb-2 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Age *
                  </label>
                  <input
                    type="number"
                    name="studentAge"
                    required
                    min="5"
                    max="99"
                    value={formData.studentAge}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-ark-purple-dark/50 border-ark-purple text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-ark-purple-light focus:border-transparent`}
                    placeholder="Age"
                  />
                </div>
              </div>
            </div>

            {/* Parent/Guardian Information */}
            <div className="mb-8">
              <h3 className={`text-2xl font-bold mb-6 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Users className="h-6 w-6 mr-2 text-ark-purple-light" />
                Parent/Guardian Information
              </h3>
              <div className="space-y-6">
                <div>
                  <label className={`block mb-2 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-ark-purple-dark/50 border-ark-purple text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-ark-purple-light focus:border-transparent`}
                    placeholder="Full name"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block mb-2 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-ark-purple-dark/50 border-ark-purple text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-ark-purple-light focus:border-transparent`}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className={`block mb-2 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-ark-purple-dark/50 border-ark-purple text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-ark-purple-light focus:border-transparent`}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Class Selection */}
            <div className="mb-8">
              <h3 className={`text-2xl font-bold mb-6 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Calendar className="h-6 w-6 mr-2 text-ark-purple-light" />
                Class Selection
              </h3>
              <div>
                <label className={`block mb-2 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Preferred Class *
                </label>
                <select
                  name="selectedClass"
                  required
                  value={formData.selectedClass}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-ark-purple-dark/50 border-ark-purple text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-ark-purple-light focus:border-transparent`}
                >
                  <option value="">Select a class...</option>
                  <option value="little-stars">Little Stars Bollywood (Ages 5-8)</option>
                  <option value="junior-bollywood">Junior Bollywood (Ages 9-12)</option>
                  <option value="teen-contemporary">Teen Contemporary (Ages 13-17)</option>
                  <option value="teen-hiphop">Teen Hip-Hop (Ages 13-17)</option>
                  <option value="adult-bollywood">Adult Bollywood (18+)</option>
                  <option value="adult-contemporary">Adult Contemporary (18+)</option>
                </select>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="mb-8">
              <h3 className={`text-2xl font-bold mb-6 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Phone className="h-6 w-6 mr-2 text-ark-purple-light" />
                Emergency Contact
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={`block mb-2 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Emergency Contact Name *
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    required
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-ark-purple-dark/50 border-ark-purple text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-ark-purple-light focus:border-transparent`}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className={`block mb-2 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Emergency Phone *
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    required
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-ark-purple-dark/50 border-ark-purple text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-ark-purple-light focus:border-transparent`}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Additional Comments */}
            <div className="mb-8">
              <label className={`block mb-2 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Additional Comments or Questions
              </label>
              <textarea
                name="comments"
                rows={4}
                value={formData.comments}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-ark-purple-dark/50 border-ark-purple text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-ark-purple-light focus:border-transparent`}
                placeholder="Tell us about any special requirements, experience level, or questions you have..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-ark-purple to-ark-purple-light text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all"
            >
              Complete Registration
            </button>

            <p className={`text-sm mt-4 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              * Required fields. Your first class is FREE!
            </p>
          </form>
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

