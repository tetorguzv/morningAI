import React from 'react';
import { AnalysisResult } from '../types';
import { RefreshIcon, SwellingIcon, SkinIcon, FatigueIcon, StressIcon, CheckCircleIcon } from './icons';

interface AnalysisDisplayProps {
  analysis: AnalysisResult;
  imageSrc: string;
  onReset: () => void;
}

interface AnalysisCardProps {
    icon: React.ReactNode;
    title: string;
    observation: string;
    tips: string[];
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ icon, title, observation, tips }) => (
    <div className="bg-gray-800/70 rounded-xl p-6 transition-shadow hover:shadow-lg border border-gray-700 hover:border-gray-600">
        <div className="flex items-center mb-4">
            {icon}
            <h3 className="text-xl font-bold text-white ml-3">{title}</h3>
        </div>
        <p className="text-gray-400 mb-4 italic">"{observation}"</p>
        <ul className="space-y-2">
            {tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{tip}</span>
                </li>
            ))}
        </ul>
    </div>
);


const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, imageSrc, onReset }) => {
  const { overallSummary, swelling, skin, fatigue, stress } = analysis;

  return (
    <div className="bg-gray-900/50 border border-gray-700 backdrop-blur-sm rounded-2xl shadow-2xl p-6 lg:p-8 w-full animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Your Morning Snapshot</h2>
          <img src={imageSrc} alt="Your captured" className="rounded-lg shadow-lg w-full max-w-sm object-cover transform scale-x-[-1] border-2 border-gray-700" />
          <p className="text-gray-300 mt-6 text-center text-lg font-medium">{overallSummary}</p>
          <button
            onClick={onReset}
            style={{ backgroundColor: '#1E90FF' }}
            className="mt-6 px-6 py-3 text-white font-semibold rounded-full shadow-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <RefreshIcon className="w-5 h-5" />
            <span>Analyze Again</span>
          </button>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-white mb-4 text-center lg:text-left">Your Personalized Radiance Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnalysisCard 
              icon={<SwellingIcon className="w-8 h-8 text-blue-400"/>}
              title="Swelling & Puffiness"
              observation={swelling.observation}
              tips={swelling.tips}
            />
            <AnalysisCard 
              icon={<SkinIcon className="w-8 h-8 text-pink-400"/>}
              title="Skin Condition"
              observation={skin.observation}
              tips={skin.tips}
            />
            <AnalysisCard 
              icon={<FatigueIcon className="w-8 h-8 text-purple-400"/>}
              title="Signs of Fatigue"
              observation={fatigue.observation}
              tips={fatigue.tips}
            />
            <AnalysisCard 
              icon={<StressIcon className="w-8 h-8 text-orange-400"/>}
              title="Signs of Stress"
              observation={stress.observation}
              tips={stress.tips}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDisplay;