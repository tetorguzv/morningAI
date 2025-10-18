import React from 'react';
import { CameraIcon, BrainIcon, LightbulbIcon } from './icons';

interface IntroductionScreenProps {
  onGetStarted: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 transition-all duration-300 hover:border-blue-500/50 hover:bg-gray-900 hover:-translate-y-1">
    <div className="mb-4 inline-block p-3 bg-gray-800/50 rounded-lg border border-gray-700">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">{children}</p>
  </div>
);

const IntroductionScreen: React.FC<IntroductionScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="w-full text-white animate-fade-in bg-black">
      {/* Hero Section */}
      <section 
        className="relative text-center py-24 lg:py-40 flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-black" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(30, 144, 255, 0.1), transparent 70%)' }}></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight"
              style={{ background: 'linear-gradient(to right, #ffffff, #d1d1d1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Morning Radiance AI
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Unlock your best self, every morning. Personalized wellness insights powered by AI to help you look and feel your best.
          </p>
          <button
            onClick={onGetStarted}
            style={{ backgroundColor: '#1E90FF' }}
            className="px-8 py-3 text-white font-semibold rounded-full shadow-lg electric-blue-shadow hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">A Glimpse Into Your Wellness</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Our technology provides a seamless and insightful experience in three simple steps.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <FeatureCard icon={<CameraIcon className="w-7 h-7 text-blue-400" />} title="1. Quick Capture">
              Use your camera to take a clear photo of your face first thing in the morning. It's fast, easy, and secure.
            </FeatureCard>
            <FeatureCard icon={<BrainIcon className="w-7 h-7 text-blue-400" />} title="2. Intelligent Analysis">
              Our advanced AI analyzes your photo for key wellness indicators like skin condition, puffiness, and signs of fatigue.
            </FeatureCard>
            <FeatureCard icon={<LightbulbIcon className="w-7 h-7 text-blue-400" />} title="3. Personalized Insights">
              Receive actionable tips and suggestions to help you feel refreshed and ready to conquer your day.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 lg:py-24 bg-gray-900/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
            <svg className="mx-auto h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          <blockquote className="mt-6">
            <p className="text-xl font-medium text-gray-200">
              "Morning Radiance has completely changed my morning routine. I feel more in tune with my body and start my day with intention. It's like having a personal wellness coach."
            </p>
          </blockquote>
          <footer className="mt-6">
            <div className="text-base font-medium text-gray-400">Alex Rivera</div>
            <div className="text-sm text-gray-500">Early Adopter</div>
          </footer>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Your Partner in Self-Care</h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            We believe that self-awareness is the first step towards better well-being. Our mission is to provide accessible, personalized insights that empower you to cultivate positive morning routines and build a deeper connection with yourself. Morning Radiance is more than an app—it's your daily companion in self-care.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Morning Radiance AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default IntroductionScreen;
