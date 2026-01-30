
import React, { useState } from 'react';
import { db } from '../store';
import { User, Content } from './types';

const StudentDashboard: React.FC<{ user: User, onLogout: () => void }> = ({ user, onLogout }) => {
  const [progress, setProgress] = useState(user.progressCount || 0);
  const [contents] = useState<Content[]>(db.contents.filter(c => c.className === user.className).sort((a, b) => a.priority - b.priority));
  const [viewing, setViewing] = useState<Content | null>(null);

  const handleMarkComplete = () => {
    if (viewing) {
        const nextProgress = progress + 1;
        setProgress(nextProgress);
        db.users = db.users.map(u => u.id === user.id ? { ...u, progressCount: nextProgress } : u);
        setViewing(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col no-copy">
      <header className="bg-white/80 backdrop-blur-md border-b px-12 py-5 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="flex flex-col">
            <span className="text-2xl font-black text-indigo-600 uppercase tracking-tighter">TinkEdge</span>
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Student Portal</span>
        </div>
        <div className="flex items-center gap-12">
          <div className="hidden lg:flex flex-col items-end">
            <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Syllabus Mastery</span>
                <span className="text-[10px] text-indigo-600 font-black uppercase">{Math.round((progress / (contents.length || 1)) * 100)}%</span>
            </div>
            <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden border">
                <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${(progress / (contents.length || 1)) * 100}%` }}></div>
            </div>
          </div>
          <button onClick={onLogout} className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-all">✕</button>
        </div>
      </header>

      <main className="flex-1 p-12 max-w-7xl mx-auto w-full">
        {viewing ? (
            <div className="bg-slate-950 rounded-[48px] shadow-3xl overflow-hidden animate-in zoom-in-95 duration-500 max-w-5xl mx-auto border-4 border-indigo-900/40">
                <div className="p-10 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-indigo-900/20 to-transparent">
                    <div>
                        <div className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Module Sequence #{viewing.priority}</div>
                        <h2 className="text-3xl font-black text-white tracking-tight">{viewing.title}</h2>
                    </div>
                    <button onClick={() => setViewing(null)} className="text-white/40 hover:text-white font-black uppercase text-[10px] tracking-widest transition-all">Close Viewer</button>
                </div>
                <div className="aspect-video bg-black relative shadow-inner">
                    {viewing.type === 'video' ? (
                        <iframe className="w-full h-full" src={viewing.url} allowFullScreen title="Content Video" />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-white/10 p-20 select-none">
                            <h2 className="text-6xl font-black">ENCRYPTED VIEW</h2>
                            <p className="mt-4 font-black uppercase text-xs tracking-[0.5em] opacity-50">TinkEdge Internal Document Shield</p>
                        </div>
                    )}
                </div>
                <div className="p-10 flex justify-between items-center bg-white/5">
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Protected Session</div>
                    <button onClick={handleMarkComplete} className="px-12 py-5 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-2xl transition-all active:scale-95">Complete & Proceed</button>
                </div>
            </div>
        ) : (
            <div className="space-y-16">
                <div className="flex justify-between items-end">
                    <div className="max-w-xl">
                        <h1 className="text-7xl font-black text-slate-950 tracking-tighter leading-none">Your Journey<span className="text-indigo-600">.</span></h1>
                        <p className="text-slate-400 font-bold text-lg mt-8 uppercase tracking-widest">Syllabus Flow: {user.className}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {contents.map((c, idx) => {
                        const isLocked = idx > progress;
                        const isCompleted = idx < progress;
                        const isActive = idx === progress;
                        
                        return (
                            <div key={c.id} className={`p-10 rounded-[48px] border-2 transition-all relative overflow-hidden ${isLocked ? 'bg-slate-50 border-slate-100 opacity-40 grayscale' : isCompleted ? 'bg-white border-emerald-100' : 'bg-white border-indigo-100 shadow-3xl transform hover:scale-[1.02]'}`}>
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center font-black text-2xl shadow-lg ${isCompleted ? 'bg-emerald-500 text-white shadow-emerald-200' : isActive ? 'bg-indigo-600 text-white shadow-indigo-300' : 'bg-slate-200 text-slate-400'}`}>
                                        {idx + 1}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{c.type} Resource</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 leading-tight mb-12 min-h-[4.5rem] tracking-tight">{c.title}</h3>
                                
                                {isLocked ? (
                                    <div className="py-6 text-center font-black text-[10px] uppercase tracking-widest text-slate-400 bg-slate-100 rounded-3xl flex items-center justify-center gap-3">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                        Awaiting Release
                                    </div>
                                ) : (
                                    <button onClick={() => setViewing(c)} className={`w-full py-6 rounded-[24px] font-black uppercase tracking-widest transition-all ${isCompleted ? 'bg-slate-50 text-slate-400 hover:bg-slate-100' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xl shadow-indigo-100'}`}>
                                        {isCompleted ? 'Mastered' : 'Open Module'}
                                    </button>
                                )}
                            </div>
                        );
                    })}

                    <div className={`p-10 rounded-[48px] border-4 border-dashed flex flex-col items-center justify-center text-center transition-all ${progress < contents.length ? 'bg-slate-50 border-slate-200 opacity-20' : 'bg-indigo-50 border-indigo-300 shadow-2xl'}`}>
                        <div className="text-8xl mb-6 grayscale">🎖️</div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Final Verification</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 mb-10">Certification Exam</p>
                        <button disabled={progress < contents.length} onClick={() => window.location.hash = 'assessment?id=a1'} className="w-full py-6 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-widest disabled:bg-slate-300 shadow-2xl transition-all">Begin Assessment</button>
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
