import React from 'react';

interface IntroductionScreenProps {
  onGetStarted: () => void;
}

const IntroductionScreen: React.FC<IntroductionScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="w-full text-white animate-fade-in">
        {/* Hero Section */}
        <section className="relative text-center py-20 lg:py-32 rounded-b-2xl overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Morning Radiance AI</h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8">Unlock Your Best Self, Every Morning.</p>
                <button
                    onClick={onGetStarted}
                    style={{ backgroundColor: '#1E90FF' }}
                    className="px-8 py-3 text-white font-semibold rounded-full shadow-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105"
                >
                    Get Started
                </button>
            </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 lg:py-24 bg-black">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
                <p className="text-gray-400 mb-12 max-w-2xl mx-auto">Using Morning Radiance AI is as easy as 1-2-3!</p>
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {/* Step 1 */}
                    <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="text-blue-400 mb-4 text-4xl font-bold">1.</div>
                        <h3 className="text-xl font-semibold mb-2">Snap a Photo</h3>
                        <p className="text-gray-400">Use your device's camera to take a quick, clear photo of your face first thing in the morning.</p>
                    </div>
                    {/* Step 2 */}
                    <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="text-blue-400 mb-4 text-4xl font-bold">2.</div>
                        <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                        <p className="text-gray-400">Our advanced AI analyzes the image for key wellness indicators like puffiness, skin condition, and fatigue.</p>
                    </div>
                    {/* Step 3 */}
                    <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="text-blue-400 mb-4 text-4xl font-bold">3.</div>
                        <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
                        <p className="text-gray-400">Receive personalized tips and suggestions to help you look and feel refreshed and ready for the day.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Mission Statement Section */}
        <section className="py-16 lg:py-24 bg-gray-900/50 rounded-t-2xl">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                    Our mission is to empower individuals to start their day with confidence and self-awareness. We believe that by providing accessible, personalized wellness insights, we can help people cultivate positive morning routines and build a better connection with their own well-being. Morning Radiance is more than an app; it's your daily partner in self-care.
                </p>
            </div>
        </section>
    </div>
  );
};

export default IntroductionScreen;
