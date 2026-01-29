
import React, { useState } from 'react';
import { db } from '../store';
import { User, Class, Institute, Notification } from '../types';

const AdminDashboard: React.FC<{ user: User, onLogout: () => void }> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  
  const [users, setUsers] = useState<User[]>(db.users);
  const [classes, setClasses] = useState<Class[]>(db.classes);
  const [institutes] = useState<Institute[]>(db.institutes);

  const approveUser = (id: string) => {
    const userToApprove = users.find(u => u.id === id);
    if (!userToApprove) return;
    const updatedUsers = users.map(u => u.id === id ? { ...u, isApproved: true } : u);
    setUsers(updatedUsers);
    db.users = updatedUsers;

    const notification: Notification = {
        id: Math.random().toString(36).substr(2, 9),
        userId: userToApprove.id,
        userEmail: userToApprove.email,
        subject: "Account Approved - ThinkEdge",
        body: `Hello ${userToApprove.name}, your account has been approved by the Admin.`,
        sentAt: new Date().toLocaleString()
    };
    db.notifications = [notification, ...db.notifications];
    setToastMsg(`User ${userToApprove.name} has been approved.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePromote = (c: Class) => {
    const nextClass = prompt(`Promote all students from ${c.name} to:`, "11th Grade");
    if (nextClass) {
        db.archiveAndPromote(c.id, nextClass);
        setClasses([...db.classes]);
        setUsers([...db.users]);
        setToastMsg(`Students promoted to ${nextClass}.`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col fixed h-full shadow-2xl">
        <div className="p-8 border-b border-slate-800">
            <h1 className="text-2xl font-black tracking-tighter text-indigo-400">THINKEDGE<span className="text-white">.PRO</span></h1>
            <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-widest">Enterprise LMS Admin</p>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-2">
          {['overview', 'users', 'institutes', 'classes', 'reports'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-6 py-4 rounded-2xl transition-all capitalize font-semibold flex items-center gap-3 ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              {tab === 'reports' ? 'MIS Analytics' : tab}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-800">
            <button onClick={onLogout} className="w-full py-4 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl font-bold transition-all text-sm uppercase tracking-widest">Sign Out</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 flex-1 p-12">
        {showToast && (
          <div className="fixed top-10 right-10 bg-indigo-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce z-50">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="font-bold">{toastMsg}</span>
          </div>
        )}

        <header className="flex justify-between items-center mb-12">
            <div>
                <h2 className="text-4xl font-extrabold text-slate-900 capitalize">{activeTab}</h2>
                <p className="text-slate-400 font-medium">Managing System Identity & User Lifecycle</p>
            </div>
            <div className="bg-white px-6 py-3 rounded-2xl border shadow-sm text-sm font-bold text-slate-500">
                DATE: {new Date().toLocaleDateString()}
            </div>
        </header>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 transform hover:scale-105 transition-all">
                <div className="text-indigo-600 font-black text-6xl mb-2">{users.length}</div>
                <div className="text-slate-400 font-bold uppercase text-xs tracking-widest">Global Platform Users</div>
            </div>
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 transform hover:scale-105 transition-all">
                <div className="text-emerald-600 font-black text-6xl mb-2">{users.filter(u => !u.isApproved).length}</div>
                <div className="text-slate-400 font-bold uppercase text-xs tracking-widest">Pending Approvals</div>
            </div>
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 transform hover:scale-105 transition-all">
                <div className="text-amber-600 font-black text-6xl mb-2">{institutes.length}</div>
                <div className="text-slate-400 font-bold uppercase text-xs tracking-widest">Active Institutes</div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b">
                <tr>
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">User Identity</th>
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Access Role</th>
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Verification</th>
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase text-right tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition-all">
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900 text-lg">{u.name}</div>
                      <div className="text-sm text-slate-400">{u.email}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${u.role === 'teacher' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      {u.isApproved ? 
                        <span className="text-emerald-600 font-bold flex items-center gap-2">● Verified</span> : 
                        <span className="text-amber-500 font-bold flex items-center gap-2">○ Pending</span>
                      }
                    </td>
                    <td className="px-8 py-6 text-right">
                      {!u.isApproved && (
                        <button onClick={() => approveUser(u.id)} className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">Approve Access</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="space-y-6">
            {classes.map(c => (
              <div key={c.id} className={`bg-white p-8 rounded-[32px] border flex justify-between items-center transition-all ${c.isArchived ? 'opacity-50 grayscale' : 'hover:border-indigo-200'}`}>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{c.name}</h3>
                  <p className="text-slate-400 font-medium">Session: {c.academicYear} | Status: {c.isArchived ? 'Archived' : 'Active'}</p>
                </div>
                {!c.isArchived && (
                  <button onClick={() => handlePromote(c)} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all text-sm uppercase tracking-widest shadow-xl">Promote Class</button>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reports' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[40px] border">
                    <h4 className="font-black text-xl mb-6 flex items-center gap-3">📊 Performance Analytics</h4>
                    <div className="space-y-6">
                        {['10th A', '11th A'].map(c => (
                            <div key={c}>
                                <div className="flex justify-between text-sm font-bold mb-2 uppercase text-slate-400">
                                    <span>{c} AVG Score</span>
                                    <span>84%</span>
                                </div>
                                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500" style={{ width: '84%' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-indigo-600 p-10 rounded-[40px] text-white">
                    <h4 className="font-black text-xl mb-6">Institute Health</h4>
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-center border-b border-indigo-500 pb-4">
                            <span className="font-medium opacity-80">Teacher Content Uploads</span>
                            <span className="text-2xl font-bold">42 Items</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-indigo-500 pb-4">
                            <span className="font-medium opacity-80">Student Participation</span>
                            <span className="text-2xl font-bold">98.2%</span>
                        </div>
                        <div className="flex justify-between items-center pb-4">
                            <span className="font-medium opacity-80">Assessment Success Rate</span>
                            <span className="text-2xl font-bold">76%</span>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
