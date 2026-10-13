import React, { useEffect } from 'react';
import { 
  TrendingUp, 
  AlertOctagon, 
  CheckCircle, 
  Compass, 
  Award, 
  Briefcase, 
  ArrowUpRight, 
  BrainCircuit, 
  ShieldAlert, 
  BookOpen, 
  Lightbulb, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from './AudioEffects';

export default function PredictionResults({ results, onSelectCareer }) {
  if (!results) return null;

  const isCritical = results.riskLevel === 'CRITICAL';
  const isModerate = results.riskLevel === 'MODERATE';
  const isSafe = results.riskLevel === 'SAFE';

  // Trigger celebration or audio alert on mount
  useEffect(() => {
    if (isCritical) {
      sounds.playAlert();
    } else if (results.predictedGpa >= 8.0) {
      sounds.playSuccess();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#a855f7', '#10b981', '#38bdf8']
      });
    } else {
      sounds.playSuccess();
    }
  }, [results]);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 1. Early Intervention Critical Alert Banner (if applicable) */}
      {isCritical && (
        <div className="p-5 rounded-2xl bg-rose-950/40 border-2 border-rose-500/80 shadow-[0_0_30px_rgba(244,63,94,0.3)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 animate-pulse">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold tracking-widest text-rose-400 uppercase">
                  AUTOMATED EARLY INTERVENTION ACTIVE
                </span>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              </div>
              <h4 className="text-base font-bold text-white mt-0.5">
                Academic Advisory Threshold Exceeded
              </h4>
              <p className="text-xs text-rose-200/80 mt-1 max-w-2xl">
                {results.earlyInterventionMessage} An automated retention ticket has been logged in the Counselor Early Intervention Portal.
              </p>
            </div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold whitespace-nowrap">
            RISK SCORE: {results.riskScore.toFixed(0)} / 100
          </div>
        </div>
      )}

      {/* 2. Top Metric Cards: Holographic GPA Gauge + Risk Level + Model Confidence */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Holographic GPA Card */}
        <div className="glass-panel-glow rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
            <span className="flex items-center space-x-1.5 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Predicted Semester GPA</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
              {results.predictedGrade}
            </span>
          </div>

          <div className="my-5 text-center">
            <div className="inline-block relative">
              <span className="text-6xl font-extrabold font-mono-tech tracking-tight bg-gradient-to-br from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                {results.predictedGpa.toFixed(2)}
              </span>
              <span className="text-sm font-mono text-slate-400 ml-1">/ 10.0</span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Confidence Interval: [{results.predictedGpaMin.toFixed(2)} — {results.predictedGpaMax.toFixed(2)}]
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between items-center font-mono">
            <span>Historical Alignment</span>
            <span className="text-emerald-400 font-bold">P95 Robustness</span>
          </div>
        </div>

        {/* Academic Risk Level Card */}
        <div className={`glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border ${
          isCritical ? 'border-rose-500/50 bg-rose-950/20' : isModerate ? 'border-amber-500/50 bg-amber-950/20' : 'border-emerald-500/50 bg-emerald-950/20'
        }`}>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center space-x-1.5 uppercase tracking-wider text-slate-300">
              {isCritical ? <AlertOctagon className="w-4 h-4 text-rose-400" /> : <CheckCircle className="w-4 h-4 text-emerald-400" />}
              <span>Academic Risk Level</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">EARLY DETECTION</span>
          </div>

          <div className="my-5 text-center">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-lg font-bold font-mono tracking-wider ${
              isCritical ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
              isModerate ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
              'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}>
              <span className={`w-3 h-3 rounded-full ${isCritical ? 'bg-rose-400 animate-ping' : isModerate ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
              <span>{results.riskLevel} RISK</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto">
              {isCritical ? 'High bottleneck probability detected. Immediate counselor consultation advised.' :
               isModerate ? 'Minor performance dips detected. Monitoring suggested.' :
               'Student is operating on a robust, high-performance academic trajectory.'}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between items-center font-mono">
            <span>Risk Vulnerability</span>
            <span className="font-bold text-slate-200">{results.riskScore.toFixed(0)}% Index</span>
          </div>
        </div>

        {/* Neural Model Diagnostics Card */}
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-purple-400">
            <span className="flex items-center space-x-1.5 uppercase tracking-wider">
              <BrainCircuit className="w-4 h-4" />
              <span>Model Diagnostics</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
              {results.confidenceScore}% Confidence
            </span>
          </div>

          <div className="my-4 space-y-2">
            <p className="text-xs font-semibold text-slate-200">
              {results.modelUsed}
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Ensemble Bagging:</span>
                <span className="text-cyan-400">50 Sub-Trees</span>
              </div>
              <div className="flex justify-between">
                <span>Neural Topology:</span>
                <span className="text-purple-400">{"12 -> 16 -> 8 -> 1"}</span>
              </div>
              <div className="flex justify-between">
                <span>Activation:</span>
                <span className="text-slate-200">Rectified Linear (ReLU)</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between items-center font-mono">
            <span>Telemetry Timestamp</span>
            <span className="text-slate-300">{results.timestamp}</span>
          </div>
        </div>

      </div>

      {/* 3. Academic Bottlenecks & Personalized Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Identified Bottlenecks */}
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-sm font-bold text-slate-200 tracking-wider uppercase font-mono-tech flex items-center space-x-2 mb-4">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Identified Academic Bottlenecks ({results.riskFactors?.length || 0})</span>
          </h3>

          {results.riskFactors && results.riskFactors.length > 0 ? (
            <div className="space-y-2.5">
              {results.riskFactors.map((factor, idx) => (
                <div 
                  key={idx} 
                  className="p-3 rounded-xl bg-slate-900/70 border border-rose-500/20 text-xs text-rose-200 flex items-start space-x-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0"></span>
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>No critical academic bottlenecks detected! Academic pacing is optimal.</span>
            </div>
          )}
        </div>

        {/* Personalized Strategic Advice */}
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-sm font-bold text-slate-200 tracking-wider uppercase font-mono-tech flex items-center space-x-2 mb-4">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Personalized Pacing &amp; Upskilling Guidance</span>
          </h3>

          <div className="space-y-2.5">
            {results.personalizedAdvice?.map((advice, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 flex items-start space-x-2.5"
              >
                <ChevronRight className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>{advice}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. Ranked Career Domain Suggestions Based on Skill Alignment */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
          <div>
            <div className="flex items-center space-x-2 text-purple-400 text-xs font-mono tracking-widest uppercase">
              <Compass className="w-3.5 h-3.5" />
              <span>AI Skill Alignment Engine</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Ranked Career Path Recommendations
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Cosine Similarity matching over industry competency profiles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.topCareerRecommendations?.map((career, idx) => (
            <div 
              key={idx}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between relative group border border-slate-800 hover:border-cyan-500/50"
            >
              {/* Badge: Match % */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    Rank #{idx + 1} &bull; {career.category}
                  </span>
                  <span className="text-sm font-extrabold font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                    {career.matchPercentage}% MATCH
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {career.title}
                </h4>

                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {career.description}
                </p>

                {/* Salary & Demand */}
                <div className="mt-4 p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Est. Salary:</span>
                    <span className="text-emerald-300 font-semibold">{career.avgSalaryRange}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Market Demand:</span>
                    <span className="text-cyan-300 font-semibold">{career.marketDemand}</span>
                  </div>
                </div>

                {/* Aligned Strengths */}
                <div className="mt-4">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    Verified Strengths:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {career.keyStrengths?.slice(0, 3).map((st, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                        &check; {st}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommended Certifications */}
                <div className="mt-3">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    Recommended Certifications:
                  </span>
                  <div className="space-y-1">
                    {career.recommendedCerts?.slice(0, 2).map((cert, i) => (
                      <div key={i} className="text-[11px] text-slate-300 flex items-center space-x-1.5">
                        <Award className="w-3 h-3 text-purple-400 flex-shrink-0" />
                        <span className="truncate">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* View Interactive Roadmap Button */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    onSelectCareer(career);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 font-medium text-xs tracking-wider transition-all flex items-center justify-center space-x-1.5 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                >
                  <span>EXPLORE CAREER ROADMAP</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
