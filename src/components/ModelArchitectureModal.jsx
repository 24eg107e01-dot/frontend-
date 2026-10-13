import React from 'react';
import { X, Layers, Cpu, Database, Network, GitBranch, ShieldCheck } from 'lucide-react';
import { sounds } from './AudioEffects';

export default function ModelArchitectureModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-glow max-w-3xl w-full rounded-3xl p-6 sm:p-8 border-cyan-500/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 text-white">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              System &amp; ML Architecture Specification
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Hybrid Random Forest + Multi-Layer Perceptron (MLP) Neural Network
            </p>
          </div>
        </div>

        {/* Architecture Blocks */}
        <div className="space-y-6">
          
          {/* 1. ML Pipeline Architecture */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-cyan-300 font-mono-tech flex items-center space-x-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>1. Hybrid Machine Learning Pipeline</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              The engine combines supervised decision trees with artificial neural networks to model non-linear academic trajectories:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-cyan-500/20">
                <strong className="text-cyan-400 block mb-1">Ensemble Random Forest (50 Trees)</strong>
                <p className="text-slate-400">
                  Performs bootstrap aggregation over normalized telemetry. Captures threshold cutoffs such as attendance &lt; 75% causing sharp internal grade vulnerability.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-purple-500/20">
                <strong className="text-purple-400 block mb-1">Multi-Layer Perceptron (Deep ANN)</strong>
                <p className="text-slate-400">
                  Feedforward architecture: 12 Input Neurons &rarr; Dense 16 (ReLU) &rarr; Dense 8 (ReLU) &rarr; Continuous GPA Regressor, weighting multi-dimensional cognitive competencies.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Cosine Vector Alignment for Career Recommendations */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-purple-300 font-mono-tech flex items-center space-x-2">
              <GitBranch className="w-4 h-4 text-purple-400" />
              <span>2. Career Path Recommender (Cosine Similarity Metric)</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Computes normalized dot-product alignment between the student&apos;s 7-dimensional skill vector and 7 empirical industry benchmark archetypes (AI/ML Engineer, Full-Stack, Cloud DevOps, Cybersecurity, Data Science, Product, Mobile App Developer):
            </p>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-cyan-300 text-center">
              Similarity = (A &bull; B) / (||A|| &times; ||B||) &times; 100%
            </div>
          </div>

          {/* 3. Early Intervention Alert Rules */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-rose-300 font-mono-tech flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-rose-400" />
              <span>3. Advisor Early Intervention Thresholds</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Automated alerts are triggered to the Academic Advisory Portal when:
            </p>
            <ul className="text-xs text-slate-400 list-disc list-inside space-y-1">
              <li>Attendance Percentage &lt; 75.0% (Institutional mandate compliance violation)</li>
              <li>Predicted Semester GPA &lt; 5.50 (High probability of academic probation)</li>
              <li>Calculated Composite Risk Vulnerability Score &gt;= 60.0%</li>
            </ul>
          </div>

          {/* 4. Deployment Topology */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-emerald-300 font-mono-tech flex items-center space-x-2">
              <Network className="w-4 h-4 text-emerald-400" />
              <span>4. Enterprise Cloud Deployment Stack</span>
            </h4>
            <div className="text-xs text-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-cyan-400 font-semibold font-mono">Frontend (Vercel):</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Vite + React 18 SPA with Web Audio API &amp; dynamic Canvas VFX</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-purple-400 font-semibold font-mono">Backend (Render):</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Spring Boot 3 REST API + Spring Security JWT + Hibernate JPA</p>
              </div>
            </div>
          </div>

        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all"
          >
            Close Overview
          </button>
        </div>

      </div>
    </div>
  );
}
