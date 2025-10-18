import React, { useState, useEffect, useRef } from 'react';
import { AnalysisResult } from '../types';
import { getVoiceSummary } from '../services/geminiService';
import { RefreshIcon, SwellingIcon, SkinIcon, FatigueIcon, StressIcon, CheckCircleIcon, SpeakerIcon, PauseIcon, SpinnerIcon } from './icons';

// Audio decoding utilities
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}


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
  const { overallSummary, swelling, skin, fatigue, stress, voiceSummary } = analysis;

  const [isAudioLoading, setAudioLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const stopAudio = () => {
    if (audioSourceRef.current) {
        audioSourceRef.current.stop();
        // The onended event will handle cleanup and state change
    }
  };
  
  const playAudio = () => {
    if (!audioBufferRef.current || !audioContextRef.current || isPlaying) return;

    if (audioSourceRef.current) {
        stopAudio();
    }
    
    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.onended = () => {
        setIsPlaying(false);
        audioSourceRef.current = null;
    };
    source.start(0);
    audioSourceRef.current = source;
    setIsPlaying(true);
  };

  const handlePlaybackToggle = () => {
      if (isPlaying) {
          stopAudio();
      } else {
          playAudio();
      }
  };
  
  useEffect(() => {
    let isMounted = true;

    const generateAndPlayAudio = async () => {
        if (!voiceSummary) {
            setAudioLoading(false);
            return;
        }

        setAudioLoading(true);
        try {
            const base64Audio = await getVoiceSummary(voiceSummary);
            if (!isMounted) return;

            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            audioContextRef.current = ctx;
            
            const decodedBytes = decode(base64Audio);
            const buffer = await decodeAudioData(decodedBytes, ctx, 24000, 1);
            audioBufferRef.current = buffer;
            
            playAudio();
        } catch (error) {
            console.error("Failed to generate or play audio:", error);
        } finally {
            if (isMounted) {
                setAudioLoading(false);
            }
        }
    };
    
    generateAndPlayAudio();

    return () => {
        isMounted = false;
        stopAudio();
        audioContextRef.current?.close();
    };
}, [voiceSummary]);

  return (
    <div className="bg-gray-900/50 border border-gray-700 backdrop-blur-sm rounded-2xl shadow-2xl p-6 lg:p-8 w-full animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col items-center">
            <div className="flex items-center justify-center mb-4 relative">
                <h2 className="text-2xl font-bold text-white text-center">Your Morning Snapshot</h2>
                 <button 
                    onClick={handlePlaybackToggle} 
                    disabled={isAudioLoading || !audioBufferRef.current}
                    className="ml-3 w-10 h-10 flex items-center justify-center rounded-full bg-gray-700/80 text-white hover:bg-gray-600/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={isPlaying ? 'Pause summary' : 'Play summary'}
                  >
                    {isAudioLoading ? <SpinnerIcon className="w-5 h-5"/> : (isPlaying ? <PauseIcon className="w-5 h-5"/> : <SpeakerIcon className="w-5 h-5"/>)}
                </button>
            </div>
          <img src={imageSrc} alt="Your captured" className="rounded-lg shadow-lg w-full max-w-sm object-cover border-2 border-gray-700" />
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