
import React, { useState } from 'react';
import { db } from '../store';
import { UserRole } from '../types';

interface RegisterProps {
  onBack: () => void;
}

const Register: React.FC<RegisterProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' as UserRole,
    instituteId: db.institutes[0]?.id || '',
    className: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      isApproved: false
    };
    db.users = [...db.users, newUser];
    alert('Request submitted! Please wait for Admin approval.');
    onBack();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Create Account</h2>
        <p className="text-slate-500 mb-8">Join the platform to start learning or teaching.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input required type="text" className="w-full p-3 bg-slate-50 border rounded-lg" onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input required type="email" className="w-full p-3 bg-slate-50 border rounded-lg" onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input required type="password" className="w-full p-3 bg-slate-50 border rounded-lg" onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Join As</label>
              <select className="w-full p-3 bg-slate-50 border rounded-lg" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as UserRole})}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Institute</label>
              <select className="w-full p-3 bg-slate-50 border rounded-lg" value={formData.instituteId} onChange={e => setFormData({...formData, instituteId: e.target.value})}>
                {db.institutes.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
            </div>
          </div>
          {formData.role === 'student' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Class</label>
              <input required type="text" placeholder="e.g. 10th A" className="w-full p-3 bg-slate-50 border rounded-lg" onChange={e => setFormData({...formData, className: e.target.value})} />
            </div>
          )}

          <div className="pt-4 flex flex-col gap-3">
            <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md">
              Submit Registration Request
            </button>
            <button type="button" onClick={onBack} className="w-full py-2 text-slate-500 hover:text-slate-800 text-sm font-medium">
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
