
import React, { useState } from 'react';
import { db } from '../store';
import { User, Content } from '../types';

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
      <header className="bg-white border-b px-12 py-5 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="text-2xl font-black text-indigo-600 tracking-tighter">THINKEDGE<span className="text-slate-900">.STUDY</span></div>
        <div className="flex items-center gap-10">
          <div className="hidden md:flex flex-col items-end">
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Learning Momentum</div>
            <div className="w-56 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${(progress / contents.length) * 100}%` }}></div>
            </div>
          </div>
          <button onClick={onLogout} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-all">Sign Out</button>
        </div>
      </header>

      <main className="flex-1 p-12 max-w-7xl mx-auto w-full">
        {viewing ? (
            <div className="bg-slate-900 rounded-[40px] shadow-2xl overflow-hidden border border-white/10 animate-in zoom-in-95 duration-300">
                <div className="p-8 border-b border-white/5 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-black text-white">{viewing.title}</h2>
                        <p className="text-indigo-400 text-xs font-black uppercase tracking-widest mt-1">Resource Priority #{viewing.priority}</p>
                    </div>
                    <button onClick={() => setViewing(null)} className="w-10 h-10 rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white flex items-center justify-center transition-all font-bold">✕</button>
                </div>
                <div className="aspect-video bg-black relative">
                    {viewing.type === 'video' ? (
                        <iframe className="w-full h-full" src={viewing.url} allowFullScreen title="Content Video" />
                    ) : (
                        <iframe className="w-full h-full" src={`${viewing.url}#toolbar=0&navpanes=0&scrollbar=0`} title="Content Doc" />
                    )}
                </div>
                <div className="p-8 flex justify-end bg-black/40">
                    <button 
                        onClick={handleMarkComplete}
                        className="px-10 py-5 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-2xl shadow-indigo-500/20 transform hover:-translate-y-1 transition-all"
                    >
                        Mark Completed & Next
                    </button>
                </div>
            </div>
        ) : (
            <div className="space-y-12">
                <div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Academic Roadmap</h1>
                    <p className="text-slate-400 font-medium text-lg mt-2">Follow the curriculum sequence to unlock your final certification exam.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {contents.map((c, idx) => {
                        const isLocked = idx > progress;
                        const isCompleted = idx < progress;
                        const isActive = idx === progress;
                        
                        return (
                            <div key={c.id} className={`group p-8 rounded-[40px] border-2 transition-all relative overflow-hidden ${isLocked ? 'bg-slate-50 border-slate-100 opacity-60' : isCompleted ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-indigo-100 shadow-2xl shadow-indigo-100 transform hover:scale-[1.03]'}`}>
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg ${isCompleted ? 'bg-emerald-500 text-white shadow-emerald-200' : isActive ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-slate-200 text-slate-400'}`}>
                                        {idx + 1}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{c.type}</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 leading-tight mb-8 min-h-[4rem]">{c.title}</h3>
                                
                                {isLocked ? (
                                    <div className="py-4 text-center font-bold text-slate-400 bg-slate-100 rounded-2xl flex items-center justify-center gap-2">
                                        🔒 Locked Content
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => setViewing(c)}
                                        className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all ${isCompleted ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-200'}`}
                                    >
                                        {isCompleted ? 'Revisit Lesson' : 'Start Lesson'}
                                    </button>
                                )}
                            </div>
                        );
                    })}

                    {/* Final Certification Exam Card */}
                    <div className={`p-8 rounded-[40px] border-2 border-dashed flex flex-col items-center justify-center text-center transition-all ${progress < contents.length ? 'bg-slate-50 border-slate-200 opacity-40' : 'bg-indigo-50 border-indigo-400'}`}>
                        <div className="text-6xl mb-4 grayscale">🎖️</div>
                        <h3 className="text-xl font-black text-slate-900">Final Certification</h3>
                        <p className="text-sm text-slate-400 mt-2 font-medium mb-8">Unlocks after completing {contents.length} modules</p>
                        <button 
                            disabled={progress < contents.length} 
                            onClick={() => window.location.hash = 'assessment?id=a1'}
                            className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest disabled:bg-slate-300 disabled:shadow-none shadow-xl shadow-indigo-200"
                        >
                            Final Exam
                        </button>
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
