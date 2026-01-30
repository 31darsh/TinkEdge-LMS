import React, { useState } from 'react';
import { GraduationCap, Award, BookOpen, Clock, Printer, Bell, LogOut } from 'lucide-react';
import { User, Content } from './types';

const StudentDashboard = ({ user, onLogout }: { user: User; onLogout: () => void }) => {
  const [contents] = useState<Content[]>([]);

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center space-x-2 text-blue-600">
          <GraduationCap size={28} />
          <span className="text-lg font-bold text-slate-800 tracking-tight">Lumen Student</span>
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-slate-400 hover:text-slate-600 transition-colors relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center space-x-3 pl-6 border-l border-slate-100">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800">{user.name}</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{user.className || 'Class 10-A'}</p>
            </div>
            <button 
              onClick={onLogout} 
              className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Learning Space</h1>
          <p className="text-slate-500 font-medium">Welcome back, {user.name.split(' ')[0]}. Here is your progress.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <BookOpen size={28} />
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">Ongoing Courses</p>
            <h2 className="text-4xl font-black text-slate-800">04</h2>
          </div>
          
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
              <Award size={28} />
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">Certificates</p>
            <h2 className="text-4xl font-black text-slate-800">12</h2>
          </div>
          
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <Clock size={28} />
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">Study Hours</p>
            <h2 className="text-4xl font-black text-slate-800">128h</h2>
          </div>
        </div>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Recent Assessments</h2>
            <button className="text-blue-600 text-sm font-bold hover:bg-blue-50 px-4 py-2 rounded-xl transition-all">View All Results</button>
          </div>
          <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
            {[
              { title: 'Mathematics Quiz - Algebra', date: '12 Oct 2023', score: '85/100' },
              { title: 'Biology Mid-term Exam', date: '05 Oct 2023', score: '92/100' }
            ].map((item, i) => (
              <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between border-b last:border-0 hover:bg-slate-50/50 transition-colors gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{item.title}</h3>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Completed: {item.date} • Score: <span className="text-emerald-600 font-bold">{item.score}</span></p>
                  </div>
                </div>
                <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                  <Printer size={16} />
                  <span>Download Certificate</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;