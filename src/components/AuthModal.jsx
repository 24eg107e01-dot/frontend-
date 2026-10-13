import React, { useState } from 'react';
import { X, Lock, Mail, Shield, User, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import { sounds } from './AudioEffects';

export default function AuthModal({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    sounds.playClick();
    setIsLoading(true);
    try {
      const user = await api.login(email, password);
      onLoginSuccess(user);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = async (roleType) => {
    sounds.playClick();
    setIsLoading(true);
    const demoEmail = roleType === 'advisor' ? 'advisor@university.edu' : 'student@university.edu';
    try {
      const user = await api.login(demoEmail, 'demo123');
      onLoginSuccess(user);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-glow max-w-md w-full rounded-3xl p-6 sm:p-8 border-cyan-500/40 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Authentication Portal
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Sign in with institutional credentials or select a 1-click demo role
          </p>
        </div>

        {/* 1-Click Demo Logins */}
        <div className="space-y-2.5 mb-6">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block text-center">
            Instant Demo Sign-In
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleQuickDemo('student')}
              className="p-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition-all"
            >
              <User className="w-4 h-4 text-cyan-400" />
              <span>Student Role</span>
              <span className="text-[9px] text-slate-400 font-mono">Alex Rivera</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('advisor')}
              className="p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition-all"
            >
              <Shield className="w-4 h-4 text-purple-400" />
              <span>Advisor Role</span>
              <span className="text-[9px] text-slate-400 font-mono">Dr. Evelyn Vance</span>
            </button>
          </div>
        </div>

        <div className="relative flex py-2 items-center mb-5">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-3 text-slate-500 text-[10px] font-mono uppercase">Or Enter Credentials</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Institutional Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 text-xs text-white placeholder-slate-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 text-xs text-white placeholder-slate-500 outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : 'Sign In via Spring Security'}
          </button>
        </form>

      </div>
    </div>
  );
}
