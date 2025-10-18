import React, { useState, useCallback } from 'react';
import { AnalysisResult, AppState, AuthView, User } from './types';
import { getFaceAnalysis } from './services/geminiService';
import WelcomeScreen from './components/WelcomeScreen';
import WebcamCapture from './components/WebcamCapture';
import Loader from './components/Loader';
import AnalysisDisplay from './components/AnalysisDisplay';
import ErrorDisplay from './components/ErrorDisplay';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authView, setAuthView] = useState<AuthView>('login');
  
  const [appState, setAppState] = useState<AppState>('dashboard');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback((user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setAppState('dashboard');
  }, []);

  const handleSignUp = useCallback((user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setAppState('dashboard');
  }, []);
  
  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setAuthView('login');
    setAppState('dashboard'); // Reset app state
  }, []);

  const handleCapture = useCallback(async (image: string) => {
    setImageSrc(image);
    setAppState('analyzing');
    setError(null);
    try {
      const result = await getFaceAnalysis(image);
      setAnalysis(result);
      setAppState('results');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during analysis.');
      setAppState('error');
    }
  }, []);

  const handleReset = useCallback(() => {
    setImageSrc(null);
    setAnalysis(null);
    setError(null);
    setAppState('initial'); 
  }, []);

  const handleBackToDashboard = useCallback(() => {
    handleReset();
    setAppState('dashboard');
  },[handleReset]);
  
  const handleStartAnalysis = useCallback(() => {
    setAppState('initial');
  }, []);

  const renderContent = () => {
    if (!isAuthenticated) {
      switch (authView) {
        case 'login':
          return <LoginPage onLogin={handleLogin} onSwitchToSignUp={() => setAuthView('signup')} />;
        case 'signup':
          return <SignUpPage onSignUp={handleSignUp} onSwitchToLogin={() => setAuthView('login')} />;
        default:
          return <LoginPage onLogin={handleLogin} onSwitchToSignUp={() => setAuthView('signup')} />;
      }
    }

    switch (appState) {
      case 'dashboard':
        return <Dashboard user={currentUser!} onStartAnalysis={handleStartAnalysis} />;
      case 'initial':
        return <WelcomeScreen onStart={() => setAppState('capturing')} />;
      case 'capturing':
        return <WebcamCapture onCapture={handleCapture} />;
      case 'analyzing':
        return <Loader message="Analyzing your morning glow..." />;
      case 'results':
        return analysis && imageSrc ? (
          <AnalysisDisplay analysis={analysis} imageSrc={imageSrc} onReset={handleReset} />
        ) : (
          <ErrorDisplay error="Analysis data is missing." onRetry={handleReset} />
        );
      case 'error':
        return <ErrorDisplay error={error || 'An unexpected error occurred.'} onRetry={handleReset} />;
      default:
        return <Dashboard user={currentUser!} onStartAnalysis={handleStartAnalysis} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col font-sans">
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} onLogoClick={handleBackToDashboard} />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-5xl mx-auto">
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;