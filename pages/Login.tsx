import React from 'react';
import { GraduationCap, Lock, Mail, ArrowRight, ShieldAlert } from 'lucide-react';
import { User, UserRole } from './types';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigateRegister: () => void;
}

const Login = ({ onLogin, onNavigateRegister }: LoginProps) => {
  const handleDemoLogin = (role: UserRole, name: string, institute?: string) => {
    onLogin({ 
      role, 
      name, 
      id: Math.random().toString(36).substr(2, 9), 
      institute,
      email: `${role}@demo.com`,
      password: 'demo_password',
      isApproved: true
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-4">
            <GraduationCap className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Lumen LMS</h1>
          <p className="text-slate-500 text-sm font-medium">Enterprise Management Portal</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="relative text-slate-900">
            <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
            <input 
              type="email" 
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div className="relative text-slate-900">
            <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
            <input 
              type="password" 
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center space-x-2 active:scale-95">
            <span>Sign In</span>
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="flex items-center space-x-2 p-3 bg-amber-50 rounded-xl border border-amber-100 mb-8">
          <ShieldAlert size={16} className="text-amber-500 flex-shrink-0" />
          <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
            <strong>Security Notice:</strong> Only authorized personnel can access the administration consoles. Unauthorized access is logged.
          </p>
        </div>

        <div className="relative mb-8 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-bold tracking-widest">Master Sandbox</span></div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <button onClick={() => handleDemoLogin('app-admin', 'System Master')} className="py-2.5 text-[10px] font-bold bg-indigo-950 text-white rounded-lg hover:bg-indigo-800 transition-all shadow-sm">App Admin (Master)</button>
          <button onClick={() => handleDemoLogin('institute-admin', 'Jane Doe', 'St. Mary High')} className="py-2.5 text-[10px] font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm">Institute Admin</button>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button onClick={() => handleDemoLogin('teacher', 'Sarah Chen')} className="py-2.5 text-[10px] font-bold bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all shadow-sm">Teacher</button>
          <button onClick={() => handleDemoLogin('student', 'Alex Johnson')} className="py-2.5 text-[10px] font-bold bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all shadow-sm">Student</button>
        </div>

        <p className="text-center text-sm text-slate-500">
          New Institute? <button onClick={onNavigateRegister} className="text-blue-600 font-bold hover:underline">Register Now</button>
        </p>
      </div>
    </div>
  );
};

export default Login;