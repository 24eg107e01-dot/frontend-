import React, { useState, useEffect } from 'react';
import { Cpu, Volume2, VolumeX, ShieldCheck, Sparkles, User, Bell, Activity } from 'lucide-react';
import { sounds } from './AudioEffects';

export default function Navbar({ activeTab, setActiveTab, user, onOpenAuth, onOpenArchitecture, isBackendOnline }) {
  const [isMuted, setIsMuted] = useState(sounds.isMuted);

  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const handleTabChange = (tab) => {
    sounds.playTab();
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-500/20 bg-[#05070e]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => handleTabChange('predictor')}
          className="flex items-center space-x-3 cursor-pointer group select-none"
        >
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-400 bg-clip-text text-transparent font-mono-tech">
                NEUROPATH
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded font-mono">
                AI v2.6
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide hidden sm:block">
              Student Performance &amp; Career Path Predictor
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1 p-1 bg-slate-900/60 border border-slate-800 rounded-xl">
          <button
            onClick={() => handleTabChange('predictor')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all duration-200 flex items-center space-x-2 ${
              activeTab === 'predictor'
                ? 'bg-gradient-to-r from-cyan-600/80 to-blue-600/80 text-white shadow-md shadow-cyan-500/20 border border-cyan-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI PREDICTOR</span>
          </button>

          <button
            onClick={() => handleTabChange('advisor')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all duration-200 flex items-center space-x-2 ${
              activeTab === 'advisor'
                ? 'bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white shadow-md shadow-purple-500/20 border border-purple-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-pink-400" />
            <span>EARLY INTERVENTION</span>
            <span className="bg-pink-500/20 text-pink-300 text-[10px] px-1.5 py-0.2 rounded-full border border-pink-500/30">
              ADVISOR
            </span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenArchitecture();
            }}
            className="px-3.5 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-cyan-300 hover:bg-slate-800/50 transition-all flex items-center space-x-1.5"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>ARCHITECTURE</span>
          </button>
        </nav>

        {/* Right Tools: Backend Status, Audio FX Toggle, User Role */}
        <div className="flex items-center space-x-3">
          
          {/* Backend Connection Indicator */}
          <div 
            title={isBackendOnline ? "Spring Boot REST Backend Connected" : "Running on High-Precision Edge ML (Spring Boot Server Offline or Starting)"}
            className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border ${
              isBackendOnline
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-emerald-400 animate-pulse' : 'bg-purple-400'}`}></span>
            <span>{isBackendOnline ? 'SPRING BOOT LIVE' : 'EDGE ML ACTIVE'}</span>
          </div>

          {/* Web Audio Synthesizer Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? "Unmute Cyber Sound Effects" : "Mute Sound Effects"}
            className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center ${
              !isMuted
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-sm shadow-cyan-500/20'
                : 'bg-slate-800/40 border-slate-700/60 text-slate-500 hover:text-slate-400'
            }`}
          >
            {!isMuted ? (
              <div className="flex items-center space-x-1">
                <Volume2 className="w-4 h-4" />
                <span className="flex space-x-[2px] items-end h-3">
                  <span className="w-[2px] h-2 bg-cyan-400 animate-pulse"></span>
                  <span className="w-[2px] h-3 bg-cyan-400 animate-pulse delay-75"></span>
                  <span className="w-[2px] h-1.5 bg-cyan-400 animate-pulse delay-150"></span>
                </span>
              </div>
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* User Account / Role Switcher */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenAuth();
            }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 transition-all text-xs"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-[10px]">
              {user ? user.fullName.charAt(0) : 'U'}
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-[11px] font-semibold text-slate-200 leading-tight">
                {user ? user.fullName : 'Guest Student'}
              </p>
              <p className="text-[9px] text-cyan-400 font-mono">
                {user ? user.role : 'LOGIN / DEMO'}
              </p>
            </div>
          </button>

        </div>
      </div>
    </header>
  );
}
