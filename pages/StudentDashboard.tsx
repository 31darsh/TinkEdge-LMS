import React, { useState } from 'react';
import { GraduationCap, Award, BookOpen, Clock, Printer, Bell, LogOut } from 'lucide-react';
import { User, Content } from './types';

const StudentDashboard = ({ user, onLogout }: { user: User; onLogout: () => void }) => {
  // Use a safe sort that handles undefined priorities
  const [contents] = useState<Content[]>([]);

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center space-x-2 text-blue-600">
          <GraduationCap size={28} />
          <span className="text-lg font-bold text-slate-800">Lumen Student</span>
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-slate-500 relative"><Bell size={20} /><span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span></button>
          <div className="flex items-center space-x-3 pl-6 border-l">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800">{user.name}</p>
              <p className="text-xs text-slate-400">{user.className || 'No Class Assigned'}</p>
            </div>
            <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-500"><LogOut size={20} /></button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Learning Dashboard</h1>
          <p className="text-slate-500">Continue your educational journey</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4"><BookOpen /></div>
            <p className="text-slate-500 text-sm">Ongoing Courses</p>
            <h2 className="text-2xl font-bold">04</h2>
          </div>
          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4"><Award /></div>
            <p className="text-slate-500 text-sm">Certificates Earned</p>
            <h2 className="text-2xl font-bold">12</h2>
          </div>
          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4"><Clock /></div>
            <p className="text-slate-500 text-sm">Study Hours</p>
            <h2 className="text-2xl font-bold">128h</h2>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex justify-between items-center">
            Recent Assessments
            <button className="text-blue-600 text-sm font-bold hover:underline">View History</button>
          </h2>
          <div className="bg-white rounded-3xl border overflow-hidden shadow-sm">
            {[1,2].map(i => (
              <div key={i} className="p-6 flex items-center justify-between border-b last:border-0 hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-blue-600"><BookOpen size={20} /></div>
                  <div>
                    <h3 className="font-bold text-slate-800">Mathematics Quiz - Half Yearly</h3>
                    <p className="text-xs text-slate-400">Completed on 12 Oct 2023 • Score: 85/100</p>
                  </div>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800">
                  <Printer size={14} />
                  <span>Print Certificate</span>
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