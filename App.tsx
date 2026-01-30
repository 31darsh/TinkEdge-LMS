
import React, { useState, useEffect } from 'react';
import { db } from './store';
import { User } from './pages/types';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AssessmentPortal from './pages/AssessmentPortal';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(db.getCurrentUser());
  const [page, setPage] = useState<string>('login');

  // Simple Hash Routing Simulation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') || 'login';
      setPage(hash);
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Auth Guard Logic
  useEffect(() => {
    const user = db.getCurrentUser();
    setCurrentUser(user);
    if (!user && !['login', 'register', 'assessment'].includes(page.split('?')[0])) {
      window.location.hash = 'login';
    }
  }, [page]);

  const renderPage = () => {
    const [path, query] = page.split('?');
    const params = new URLSearchParams(query);

    if (path === 'register') return <Register onBack={() => window.location.hash = 'login'} />;
    if (path === 'assessment') return <AssessmentPortal />;
    
    if (!currentUser) return <Login
  onLogin={(u) => {
    setCurrentUser(u);
    window.location.hash = u.role + '-dash';
  }}
  onNavigateRegister={() => {
    window.location.hash = 'register';
  }}
/>
;

    switch (currentUser.role) {
      case 'admin': return <AdminDashboard user={currentUser} onLogout={() => { db.logout(); setCurrentUser(null); window.location.hash = 'login'; }} />;
      case 'teacher': return <TeacherDashboard user={currentUser} onLogout={() => { db.logout(); setCurrentUser(null); window.location.hash = 'login'; }} />;
      case 'student': return <StudentDashboard user={currentUser} onLogout={() => { db.logout(); setCurrentUser(null); window.location.hash = 'login'; }} />;
      default: return <div>Unauthorized</div>;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  );
};

export default App;
