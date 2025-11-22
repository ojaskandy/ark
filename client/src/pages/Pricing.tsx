import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

export default function Pricing() {
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
        window.location.href = '/app';
      } else {
        setError('incorrect password');
      }
    } catch (err) {
      setError('login failed');
    }
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Class Schedule', path: '/class-schedule' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Student Portal', path: null, onClick: () => setShowLogin(true) }
  ];

  const plans = [
    {
      name: 'Free Trial',
      price: '$0',
      period: '7 days',
      description: 'Try ARK AI risk-free',
      features: [
        'Full access to ARK AI',
        'Real-time pose analysis',
        'Up to 10 practice sessions',
        'Basic progress tracking',
        'Email support'
      ],
      cta: 'Start Free Trial',
      popular: false,
      highlight: false
    },
    {
      name: 'Individual',
      price: '$29',
      period: 'per month',
      description: 'Perfect for dedicated dancers',
      features: [
        'Unlimited practice sessions',
        'Advanced AI feedback',
        'Detailed progress analytics',
        'Custom routine uploads',
        'Priority support',
        'Achievement badges',
        'Downloadable reports'
      ],
      cta: 'Get Started',
      popular: true,
      highlight: true
    },
    {
      name: 'Family',
      price: '$49',
      period: 'per month',
      description: 'Best value for families',
      features: [
        'Up to 3 student accounts',
        'Everything in Individual',
        'Family progress dashboard',
        'Parent controls',
        'Multi-device access',
        'Dedicated support',
        'Save 44% per student'
      ],
      cta: 'Get Started',
      popular: false,
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-purple-50/30 overflow-x-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{ 
            backgroundImage: 'url(/images/dance-studio.png)',
            filter: 'blur(0px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/40 via-royal-purple/10 to-pink-50/40" />
      </div>

      {/* Header with Logo and Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 w-full px-6 md:px-12 py-6"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img 
              src="/images/ark_logo.png" 
              alt="ARK Dance Studio" 
              className="h-16 md:h-20 w-auto"
            />
          </motion.div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-3">
            {navItems.map((item, idx) => (
              <motion.button
                key={item.label}
                onClick={item.onClick || (() => navigate(item.path!))}
                className="px-6 py-2.5 text-sm font-medium text-royal-purple-dark hover:text-white hover:bg-royal-purple transition-all rounded-full border border-royal-purple-light hover:border-royal-purple bg-white/60 backdrop-blur-sm shadow-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* Pricing Content */}
      <motion.section
        className="relative z-10 py-20 px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-7xl font-medium text-gray-800 mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-2xl text-royal-purple font-light mb-4">
              Choose The Perfect Plan For Your Dance Journey
            </p>
            <p className="text-lg text-gray-600">
              All plans include 7-day free trial • Cancel anytime • No hidden fees
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className={`relative bg-white/70 backdrop-blur-md border ${
                  plan.highlight 
                    ? 'border-royal-purple shadow-2xl shadow-royal-purple/30 scale-105' 
                    : 'border-royal-purple-light/30 shadow-lg'
                } rounded-3xl p-8 ${plan.highlight ? 'md:scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-royal-purple to-royal-purple-light text-white px-6 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-medium text-gray-800 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-royal-purple">{plan.price}</span>
                    <span className="text-gray-500">/ {plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <span className="text-royal-purple mt-1 text-xl">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => navigate('/registration')}
                  className={`w-full py-4 rounded-2xl text-lg font-medium transition-all ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-royal-purple to-royal-purple-light text-white shadow-lg shadow-royal-purple/50 hover:shadow-xl'
                      : 'bg-white border-2 border-royal-purple text-royal-purple hover:bg-royal-purple hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Annual Savings Banner */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-royal-purple to-royal-purple-light text-white rounded-3xl p-8 text-center mb-16"
          >
            <h3 className="text-3xl font-medium mb-3">Save 20% with Annual Billing</h3>
            <p className="text-xl mb-4 opacity-90">
              Pay yearly and save up to $70 per year
            </p>
            <a href="mailto:arshia.x.kathpalia@gmail.com" className="text-white underline hover:no-underline">
              Contact us for annual pricing
            </a>
          </motion.div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-medium text-gray-800 mb-4">
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  q: 'Can I try before I buy?',
                  a: 'Absolutely! All plans include a 7-day free trial with full access to ARK AI. No credit card required.'
                },
                {
                  q: 'Can I cancel anytime?',
                  a: 'Yes! Cancel your subscription anytime with no penalties or hidden fees. Your access continues until the end of your billing period.'
                },
                {
                  q: 'What equipment do I need?',
                  a: 'Just a device with a camera (phone, tablet, or computer) and enough space to move. That\'s it!'
                },
                {
                  q: 'Is the Family plan per household?',
                  a: 'Yes! The Family plan covers up to 3 students in your household with separate accounts and progress tracking.'
                },
                {
                  q: 'Do you offer refunds?',
                  a: 'We offer a 30-day money-back guarantee if you\'re not satisfied with ARK Dance Studio.'
                }
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + idx * 0.1 }}
                  className="bg-white/70 backdrop-blur-md border border-royal-purple-light/30 rounded-2xl p-6 shadow-lg"
                >
                  <h4 className="text-lg font-medium text-gray-800 mb-2">{faq.q}</h4>
                  <p className="text-gray-600">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 text-center bg-white/70 backdrop-blur-md border border-royal-purple-light/50 rounded-3xl p-12 shadow-xl"
          >
            <h3 className="text-3xl font-medium text-gray-800 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              We're here to help! Contact us and we'll get back to you within 24 hours.
            </p>
            <motion.a
              href="mailto:arshia.x.kathpalia@gmail.com"
              className="inline-block px-10 py-4 bg-gradient-to-r from-royal-purple to-royal-purple-light text-white rounded-full text-lg font-medium shadow-lg shadow-royal-purple/50"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(120, 81, 169, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-royal-purple-light/30 py-12 px-6 md:px-12 bg-white/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="text-gray-500 text-sm">© 2025 ARK Dance Studio</div>
          <div className="flex gap-6">
            <button onClick={() => navigate('/about')} className="text-gray-500 hover:text-royal-purple text-sm transition-colors">About</button>
            <a href="mailto:arshia.x.kathpalia@gmail.com" className="text-gray-500 hover:text-royal-purple text-sm transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-royal-purple/20 backdrop-blur-lg flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowLogin(false);
            setPassword('');
            setError('');
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/90 backdrop-blur-xl border border-royal-purple-light/50 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-royal-purple/30"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium text-royal-purple">Student Portal</h2>
              <button
                onClick={() => {
                  setShowLogin(false);
                  setPassword('');
                  setError('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-royal-purple mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/80 border border-royal-purple-light text-gray-800 rounded-2xl focus:outline-none focus:border-royal-purple transition-colors"
                  placeholder="Enter Password"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-sm text-gray-500">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-royal-purple to-royal-purple-light text-white rounded-2xl font-medium hover:shadow-lg hover:shadow-royal-purple/50 transition-all"
              >
                Log In
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

