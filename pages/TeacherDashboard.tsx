
import React, { useState } from 'react';
import { db } from '../store';
import { User, Content, Assessment } from '../types';

const TeacherDashboard: React.FC<{ user: User, onLogout: () => void }> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('management');
  const [students, setStudents] = useState<User[]>(db.users.filter(u => u.role === 'student' && u.className === user.className));
  const [contents, setContents] = useState<Content[]>(db.contents.filter(c => c.className === user.className));
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
    alert("New resource added with sequence priority!");
  };

  const handleExcelImport = () => {
    const mockData = [
        { name: "John Doe", email: "john.doe@edu.com" },
        { name: "Sarah Connor", email: "sarah.c@edu.com" }
    ];
    alert(`Excel Analysis: Found ${mockData.length} new students. Importing...`);
    const newStudents = mockData.map(m => ({
        id: 'S' + Math.random().toString(36).substr(2, 5),
        name: m.name,
        email: m.email,
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
    alert("Assessment Link Copied! Send this to students.\n\n" + url);
  };

  const printAssessment = (a: Assessment) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
        <style>body{font-family:sans-serif;padding:50px;} .q{margin-bottom:20px; border-bottom:1px solid #eee; padding-bottom:20px;}</style>
        <h1>${a.title}</h1>
        <p>Institute: ${user.instituteId} | Class: ${user.className}</p>
        <hr/>
        ${a.questions.map((q, i) => `
            <div class="q">
                <p><strong>Question ${i+1}:</strong> ${q.text}</p>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                    ${q.options.map((o, idx) => `<div>(${String.fromCharCode(65+idx)}) ${o}</div>`).join('')}
                </div>
            </div>
        `).join('')}
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col no-copy">
      <header className="bg-white border-b px-12 py-5 flex justify-between items-center sticky top-0 z-10 shadow-sm no-print">
        <div className="flex items-center gap-10">
          <div className="text-2xl font-black text-indigo-600">FACULTY<span className="text-slate-900">CORE</span></div>
          <nav className="flex gap-8">
            {['management', 'students', 'assessments'].map(t => (
              <button 
                key={t} 
                onClick={() => setActiveTab(t)}
                className={`text-xs font-black uppercase tracking-widest transition-all ${activeTab === t ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {t}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-slate-900">{user.name}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{user.className} MENTOR</div>
          </div>
          <button onClick={onLogout} className="bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 px-6 py-2 rounded-xl text-xs font-bold transition-all">LOGOUT</button>
        </div>
      </header>

      <main className="flex-1 p-12 max-w-7xl mx-auto w-full">
        {activeTab === 'management' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-indigo-600 p-8 rounded-[40px] text-white shadow-2xl shadow-indigo-200">
                        <h3 className="text-xl font-black mb-6">Add Learning Resource</h3>
                        <form onSubmit={addContent} className="space-y-4">
                            <input required value={newContent.title} onChange={e => setNewContent({...newContent, title: e.target.value})} placeholder="Title of resource" className="w-full bg-white/10 border border-white/20 p-4 rounded-2xl outline-none placeholder:text-white/50 font-medium" />
                            <select value={newContent.type} onChange={e => setNewContent({...newContent, type: e.target.value as any})} className="w-full bg-white/10 border border-white/20 p-4 rounded-2xl outline-none font-medium">
                                <option value="video" className="text-slate-900">Video Content (YouTube)</option>
                                <option value="pdf" className="text-slate-900">PDF Document</option>
                                <option value="ppt" className="text-slate-900">PPT Presentation</option>
                            </select>
                            <input required value={newContent.url} onChange={e => setNewContent({...newContent, url: e.target.value})} placeholder="Resource URL / Embed Link" className="w-full bg-white/10 border border-white/20 p-4 rounded-2xl outline-none placeholder:text-white/50 font-medium" />
                            <div className="flex items-center gap-4">
                                <label className="text-sm font-bold opacity-60">Sequence Priority:</label>
                                <input type="number" value={newContent.priority} onChange={e => setNewContent({...newContent, priority: parseInt(e.target.value)})} className="w-20 bg-white/10 border border-white/20 p-2 rounded-xl outline-none text-center" />
                            </div>
                            <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-widest shadow-xl transform hover:scale-[1.02] transition-all">Deploy Resource</button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">📚 Class Content Sequence</h3>
                    <div className="space-y-4">
                        {contents.map((c, i) => (
                            <div key={c.id} className="bg-white p-6 rounded-[32px] border border-slate-100 flex justify-between items-center group hover:border-indigo-200 transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center font-black text-slate-300">#{c.priority}</div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-lg">{c.title}</div>
                                        <div className="text-xs font-black uppercase text-indigo-500 tracking-widest">{c.type} Resource</div>
                                    </div>
                                </div>
                                <button className="text-red-400 opacity-0 group-hover:opacity-100 transition-all font-bold text-xs uppercase hover:text-red-600">Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'students' && (
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b flex justify-between items-center">
                    <h3 className="text-xl font-black">Enrolled Scholars ({students.length})</h3>
                    <button onClick={handleExcelImport} className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all text-sm uppercase tracking-widest shadow-lg shadow-indigo-100">Excel Data Import</button>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50">
                        <tr>
                            <th className="px-10 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Student</th>
                            <th className="px-10 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Course Progress</th>
                            <th className="px-10 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Quick Links</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {students.map(s => (
                            <tr key={s.id} className="hover:bg-slate-50/50 transition-all">
                                <td className="px-10 py-6">
                                    <div className="font-bold text-slate-900">{s.name}</div>
                                    <div className="text-xs text-slate-400">{s.email}</div>
                                </td>
                                <td className="px-10 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500" style={{ width: `${(s.progressCount || 0) * 50}%` }}></div>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase">{s.progressCount || 0} / {contents.length} Done</span>
                                    </div>
                                </td>
                                <td className="px-10 py-6 text-right">
                                    <button onClick={() => generateLink('a1', s.id)} className="text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:underline">Copy Exam Link</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}

        {activeTab === 'assessments' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {assessments.map(a => (
                    <div key={a.id} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-16 h-16 bg-slate-50 rounded-[20px] flex items-center justify-center text-3xl mb-6">📝</div>
                            <h4 className="text-2xl font-black text-slate-900 mb-2">{a.title}</h4>
                            <p className="text-slate-400 font-medium mb-8">Secure assessment containing {a.questions.length} scientific items.</p>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => printAssessment(a)} className="flex-1 py-4 bg-slate-100 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Print Paper</button>
                            <button onClick={() => generateLink(a.id)} className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">Global Link</button>
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
