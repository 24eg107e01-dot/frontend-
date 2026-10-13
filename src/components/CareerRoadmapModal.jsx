import React from 'react';
import { X, CheckCircle, ArrowRight, BookOpen, Award, Terminal, Rocket } from 'lucide-react';
import { sounds } from './AudioEffects';

export default function CareerRoadmapModal({ career, onClose }) {
  if (!career) return null;

  const stages = [
    {
      title: "Stage 1: Foundational Core",
      timeframe: "Months 1 — 2",
      icon: Terminal,
      items: [
        "Master object-oriented patterns, data structures, and algorithmic complexity",
        "Deep-dive into continuous evaluation core concepts & discrete mathematics",
        "Establish Git workflow and CI automation basics"
      ]
    },
    {
      title: "Stage 2: Applied Specialization",
      timeframe: "Months 3 — 4",
      icon: BookOpen,
      items: [
        `Target role-specific toolchains for ${career.title}`,
        "Build modular microservice or data processing pipelines",
        "Bridge theory into practice with continuous integration"
      ]
    },
    {
      title: "Stage 3: Capstone Systems Engineering",
      timeframe: "Months 5 — 6",
      icon: Rocket,
      items: [
        "Architect end-to-end full stack or ML production system",
        "Implement containerization (Docker) and cloud deployments",
        "Execute rigorous integration testing and performance profiling"
      ]
    },
    {
      title: "Stage 4: Industry Certification & Placement",
      timeframe: "Months 7+",
      icon: Award,
      items: [
        `Achieve verified credential: ${career.recommendedCerts?.[0] || 'Target Industry Certification'}`,
        "Polish GitHub portfolio and system architecture documentation",
        "Mock technical interview rounds and behavioral presentation"
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-glow max-w-2xl w-full rounded-3xl p-6 sm:p-8 border-cyan-500/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
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

        {/* Header */}
        <div className="mb-6">
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            {career.matchPercentage}% SKILL ALIGNMENT
          </span>
          <h3 className="text-2xl font-bold text-white mt-2">
            {career.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Personalized 4-Stage Upskilling Roadmap &amp; Milestone Plan
          </p>
        </div>

        {/* Stages Timeline */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-purple-500 before:to-pink-500">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div key={idx} className="relative flex items-start space-x-4 pl-2">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-cyan-500/50 flex items-center justify-center text-cyan-400 z-10 shadow-lg shadow-cyan-500/20">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-white font-mono-tech">{stage.title}</h4>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                      {stage.timeframe}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {stage.items.map((item, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs tracking-wider uppercase transition-all"
          >
            Close Roadmap
          </button>
        </div>

      </div>
    </div>
  );
}
