import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Users, 
  TrendingDown, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter, 
  MessageSquare, 
  Calendar, 
  UserCheck, 
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { api } from '../services/api';
import { sounds } from './AudioEffects';

export default function AdvisorAlerts() {
  const [metrics, setMetrics] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedAlertForAction, setSelectedAlertForAction] = useState(null);
  const [counselorNoteInput, setCounselorNoteInput] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [m, a] = await Promise.all([
        api.getAdvisorMetrics(),
        api.getAdvisorAlerts()
      ]);
      setMetrics(m);
      setAlerts(a);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = (alertId, newStatus) => {
    sounds.playClick();
    setAlerts(prev => prev.map(item => {
      if (item.id === alertId) {
        return { 
          ...item, 
          status: newStatus,
          counselorNotes: counselorNoteInput || item.counselorNotes || "Reviewed by Academic Counselor." 
        };
      }
      return item;
    }));
    setSelectedAlertForAction(null);
    setCounselorNoteInput('');
  };

  const filteredAlerts = alerts.filter(a => {
    const matchesFilter = 
      filter === 'ALL' ||
      (filter === 'CRITICAL' && a.riskLevel === 'CRITICAL') ||
      (filter === 'OPEN' && a.status === 'OPEN') ||
      (filter === 'RESOLVED' && a.status === 'RESOLVED');

    const matchesSearch = 
      a.studentName.toLowerCase().includes(search.toLowerCase()) ||
      a.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
      a.department.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="glass-panel-glow rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-pink-500/20">
        <div>
          <div className="flex items-center space-x-2 text-pink-400 text-xs font-mono tracking-widest uppercase mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Academic Affairs &bull; Retention Advisory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Early Intervention Advisory Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Real-time telemetry and automated triage of students predicted to face academic distress. Early interventions boost retention rates by up to 34%.
          </p>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            loadData();
          }}
          className="px-4 py-2.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-semibold flex items-center space-x-2 transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>REFRESH ADVISORY FEED</span>
        </button>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Monitored Students */}
        <div className="glass-panel rounded-2xl p-5 border-slate-800">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>STUDENTS MONITORED</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-3xl font-extrabold font-mono-tech text-white mt-3">
            {metrics?.totalStudentsMonitored || 142}
          </p>
          <p className="text-[11px] text-cyan-400/80 font-mono mt-1">
            Across 5 Academic Departments
          </p>
        </div>

        {/* Critical Risk Students */}
        <div className="glass-panel rounded-2xl p-5 border-rose-500/30 bg-rose-950/20">
          <div className="flex justify-between items-center text-xs font-mono text-rose-300">
            <span>CRITICAL RISK ALERTS</span>
            <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
          </div>
          <p className="text-3xl font-extrabold font-mono-tech text-rose-200 mt-3">
            {metrics?.criticalRiskCount || 16}
          </p>
          <p className="text-[11px] text-rose-300/80 font-mono mt-1">
            Predicted GPA &lt; 5.5 or Attendance &lt; 75%
          </p>
        </div>

        {/* Open Interventions */}
        <div className="glass-panel rounded-2xl p-5 border-amber-500/30 bg-amber-950/20">
          <div className="flex justify-between items-center text-xs font-mono text-amber-300">
            <span>PENDING COUNSELING</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold font-mono-tech text-amber-200 mt-3">
            {metrics?.openAlertsCount || 9}
          </p>
          <p className="text-[11px] text-amber-300/80 font-mono mt-1">
            Awaiting Advisor Conference
          </p>
        </div>

        {/* Retention Risk Rate */}
        <div className="glass-panel rounded-2xl p-5 border-slate-800">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>RETENTION RISK INDEX</span>
            <TrendingDown className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-3xl font-extrabold font-mono-tech text-purple-200 mt-3">
            {metrics?.retentionRiskRate || 11.2}%
          </p>
          <p className="text-[11px] text-emerald-400 font-mono mt-1">
            &darr; 4.8% from previous term
          </p>
        </div>

      </div>

      {/* Alerts Feed Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name, roll number, or department..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-xs text-white placeholder-slate-500 outline-none transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {[
            { id: 'ALL', label: 'All Alerts' },
            { id: 'CRITICAL', label: 'Critical Only' },
            { id: 'OPEN', label: 'Pending Action' },
            { id: 'RESOLVED', label: 'Resolved' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => {
                sounds.playTab();
                setFilter(f.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === f.id
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

      </div>

      {/* Alerts Cards List */}
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`glass-panel rounded-2xl p-5 sm:p-6 transition-all border ${
                alert.riskLevel === 'CRITICAL'
                  ? 'border-rose-500/40 hover:border-rose-400'
                  : alert.riskLevel === 'MODERATE'
                  ? 'border-amber-500/30 hover:border-amber-400'
                  : 'border-emerald-500/30'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Student Info */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-base font-bold text-white">
                      {alert.studentName}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                      {alert.rollNumber}
                    </span>
                    <span className="text-xs text-slate-400">
                      &bull; {alert.department} &bull; Sem {alert.semester}
                    </span>
                  </div>

                  <p className="text-xs text-rose-300/90 font-mono mt-1">
                    <strong className="text-slate-300">Trigger:</strong> {alert.triggerReason}
                  </p>
                  <p className="text-xs text-slate-400">
                    <strong className="text-slate-300">Recommended Plan:</strong> {alert.recommendedInterventionPlan}
                  </p>

                  {alert.counselorNotes && (
                    <div className="mt-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-cyan-300 font-mono">
                      <strong>Advisor Notes:</strong> {alert.counselorNotes}
                    </div>
                  )}
                </div>

                {/* Performance Metrics & Status Badge */}
                <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
                  
                  {/* Attendance */}
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">Attendance</span>
                    <span className={`text-sm font-bold font-mono ${alert.attendancePercentage < 75 ? 'text-rose-400' : 'text-slate-200'}`}>
                      {alert.attendancePercentage}%
                    </span>
                  </div>

                  {/* Predicted GPA */}
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">Predicted GPA</span>
                    <span className={`text-sm font-bold font-mono ${alert.predictedGpa < 6.0 ? 'text-rose-400' : 'text-slate-200'}`}>
                      {alert.predictedGpa.toFixed(2)}
                    </span>
                  </div>

                  {/* Status */}
                  <div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider border ${
                      alert.status === 'OPEN'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : alert.status === 'IN_REVIEW'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}>
                      {alert.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {alert.status !== 'RESOLVED' ? (
                      <button
                        onClick={() => setSelectedAlertForAction(alert)}
                        className="px-3 py-1.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-medium transition-all"
                      >
                        Intervene
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-400 flex items-center space-x-1 font-mono">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Case Closed</span>
                      </span>
                    )}
                  </div>

                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center rounded-2xl glass-panel border-slate-800">
            <UserCheck className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-slate-300">No alerts matching active criteria</h4>
            <p className="text-xs text-slate-500 mt-1">Adjust search parameters or refresh the advisory stream.</p>
          </div>
        )}
      </div>

      {/* Intervention Action Modal */}
      {selectedAlertForAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel-glow max-w-lg w-full rounded-2xl p-6 border-pink-500/40 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-pink-400" />
              <span>Record Academic Advisory Intervention</span>
            </h3>

            <p className="text-xs text-slate-400">
              Student: <strong className="text-white">{selectedAlertForAction.studentName}</strong> ({selectedAlertForAction.rollNumber})
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Advisor Action / Counseling Notes</label>
              <textarea
                rows={3}
                value={counselorNoteInput}
                onChange={(e) => setCounselorNoteInput(e.target.value)}
                placeholder="Enter counseling meeting outcomes, remedial plan, or attendance commitments..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-pink-500 text-xs text-white placeholder-slate-500 outline-none"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setSelectedAlertForAction(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedAlertForAction.id, 'IN_REVIEW')}
                className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-medium"
              >
                Mark In-Review
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedAlertForAction.id, 'RESOLVED')}
                className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold"
              >
                Resolve &amp; Close Alert
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
