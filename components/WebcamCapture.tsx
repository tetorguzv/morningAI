import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CameraIcon } from './icons';

interface WebcamCaptureProps {
  onCapture: (imageSrc: string) => void;
}

// Declare faceapi loaded from script tag in index.html
declare const faceapi: any;

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Fix: Provide initial value to useRef to resolve "Expected 1 arguments, but got 0" error.
  const detectionInterval = useRef<number | undefined>(undefined);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const startFaceDetection = useCallback(() => {
    detectionInterval.current = window.setInterval(async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && canvas && !video.paused && !video.ended) {
        // Set canvas dimensions to match the video element
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Detect face with landmarks
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
        const resizedDetections = faceapi.resizeResults(detections, { width: video.videoWidth, height: video.videoHeight });
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (resizedDetections && resizedDetections.length > 0) {
            // Because the video is flipped horizontally via CSS, we must also flip the canvas context
            ctx.save();
            ctx.scale(-1, 1);
            ctx.translate(-canvas.width, 0);

            // Draw the green bounding box
            faceapi.draw.drawDetections(canvas, resizedDetections.map(d => d.detection), { boxColor: 'rgba(0, 255, 0, 0.7)' });
            
            // Draw the green facial landmarks
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections.map(d => d.landmarks), {
                drawLines: true,
                lineColor: 'rgba(0, 255, 0, 0.7)',
                pointColor: 'rgba(0, 255, 0, 0.7)',
                pointSize: 2
            });

            // Restore the context to its original state
            ctx.restore();
          }
        }
      }
    }, 100); // Run detection every 100ms
  }, []);

  const loadModels = useCallback(async () => {
    const MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights';
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      ]);
      setModelsLoaded(true);
      startFaceDetection();
    } catch (e) {
      console.error("Error loading face-api models:", e);
      setError("Could not load AI models for face tracking. Please try refreshing the page.");
    }
  }, [startFaceDetection]);

  const startCamera = useCallback(async () => {
    try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                width: { ideal: 1280 }, 
                height: { ideal: 720 },
                facingMode: 'user' 
            } 
        });
        if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
    } catch (err) {
        console.error("Error accessing webcam:", err);
        setError("Could not access the camera. Please check permissions and try again.");
    }
  }, []);

  useEffect(() => {
    startCamera();
    loadModels();
    
    return () => {
      // Cleanup on component unmount
      clearInterval(detectionInterval.current);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [startCamera, loadModels, stream]);

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Flip the captured image to match the user's view
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.restore();
      
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
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]"></video>
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
              {!stream && <span>Starting camera...</span>}
              {stream && !modelsLoaded && <span>Loading AI face tracker...</span>}
            </div>
        </div>
        <button
            onClick={handleCapture}
            disabled={!stream || !modelsLoaded}
            style={{ backgroundColor: '#1E90FF' }}
            className="mt-6 px-8 py-4 text-white font-bold rounded-full shadow-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center gap-3"
            aria-label="Capture Photo"
        >
            <CameraIcon className="w-6 h-6" />
            <span>Capture Photo</span>
        </button>
    </div>
  );
};

export default WebcamCapture;