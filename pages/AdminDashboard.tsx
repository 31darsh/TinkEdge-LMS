import React, { useState } from 'react';
import { 
  Users, Building, School, GraduationCap, 
  Settings, LogOut, FileText, BarChart3, 
  Archive, ArrowUpCircle, Bell, Plus, Upload, Search, X, Filter, Download, Mail
} from 'lucide-react';

const AdminDashboard = ({ user, onLogout }: { user: any; onLogout: () => void }) => {
  const [activeMenu, setActiveMenu] = useState('users');
  const [showImport, setShowImport] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [classFilter, setClassFilter] = useState('All Classes');
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'teacher', class: 'Grade 10-A' });

  // Mock data for class list
  const classes = ['All Classes', 'Grade 10-A', 'Grade 10-B', 'Grade 9-A', 'Grade 8-C'];

  const users = [
    { id: 1, name: 'Ravikumar ', role: 'Student', class: 'Grade 10-A', status: 'Active' },
    { id: 2, name: 'Abdul', role: 'Teacher', class: 'N/A', status: 'Active' },
    { id: 3, name: 'Alex', role: 'Student', class: 'Grade 9-A', status: 'Active' },
    { id: 4, name: 'David', role: 'Student', class: 'Grade 10-B', status: 'Active' },
  ];

  const filteredUsers = users.filter(u => 
    classFilter === 'All Classes' || u.class === classFilter || u.role === 'Teacher'
  );

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`NOTIFICATION: Credentials for ${newUser.name} have been generated and sent to ${newUser.email}. Student assigned to ${newUser.class}.`);
    setShowAddUser(false);
  };

  const downloadTemplate = () => {
    // Simulated CSV download
    const csvContent = "data:text/csv;charset=utf-8,Full Name,Email,Class,Gender,Parent Contact\nJohn Doe,john@example.com,Grade 10-A,Male,+91 8834567890";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "TinkEdge_Student_Template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-slate-900 text-slate-400 p-6 flex flex-col">
        <div className="flex items-center space-x-3 mb-10 text-white">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <GraduationCap className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">TinkEdge Admin</span>
        </div>

        <nav className="flex-1 space-y-1">
          {[
            { id: 'users', label: 'User Management', icon: Users },
            { id: 'classes', label: 'Classes', icon: School },
            { id: 'reports', label: 'MIS Reports', icon: BarChart3 },
            { id: 'archival', label: 'Archive & Promote', icon: Archive },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeMenu === item.id ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800'
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <button onClick={onLogout} className="mt-auto flex items-center space-x-3 px-4 py-3 hover:text-white transition-colors">
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto max-h-screen scrollbar-hide">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 capitalize">{activeMenu.replace('-', ' ')}</h1>
            <p className="text-slate-500 text-sm">Campus Dashboard: {user.institute || 'SJR PUBLIC SCHOOL'}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-white border rounded-xl text-slate-400 hover:text-slate-600 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="flex items-center space-x-3 border-l pl-4">
              <img src={`https://ui-avatars.com/api/?name=${user.name}`} className="w-10 h-10 rounded-full border border-slate-200" alt="Avatar" />
              <div>
                <p className="text-sm font-bold text-slate-800">{user.name}</p>
                <p className="text-[10px] text-emerald-500 font-bold uppercase">Institute Admin</p>
              </div>
            </div>
          </div>
        </header>

        {activeMenu === 'users' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-4 rounded-2xl border flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                  <input placeholder="Search name or email..." className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm bg-slate-50" />
                </div>
                <div className="flex items-center space-x-2 bg-slate-50 border rounded-xl px-3 py-2">
                  <Filter size={16} className="text-slate-400" />
                  <select 
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    className="bg-transparent text-sm font-medium text-slate-600 focus:outline-none cursor-pointer"
                  >
                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={downloadTemplate}
                  className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl text-sm font-bold transition-all"
                >
                  <Download size={16} />
                  <span>Download Template</span>
                </button>
                <button 
                  onClick={() => setShowImport(true)}
                  className="flex items-center space-x-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold text-sm transition-all"
                >
                  <Upload size={16} />
                  <span>Bulk Import</span>
                </button>
                <button 
                  onClick={() => setShowAddUser(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm shadow-lg shadow-blue-100 transition-all"
                >
                  <Plus size={16} />
                  <span>Add User</span>
                </button>
              </div>
            </div>

            <div className="bg-white border rounded-3xl overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Class</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 text-sm font-bold text-slate-700">{u.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-500 font-medium">{u.role}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{u.class}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-bold uppercase">{u.status}</span>
                      </td>
                      <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-blue-600 font-bold text-xs hover:underline">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <div className="p-12 text-center text-slate-400 italic text-sm">
                  No users found matching the class filter.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {showAddUser && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in duration-300 border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800">Add New User</h2>
                <button onClick={() => setShowAddUser(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input required className="w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-900" placeholder="e.g. Sarah Williams" onChange={(e) => setNewUser({...newUser, name: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</label>
                  <input required type="email" className="w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-900" placeholder="s.williams@school.edu" onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-none" onChange={(e) => setNewUser({...newUser, role: e.target.value})}>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Class</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-none" onChange={(e) => setNewUser({...newUser, class: e.target.value})}>
                      {classes.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start space-x-2 text-[10px] text-blue-700 font-medium">
                  <Mail size={14} className="flex-shrink-0" />
                  <span>Submitting will trigger an automated email with login credentials to the user.</span>
                </div>
                <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl mt-4 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                  Save User & Send Invite
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
