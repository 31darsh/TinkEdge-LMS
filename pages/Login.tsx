
import React, { useState } from 'react';
import { db } from '../store';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = db.login(email, password);
    if (user) {
      onLogin(user);
    } else {
      setError('Invalid credentials or account pending approval.');
    }
  };

  const fillDemo = (e: string) => {
    setEmail(e);
    setPassword('admin123');
  };

  return (
    <div className="flex min-h-screen bg-slate-900 overflow-hidden">
      {/* Brand Side */}
      <div className="hidden lg:flex lg:flex-1 flex-col justify-center p-16 text-white bg-gradient-to-br from-blue-900 to-indigo-900">
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight">TinkEdge</h1>
        <p className="text-xl text-blue-100 max-w-md leading-relaxed">
          Empowering the next generation of innovators with smart, interactive, and structured learning.
        </p>
        
        <div className="mt-12 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 max-w-sm">
          <button 
            onClick={() => setShowDemo(!showDemo)}
            className="text-sm font-bold flex items-center gap-2 text-white/80 hover:text-white mb-2"
          >
            {showDemo ? '▼' : '▶'} Developer Mode: Admin Login
          </button>
          {showDemo && (
            <div className="space-y-3 mt-4 text-sm animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-center bg-white/5 p-2 rounded">
                <code className="text-blue-200">admin@lms.com</code>
                <button onClick={() => fillDemo('admin@lms.com')} className="bg-blue-600 px-2 py-1 rounded text-xs font-bold">Fill</button>
              </div>
              <div className="text-xs text-blue-200/60 italic">* Use Admin to approve new registered users.</div>
            </div>
          )}
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
            <p className="mt-2 text-slate-600">Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center font-medium border border-red-100">{error}</div>}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="name@school.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Need an account?{' '}
            <button onClick={() => window.location.hash = 'register'} className="text-blue-600 font-bold hover:underline">
              Request Access
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
