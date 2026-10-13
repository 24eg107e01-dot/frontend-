import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import PredictorForm from './components/PredictorForm';
import PredictionResults from './components/PredictionResults';
import AdvisorAlerts from './components/AdvisorAlerts';
import CareerRoadmapModal from './components/CareerRoadmapModal';
import ModelArchitectureModal from './components/ModelArchitectureModal';
import AuthModal from './components/AuthModal';
import { api } from './services/api';
import { sounds } from './components/AudioEffects';
import { Sparkles, Terminal, ShieldCheck, HeartHandshake, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('predictor'); // 'predictor' | 'advisor'
  const [predictionResults, setPredictionResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    fullName: 'Alex Rivera',
    role: 'STUDENT',
    studentRollNo: 'CS-2026-104',
    department: 'Computer Science & Engineering'
  });
  const [selectedCareerForRoadmap, setSelectedCareerForRoadmap] = useState(null);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBackendOnline, setIsBackendOnline] = useState(false);

  // Periodic health check for Spring Boot backend
  useEffect(() => {
    const check = async () => {
      const online = await api.checkHealth();
      setIsBackendOnline(online);
    };
    check();
    const interval = setInterval(check, 10000);
    return () => clearInterval(interval);
  }, []);

  // Handle Predictor form submission
  const handleRunPrediction = async (formData) => {
    setIsLoading(true);
    try {
      const results = await api.predictGpaAndCareer(formData);
      setPredictionResults(results);
      // Auto-scroll to results smoothly
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* 1. Interactive 3D/Constellation Canvas Particle VFX Background */}
      <ParticleBackground />

      {/* 2. Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        isBackendOnline={isBackendOnline}
      />

      {/* 3. Main Dashboard Content */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        
        {/* Hero Section */}
        {activeTab === 'predictor' && !predictionResults && (
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enterprise Spring Boot &bull; Random Forest &amp; Deep MLP Neural Models</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Intelligent Student Performance &amp; <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
                Career Path Predictor
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
              Early intervention and personalized guidance system tracking continuous assessments, attendance, and multi-dimensional skill evaluations to forecast GPA and match optimal career trajectories.
            </p>
          </div>
        )}

        {/* Tab 1: AI Predictor View */}
        {activeTab === 'predictor' && (
          <div className="space-y-12">
            <PredictorForm
              onSubmit={handleRunPrediction}
              isLoading={isLoading}
            />

            {/* Results Display */}
            {predictionResults && (
              <PredictionResults
                results={predictionResults}
                onSelectCareer={(career) => setSelectedCareerForRoadmap(career)}
              />
            )}
          </div>
        )}

        {/* Tab 2: Advisor Early Intervention Portal */}
        {activeTab === 'advisor' && (
          <AdvisorAlerts />
        )}

      </main>

      {/* 4. Modals */}
      {selectedCareerForRoadmap && (
        <CareerRoadmapModal
          career={selectedCareerForRoadmap}
          onClose={() => setSelectedCareerForRoadmap(null)}
        />
      )}

      {isArchitectureOpen && (
        <ModelArchitectureModal
          onClose={() => setIsArchitectureOpen(false)}
        />
      )}

      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={(loggedInUser) => setUser(loggedInUser)}
        />
      )}

      {/* 5. Enterprise High-Tech Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-[#05070e]/90 backdrop-blur-md py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="font-mono font-semibold text-slate-300">NEUROPATH AI PREDICTOR</span>
            <span>&bull; Academic Early Intervention &amp; Career Forecasting</span>
          </div>

          <div className="flex items-center space-x-6 font-mono text-[11px]">
            <button
              onClick={() => {
                sounds.playClick();
                setIsArchitectureOpen(true);
              }}
              className="hover:text-cyan-400 transition-colors"
            >
              System Specs
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">
              Vercel &amp; Render Cloud Ready
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400">Spring Boot 3 + Scikit-Learn</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
