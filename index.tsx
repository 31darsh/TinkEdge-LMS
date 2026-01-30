import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { User, UserRole } from './types';
import Login from './pages/Login';
import Register from './pages/Register';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AssessmentPortal from './pages/AssessmentPortal';


const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'auth' | 'register' | 'app' | 'assessment'>('auth');
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('assessmentId')) {
      setView('assessment');
    }
  }, []);

  if (view === 'assessment') return <AssessmentPortal />;
  if (view === 'register') return <Register onBack={() => setView('auth')} />;
  
  if (view === 'auth' && !user) {
    return (
      <Login 
        onLogin={(u: User) => { 
          setUser(u); 
          setView('app'); 
        }} 
        onNavigateRegister={() => setView('register')} 
      />
    );
  }

  const logout = () => {
    setUser(null);
    setView('auth');
  };

  const role = user?.role as UserRole;

  switch (role) {
    case 'app-admin':
    case 'admin':
      return <SuperAdminDashboard user={user!} onLogout={logout} />;
    case 'institute-admin':
      return <AdminDashboard user={user!} onLogout={logout} />;
    case 'teacher':
      return <TeacherDashboard user={user!} onLogout={logout} />;
    case 'student':
      return <StudentDashboard user={user!} onLogout={logout} />;
    default:
      return (
        <Login 
          onLogin={(u: User) => { 
            setUser(u); 
            setView('app'); 
          }} 
          onNavigateRegister={() => setView('register')} 
        />
      );
  }
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);