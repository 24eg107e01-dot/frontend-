import React, { useState } from 'react';
import { 
  Zap, 
  Sparkles, 
  AlertTriangle, 
  BookOpen, 
  Award, 
  Code, 
  Brain, 
  Terminal, 
  Cpu, 
  Users, 
  Clock, 
  CheckCircle2, 
  RefreshCw 
} from 'lucide-react';
import { sounds } from './AudioEffects';

export default function PredictorForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    studentName: 'Alex Rivera',
    rollNumber: 'CS-2026-104',
    department: 'Computer Science & Engineering',
    semester: 4,
    
    // Academic Metrics
    attendancePercentage: 86.5,
    internalMarks: 82.0,
    midtermScore: 78.5,
    labPracticalScore: 85.0,
    pastSemesterGpa: 8.1,
    weeklyStudyHours: 16.0,

    // Foundational Skills
    codingSkillScore: 84.0,
    analyticalMathScore: 76.0,
    problemSolvingScore: 80.0,
    communicationScore: 72.0,
    dataAiScore: 85.0,
    cloudSystemsScore: 68.0,
    coCurricularScore: 70.0,
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSliderChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: Number(value) }));
  };

  // Instant Profile Presets for quick evaluation
  const loadPreset = (type) => {
    sounds.playClick();
    if (type === 'high') {
      setFormData({
        studentName: 'Sophia Vance',
        rollNumber: 'AI-2026-007',
        department: 'Artificial Intelligence',
        semester: 6,
        attendancePercentage: 94.0,
        internalMarks: 92.0,
        midtermScore: 90.0,
        labPracticalScore: 95.0,
        pastSemesterGpa: 9.3,
        weeklyStudyHours: 24.0,
        codingSkillScore: 92.0,
        analyticalMathScore: 94.0,
        problemSolvingScore: 90.0,
        communicationScore: 82.0,
        dataAiScore: 96.0,
        cloudSystemsScore: 85.0,
        coCurricularScore: 88.0,
      });
    } else if (type === 'risk') {
      setFormData({
        studentName: 'Marcus Sterling',
        rollNumber: 'CS-2026-042',
        department: 'Computer Science',
        semester: 4,
        attendancePercentage: 62.0,
        internalMarks: 44.0,
        midtermScore: 46.0,
        labPracticalScore: 55.0,
        pastSemesterGpa: 5.2,
        weeklyStudyHours: 4.0,
        codingSkillScore: 50.0,
        analyticalMathScore: 42.0,
        problemSolvingScore: 48.0,
        communicationScore: 52.0,
        dataAiScore: 40.0,
        cloudSystemsScore: 45.0,
        coCurricularScore: 35.0,
      });
    } else {
      setFormData({
        studentName: 'Alex Rivera',
        rollNumber: 'CS-2026-104',
        department: 'Computer Science & Engineering',
        semester: 4,
        attendancePercentage: 81.0,
        internalMarks: 72.0,
        midtermScore: 70.0,
        labPracticalScore: 76.0,
        pastSemesterGpa: 7.2,
        weeklyStudyHours: 12.0,
        codingSkillScore: 72.0,
        analyticalMathScore: 68.0,
        problemSolvingScore: 70.0,
        communicationScore: 65.0,
        dataAiScore: 68.0,
        cloudSystemsScore: 64.0,
        coCurricularScore: 60.0,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sounds.playScan();
    onSubmit(formData);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/20 shadow-2xl relative overflow-hidden">
      
      {/* Background cyber accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header and Quick Presets */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-8 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-1">
            <Zap className="w-3.5 h-3.5" />
            <span>Multi-Dimensional Student Telemetry</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Academic Assessment &amp; Skill Profiler
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Input continuous evaluation, attendance patterns, and skill diagnostics to trigger neural prediction.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
          <button
            type="button"
            onClick={() => loadPreset('high')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all flex items-center space-x-1.5"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>High Achiever</span>
          </button>
          <button
            type="button"
            onClick={() => loadPreset('balanced')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all"
          >
            Balanced
          </button>
          <button
            type="button"
            onClick={() => loadPreset('risk')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all flex items-center space-x-1.5"
          >
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            <span>At-Risk (Early Alert)</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Student Identity Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Student Full Name</label>
            <input
              type="text"
              value={formData.studentName}
              onChange={(e) => handleChange('studentName', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-500 outline-none transition-all"
              placeholder="e.g. Alex Rivera"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Roll / Registration No.</label>
            <input
              type="text"
              value={formData.rollNumber}
              onChange={(e) => handleChange('rollNumber', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm font-mono text-cyan-300 placeholder-slate-500 outline-none transition-all"
              placeholder="e.g. CS-2026-104"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Department / Track</label>
            <select
              value={formData.department}
              onChange={(e) => handleChange('department', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white outline-none transition-all"
            >
              <option value="Computer Science & Engineering">Computer Science &amp; Eng.</option>
              <option value="Artificial Intelligence & ML">Artificial Intelligence &amp; ML</option>
              <option value="Data Science & Analytics">Data Science &amp; Analytics</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Software Engineering">Software Engineering</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Current Semester</label>
            <select
              value={formData.semester}
              onChange={(e) => handleChange('semester', Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white outline-none transition-all"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Section 2: Continuous Assessment & Academic Performance */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-cyan-300 tracking-wider uppercase font-mono-tech flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Continuous Academic Assessments &amp; Attendance</span>
            </h3>
            {formData.attendancePercentage < 75 && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3 text-rose-400" />
                <span>Attendance Deficit (&lt;75%)</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5 rounded-xl bg-slate-900/40 border border-slate-800">
            
            {/* Attendance Percentage */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-300 flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Attendance Rate</span>
                </span>
                <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                  formData.attendancePercentage < 75 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                    : 'bg-cyan-500/20 text-cyan-300'
                }`}>
                  {formData.attendancePercentage}%
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                step="0.5"
                value={formData.attendancePercentage}
                onChange={(e) => handleSliderChange('attendancePercentage', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Critical (40%)</span>
                <span>Threshold (75%)</span>
                <span>Max (100%)</span>
              </div>
            </div>

            {/* Continuous Assessment / Internals */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-300">Continuous Assessment (Internals)</span>
                <span className="font-mono font-bold text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded">
                  {formData.internalMarks}/100
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.internalMarks}
                onChange={(e) => handleSliderChange('internalMarks', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0</span>
                <span>Pass (50)</span>
                <span>100</span>
              </div>
            </div>

            {/* Midterm Score */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-300">Midterm Examination</span>
                <span className="font-mono font-bold text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded">
                  {formData.midtermScore}/100
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.midtermScore}
                onChange={(e) => handleSliderChange('midtermScore', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>

            {/* Lab / Practical Score */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-300">Lab &amp; Practical Hands-on</span>
                <span className="font-mono font-bold text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded">
                  {formData.labPracticalScore}/100
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.labPracticalScore}
                onChange={(e) => handleSliderChange('labPracticalScore', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0</span>
                <span>60</span>
                <span>100</span>
              </div>
            </div>

            {/* Past Semester GPA */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-300 flex items-center space-x-1.5">
                  <Award className="w-3.5 h-3.5 text-purple-400" />
                  <span>Past Semester GPA Baseline</span>
                </span>
                <span className="font-mono font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded">
                  {formData.pastSemesterGpa.toFixed(2)} / 10.0
                </span>
              </div>
              <input
                type="range"
                min="2.0"
                max="10.0"
                step="0.1"
                value={formData.pastSemesterGpa}
                onChange={(e) => handleSliderChange('pastSemesterGpa', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>2.00</span>
                <span>6.50</span>
                <span>10.00</span>
              </div>
            </div>

            {/* Weekly Study Hours */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-300 flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Weekly Study Commitment</span>
                </span>
                <span className="font-mono font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">
                  {formData.weeklyStudyHours} hrs/week
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={formData.weeklyStudyHours}
                onChange={(e) => handleSliderChange('weeklyStudyHours', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0 hrs</span>
                <span>15 hrs</span>
                <span>40 hrs</span>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3: Foundational Multi-Dimensional Skill Evaluations */}
        <div>
          <h3 className="text-sm font-bold text-purple-300 tracking-wider uppercase font-mono-tech flex items-center space-x-2 mb-4">
            <Brain className="w-4 h-4 text-purple-400" />
            <span>Foundational Multi-Dimensional Skill Evaluations (0 - 100)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5 rounded-xl bg-slate-900/40 border border-slate-800">
            
            {/* Coding Proficiency */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-300 flex items-center space-x-1.5">
                  <Code className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Coding &amp; DSA</span>
                </span>
                <span className="font-mono font-bold text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                  {formData.codingSkillScore}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={formData.codingSkillScore}
                onChange={(e) => handleSliderChange('codingSkillScore', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Analytical Mathematics */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-300">Analytical &amp; Math</span>
                <span className="font-mono font-bold text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                  {formData.analyticalMathScore}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={formData.analyticalMathScore}
                onChange={(e) => handleSliderChange('analyticalMathScore', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Problem Solving / Logic */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-300">Problem Solving</span>
                <span className="font-mono font-bold text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                  {formData.problemSolvingScore}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={formData.problemSolvingScore}
                onChange={(e) => handleSliderChange('problemSolvingScore', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Communication & Presentation */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-300">Communication</span>
                <span className="font-mono font-bold text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                  {formData.communicationScore}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={formData.communicationScore}
                onChange={(e) => handleSliderChange('communicationScore', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Data & AI */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-300 flex items-center space-x-1.5">
                  <Terminal className="w-3.5 h-3.5 text-purple-400" />
                  <span>Data &amp; AI</span>
                </span>
                <span className="font-mono font-bold text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded">
                  {formData.dataAiScore}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={formData.dataAiScore}
                onChange={(e) => handleSliderChange('dataAiScore', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Cloud & Systems */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-300 flex items-center space-x-1.5">
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  <span>Cloud &amp; Systems</span>
                </span>
                <span className="font-mono font-bold text-blue-300 bg-blue-500/10 px-1.5 py-0.5 rounded">
                  {formData.cloudSystemsScore}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={formData.cloudSystemsScore}
                onChange={(e) => handleSliderChange('cloudSystemsScore', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Co-Curricular & Teamwork */}
            <div className="space-y-2 md:col-span-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-300">Co-Curricular / Hackathons / Leadership</span>
                <span className="font-mono font-bold text-pink-300 bg-pink-500/10 px-1.5 py-0.5 rounded">
                  {formData.coCurricularScore}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={formData.coCurricularScore}
                onChange={(e) => handleSliderChange('coCurricularScore', e.target.value)}
                className="w-full"
              />
            </div>

          </div>
        </div>

        {/* Submit Execution Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative group overflow-hidden py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] disabled:opacity-50"
          >
            {/* Animated Laser Scanline effect */}
            <div className="absolute inset-0 w-1/3 bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-out pointer-events-none"></div>

            <div className="relative flex items-center justify-center space-x-3">
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-cyan-200" />
                  <span>Processing Hybrid RF + MLP Neural Models...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-cyan-200 group-hover:rotate-12 transition-transform" />
                  <span className="font-mono-tech text-base">RUN INTELLIGENT PREDICTION ENGINE</span>
                </>
              )}
            </div>
          </button>
        </div>

      </form>
    </div>
  );
}
