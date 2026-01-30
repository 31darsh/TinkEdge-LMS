import React, { useState } from 'react';
import { 
  BookOpen, Play, CheckCircle2, 
  Share2, FileSpreadsheet, Lock, Printer, 
  BarChart, LogOut, ChevronRight
} from 'lucide-react';
import { User, Content } from './types';

const TeacherDashboard = ({ user, onLogout }: { user: User; onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState('courses');
  const [activeCourse, setActiveCourse] = useState<any>(null);

  const courses = [
    { 
      id: 1, 
      title: 'Mathematics - Grade 10', 
      lessons: [
        { id: '1', title: 'Algebra Fundamentals', completed: true, type: 'video' as const, url: '#' },
        { id: '2', title: 'Quadratic Equations', completed: false, type: 'pdf' as const, url: '#' },
        { id: '3', title: 'Chapter Quiz', completed: false, type: 'quiz' as const, url: '#' },
      ]
    },
    { id: 2, title: 'Science - Biology', lessons: [] }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-6">
        <div className="flex items-center space-x-3 mb-10 text-blue-600">
          <BookOpen size={32} />
          <span className="text-xl font-bold text-slate-800 tracking-tight">Lumen LMS</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'courses', label: 'Course Delivery', icon: Play },
            { id: 'assessments', label: 'Assessments', icon: FileSpreadsheet },
            { id: 'students', label: 'My Students', icon: BarChart },
            { id: 'certificates', label: 'Certificates', icon: Printer },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm font-bold">{item.label}</span>
            </button>
          ))}
        </nav>

        <button onClick={onLogout} className="mt-auto flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-red-500 transition-colors">
          <LogOut size={18} />
          <span className="text-sm font-bold">Logout</span>
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Teacher Control Center</h1>
            <p className="text-slate-500 text-sm">Welcome back, {user.name}</p>
          </div>
          <div className="flex items-center space-x-4">
             <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold">
               <Share2 size={16} />
               <span>Generate Assessment Link</span>
             </button>
          </div>
        </header>

        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-800">Assigned Courses</h2>
              {courses.map(course => (
                <button 
                  key={course.id}
                  onClick={() => setActiveCourse(course)}
                  className={`w-full p-6 rounded-3xl border text-left transition-all ${
                    activeCourse?.id === course.id ? 'bg-white border-blue-200 shadow-xl' : 'bg-white border-slate-100'
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><BookOpen size={20} /></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active</span>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1">{course.title}</h3>
                  <p className="text-slate-500 text-xs mb-4">Instructor: {user.name}</p>
                  <div className="flex items-center space-x-2 text-xs font-bold text-blue-600">
                    <span>Manage Lessons</span>
                    <ChevronRight size={14} />
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <div className="flex items-center space-x-2 mb-6 border-b border-slate-800 pb-4">
                <Lock size={18} className="text-blue-500" />
                <h2 className="font-bold">Learning Sequence (FORCED)</h2>
              </div>
              
              {!activeCourse ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-center">
                  <Play size={40} className="mb-4 opacity-20" />
                  <p className="text-sm italic">Select a course to view sequential delivery control</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeCourse.lessons.map((lesson: any, i: number) => {
                    const isLocked = i > 0 && !activeCourse.lessons[i-1].completed;
                    return (
                      <div 
                        key={lesson.id} 
                        className={`flex items-center justify-between p-4 rounded-2xl border ${
                          isLocked ? 'border-slate-800 bg-slate-800/50 opacity-50' : 'border-slate-700 bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            lesson.completed ? 'bg-emerald-500' : isLocked ? 'bg-slate-700' : 'bg-blue-600'
                          }`}>
                            {lesson.completed ? <CheckCircle2 size={16} /> : i + 1}
                          </div>
                          <div>
                            <p className="text-sm font-bold">{lesson.title}</p>
                            <p className="text-[10px] uppercase tracking-wider text-slate-500">{lesson.type}</p>
                          </div>
                        </div>
                        {isLocked ? (
                          <Lock size={16} className="text-slate-600" />
                        ) : (
                          <button className="px-3 py-1 bg-white text-slate-900 rounded-lg text-xs font-bold hover:bg-blue-50">Preview</button>
                        )}
                      </div>
                    );
                  })}
                  <div className="mt-8 p-4 bg-blue-600/10 border border-blue-600/20 rounded-2xl">
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Security Note</p>
                    <p className="text-xs text-slate-400 italic">Students cannot download PDFs or skip videos. Copy-paste is disabled during sequential learning.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;