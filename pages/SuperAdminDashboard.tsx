import React, { useState } from 'react';
import { ShieldCheck, Building, CheckCircle, XCircle, LogOut, Search, MapPin, Mail, Phone, User as UserIcon } from 'lucide-react';
import { InstituteRegistration, User } from './types';

const SuperAdminDashboard = ({ user, onLogout }: { user: User; onLogout: () => void }) => {
  const [registrations, setRegistrations] = useState<InstituteRegistration[]>([
    { 
      id: 1, 
      name: 'St. Mary High', 
      admin: 'Jane Smith', 
      email: 'jane@stmary.edu', 
      phone: '+1 555-1234',
      address: '456 Chapel Road, NY',
      status: 'pending', 
      date: '2024-05-10' 
    },
    { 
      id: 2, 
      name: 'Bright Future Academy', 
      admin: 'Robert Brown', 
      email: 'robert@bright.edu', 
      phone: '+1 555-5678',
      address: '789 Learning Way, CA',
      status: 'approved', 
      date: '2024-05-08' 
    },
  ]);

  const [selectedReg, setSelectedReg] = useState<InstituteRegistration | null>(null);

  const handleApprove = (reg: InstituteRegistration) => {
    setRegistrations(prev => prev.map(r => r.id === reg.id ? { ...r, status: 'approved' } : r));
    alert(`CREDENTIALS SENT: Welcome packet and login details for ${reg.name} sent to ${reg.email}.`);
    setSelectedReg(null);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-indigo-950 text-indigo-300 p-6 flex flex-col">
        <div className="flex items-center space-x-3 mb-10 text-white">
          <ShieldCheck size={32} className="text-indigo-400" />
          <span className="text-xl font-bold">App Control</span>
        </div>
        <nav className="flex-1 space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-indigo-800 text-white font-bold">
            <Building size={18} />
            <span>Institutes</span>
          </button>
        </nav>
        <button onClick={onLogout} className="mt-auto flex items-center space-x-3 px-4 py-3 hover:text-white transition-colors">
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Master Institute Control</h1>
            <p className="text-slate-500 text-sm">Managing global institutional ecosystem</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 px-4 py-2 rounded-xl text-indigo-700 font-bold text-xs">
              System Admin: {user.name}
            </div>
          </div>
        </header>

        <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
            <h2 className="font-bold text-slate-800">Registration Pipeline</h2>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input placeholder="Search..." className="pl-10 pr-4 py-2 border rounded-xl text-sm w-64 bg-white" />
            </div>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] uppercase text-slate-400 font-bold border-b">
              <tr>
                <th className="px-6 py-4">Institute</th>
                <th className="px-6 py-4">Admin</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {registrations.map(reg => (
                <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">
                        {reg.name[0]}
                      </div>
                      <span className="text-sm font-bold text-slate-800">{reg.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{reg.admin}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      reg.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {reg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedReg(reg)}
                      className="text-indigo-600 text-xs font-bold hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedReg && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-xl p-8 shadow-2xl animate-in zoom-in duration-300 border">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{selectedReg.name}</h2>
                  <p className="text-slate-500 text-sm">Review Registration Details</p>
                </div>
                <button onClick={() => setSelectedReg(null)} className="text-slate-400 hover:text-slate-600"><XCircle /></button>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-sm">
                    <UserIcon className="text-slate-400" size={18} />
                    <span className="text-slate-700 font-medium">{selectedReg.admin} (Admin)</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Mail className="text-slate-400" size={18} />
                    <span className="text-slate-700">{selectedReg.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Phone className="text-slate-400" size={18} />
                    <span className="text-slate-700">{selectedReg.phone}</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-sm">
                  <MapPin className="text-slate-400 flex-shrink-0" size={18} />
                  <span className="text-slate-700 leading-relaxed">{selectedReg.address}</span>
                </div>
              </div>

              {selectedReg.status === 'pending' ? (
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleApprove(selectedReg)}
                    className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center space-x-2"
                  >
                    <CheckCircle size={18} />
                    <span>Approve & Send Credentials</span>
                  </button>
                  <button className="px-6 py-3 bg-rose-50 text-rose-600 font-bold rounded-xl hover:bg-rose-100 transition-all">
                    Reject
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-center font-bold">
                  Registration Already Approved
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SuperAdminDashboard;