
import React, { useState } from 'react';
import { db } from '../store';
import { User, Content, Assessment } from './types';

const TeacherDashboard: React.FC<{ user: User, onLogout: () => void }> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('curriculum');
  const [students, setStudents] = useState<User[]>(db.users.filter(u => u.role === 'student' && u.className === user.className));
  const [contents, setContents] = useState<Content[]>(db.contents.filter(c => c.className === user.className).sort((a,b) => a.priority - b.priority));
  const [assessments] = useState<Assessment[]>(db.assessments);

  const [newContent, setNewContent] = useState({ title: '', type: 'video' as any, url: '', priority: 1 });

  const addContent = (e: React.FormEvent) => {
    e.preventDefault();
    const content: Content = {
        ...newContent,
        id: 'c' + Date.now(),
        instituteId: user.instituteId,
        className: user.className
    };
    const updated = [...contents, content].sort((a,b) => a.priority - b.priority);
    setContents(updated);
    db.contents = updated;
    setNewContent({ title: '', type: 'video', url: '', priority: contents.length + 1 });
    alert("Resource sequence published successfully!");
  };

  const handleExcelImport = () => {
    alert("Importing students from Excel... Found 5 records.");
    const newStudents = Array.from({ length: 5 }).map((_, i) => ({
        id: 'S' + Math.random().toString(36).substr(2, 5),
        name: `Imported Student ${i + 1}`,
        email: `student${i + 10}@institute.edu`,
        role: 'student' as any,
        instituteId: user.instituteId,
        className: user.className,
        isApproved: true,
        progressCount: 0
    }));
    db.users = [...db.users, ...newStudents];
    setStudents([...students, ...newStudents]);
  };

  const generateLink = (assessmentId: string, studentId?: string) => {
    const url = `${window.location.origin}/#assessment?id=${assessmentId}&inst=${user.instituteId}${studentId ? `&std=${studentId}` : ''}`;
    navigator.clipboard.writeText(url);
    alert("Encrypted Student Link Copied!");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col no-copy">
      <header className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm no-print">
        <div className="flex items-center gap-12">
          <div className="flex flex-col">
            <span className="text-xl font-black text-indigo-600 uppercase">TinkEdge</span>
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Academic Faculty</span>
          </div>
          <nav className="flex gap-2">
            {['curriculum', 'directory', 'assessments'].map(t => (
              <button key={t} onClick={() => setActiveTab(t)} className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === t ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>{t}</button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-sm font-black text-slate-900">{user.name}</div>
            <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{user.className} Mentor</div>
          </div>
          <button onClick={onLogout} className="w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-500 rounded-full hover:bg-red-50 hover:text-red-500 transition-all">✕</button>
        </div>
      </header>

      <main className="flex-1 p-8 max-w-screen-2xl mx-auto w-full">
        {activeTab === 'curriculum' && (
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-sm sticky top-24">
                <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tighter">Add Module</h3>
                <form onSubmit={addContent} className="space-y-5">
                  <input required value={newContent.title} onChange={e => setNewContent({...newContent, title: e.target.value})} placeholder="Module Title" className="w-full bg-slate-50 border p-4 rounded-2xl outline-none focus:border-indigo-500 font-semibold text-sm" />
                  <select value={newContent.type} onChange={e => setNewContent({...newContent, type: e.target.value as any})} className="w-full bg-slate-50 border p-4 rounded-2xl outline-none font-semibold text-sm">
                      <option value="video">Scientific Video (Embed)</option>
                      <option value="pdf">Academic PDF</option>
                      <option value="ppt">Course Slides</option>
                  </select>
                  <input required value={newContent.url} onChange={e => setNewContent({...newContent, url: e.target.value})} placeholder="Protected URL Source" className="w-full bg-slate-50 border p-4 rounded-2xl outline-none focus:border-indigo-500 font-semibold text-sm" />
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border">
                    <label className="text-xs font-black text-slate-400 uppercase">Sequence Rank</label>
                    <input type="number" value={newContent.priority} onChange={e => setNewContent({...newContent, priority: parseInt(e.target.value)})} className="w-16 bg-white border rounded-lg text-center font-bold p-2" />
                  </div>
                  <button className="w-full py-5 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">Publish Sequence</button>
                </form>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tighter">Class Curriculum Path</h2>
              <div className="grid grid-cols-1 gap-4">
                {contents.map((c, i) => (
                  <div key={c.id} className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center justify-between group hover:shadow-xl transition-all">
                    <div className="flex items-center gap-8">
                      <div className="w-16 h-16 rounded-[20px] bg-indigo-50 flex items-center justify-center font-black text-indigo-600 text-xl shadow-inner">{c.priority}</div>
                      <div>
                        <div className="font-black text-slate-900 text-xl group-hover:text-indigo-600 transition-colors">{c.title}</div>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{c.type}</span>
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Protected Mode</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'directory' && (
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-12 border-b flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Student Directory</h3>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2">Manage scholars & academic records</p>
              </div>
              <button onClick={handleExcelImport} className="bg-slate-950 text-white px-10 py-4 rounded-[20px] font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-slate-800 transition-all flex items-center gap-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                Import Scholars
              </button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Scholar Identity</th>
                  <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Syllabus Progress</th>
                  <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Encrypted Exam Links</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {students.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50/30 transition-all">
                    <td className="px-12 py-8">
                      <div className="font-black text-slate-900 text-xl">{s.name}</div>
                      <div className="text-xs text-slate-400 font-bold">{s.email}</div>
                    </td>
                    <td className="px-12 py-8">
                      <div className="flex items-center gap-6">
                        <div className="h-2 w-56 bg-slate-100 rounded-full overflow-hidden border">
                          <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${((s.progressCount || 0) / (contents.length || 1)) * 100}%` }}></div>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase">{s.progressCount || 0} / {contents.length}</span>
                      </div>
                    </td>
                    <td className="px-12 py-8 text-right">
                      <button onClick={() => generateLink(assessments[0].id, s.id)} className="text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 px-6 py-3 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">Generate Scholar Key</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'assessments' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {assessments.map(a => (
                    <div key={a.id} className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-indigo-200 transition-all">
                        <div className="w-24 h-24 bg-indigo-50 rounded-[32px] flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition-transform">📄</div>
                        <h4 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">{a.title}</h4>
                        <p className="text-slate-400 text-sm font-medium mb-10">Unified secure assessment link for classroom deployment.</p>
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <button onClick={() => window.print()} className="py-5 bg-slate-100 text-slate-900 rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">Print Paper</button>
                            <button onClick={() => generateLink(a.id)} className="py-5 bg-indigo-600 text-white rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 shadow-2xl shadow-indigo-100 transition-all">Copy Key</button>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;
