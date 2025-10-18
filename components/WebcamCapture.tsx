import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CameraIcon } from './icons';

interface WebcamCaptureProps {
  onCapture: (imageSrc: string) => void;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                width: { ideal: 1280 }, 
                height: { ideal: 720 },
                facingMode: 'user' 
            } 
        });
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
        setStream(stream);
    } catch (err) {
        console.error("Error accessing webcam:", err);
        setError("Could not access the camera. Please check permissions and try again.");
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      onCapture(dataUrl);
    }
  };

  if (error) {
    return (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-8 text-center flex flex-col items-center">
            <h2 className="text-xl font-semibold text-red-500 mb-4">Camera Error</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <button onClick={startCamera} style={{ backgroundColor: '#1E90FF' }} className="px-6 py-2 text-white font-semibold rounded-full shadow-md hover:opacity-90 transition">
                Retry
            </button>
        </div>
    );
  }

  return (
    <div className="bg-gray-900/50 border border-gray-700 backdrop-blur-sm rounded-2xl shadow-2xl p-6 lg:p-8 flex flex-col items-center w-full">
        <h2 className="text-2xl font-bold text-white mb-2">Ready for Your Radiance Check</h2>
        <p className="text-gray-400 mb-6">Position your face in the frame and capture your photo.</p>
        <div className="relative w-full max-w-2xl aspect-video bg-black rounded-lg overflow-hidden shadow-inner border border-gray-700">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform scale-x-[-1]"></video>
            {!stream && <div className="absolute inset-0 flex items-center justify-center text-gray-400">Starting camera...</div>}
        </div>
        <button
            onClick={handleCapture}
            disabled={!stream}
            style={{ backgroundColor: '#1E90FF' }}
            className="mt-6 px-8 py-4 text-white font-bold rounded-full shadow-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center gap-3"
        >
            <CameraIcon className="w-6 h-6" />
            <span>Capture Photo</span>
        </button>
    </div>
  );
};

export default WebcamCapture;