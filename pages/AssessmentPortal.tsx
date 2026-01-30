import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle, Timer, AlertTriangle } from 'lucide-react';
import { Assessment } from './types';

const AssessmentPortal = () => {
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, submitted]);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleCopy = (e: ClipboardEvent) => e.preventDefault();
    
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center border">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Assessment Submitted!</h2>
          <p className="text-slate-500 mb-8">Your responses have been securely recorded. Your teacher will provide marks shortly.</p>
          <button onClick={() => window.close()} className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl">Close Portal</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <header className="bg-slate-800/50 backdrop-blur border-b border-slate-700 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <ShieldAlert className="text-blue-500" size={24} />
          <div>
            <h1 className="text-white font-bold text-sm">Secure Assessment Session</h1>
            <p className="text-slate-400 text-[10px] uppercase tracking-wider">Exam ID: EXM-29384-01</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-slate-700 px-4 py-2 rounded-xl border border-slate-600">
            <Timer className="text-blue-400" size={18} />
            <span className="text-white font-mono font-bold">{formatTime(timeLeft)}</span>
          </div>
          <button 
            onClick={() => setSubmitted(true)}
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-900/40"
          >
            Finish Exam
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-8 overflow-y-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 select-none">
          <div className="p-4 bg-amber-50 text-amber-700 rounded-2xl border border-amber-100 mb-8 flex items-center space-x-3 text-sm italic">
            <AlertTriangle size={18} />
            <span>Right-click and copy-paste is disabled for this session. Your activity is being monitored.</span>
          </div>

          <div className="space-y-12">
            {[1, 2, 3].map((q: number) => (
              <div key={q} className="space-y-4">
                <div className="flex space-x-4">
                  <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">{q}</span>
                  <h3 className="text-lg font-bold text-slate-800">Explain the primary differences between cellular mitosis and meiosis?</h3>
                </div>
                <div className="ml-12 grid grid-cols-1 gap-3">
                  {['Mitosis produces 2 identical cells', 'Meiosis produces 4 unique cells', 'Both involve DNA replication', 'None of the above'].map((opt: string, idx: number) => (
                    <label key={idx} className="p-4 border border-slate-100 rounded-2xl flex items-center space-x-3 hover:bg-slate-50 cursor-pointer transition-colors">
                      <input type="radio" name={`q${q}`} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-slate-600">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="p-6 bg-slate-800/30 border-t border-slate-700 text-center text-[10px] text-slate-500 uppercase tracking-widest font-bold">
        Secure Learning Environment • Lumen LMS • (c) 2024
      </footer>
    </div>
  );
};

export default AssessmentPortal;