
import React, { useState, useEffect } from 'react';
import { db } from '../store';
import { Assessment } from '../types';

const AssessmentPortal: React.FC = () => {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [meta, setMeta] = useState({ studentId: '', instituteId: '' });

  useEffect(() => {
    // ANTI-CHEAT: Disable right click and copy-paste
    const preventAction = (e: any) => e.preventDefault();
    document.addEventListener('contextmenu', preventAction);
    document.addEventListener('copy', preventAction);
    document.addEventListener('paste', preventAction);
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v')) e.preventDefault();
    });

    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const id = params.get('id');
    const inst = params.get('inst');
    const std = params.get('std');

    if (id) {
        setAssessment(db.assessments.find(a => a.id === id) || db.assessments[0]);
        setMeta({ studentId: std || 'Unknown', instituteId: inst || 'Unknown' });
    }

    return () => {
        document.removeEventListener('contextmenu', preventAction);
        document.removeEventListener('copy', preventAction);
        document.removeEventListener('paste', preventAction);
    };
  }, []);

  const handleFinish = () => {
    let correct = 0;
    assessment?.questions.forEach(q => { if (answers[q.id] === q.correctAnswer) correct++; });
    const finalScore = Math.round((correct / assessment!.questions.length) * 100);
    setScore(finalScore);
    setIsFinished(true);

    if (meta.studentId !== 'Unknown') {
        db.users = db.users.map(u => u.id === meta.studentId ? { ...u, marks: { ...u.marks, [assessment!.id]: finalScore } } : u);
    }
  };

  if (!assessment) return <div className="p-20 text-center font-bold text-slate-400">Loading Secure Portal...</div>;

  if (isFinished) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 no-copy">
        <div className="bg-white max-w-xl w-full rounded-3xl p-12 text-center shadow-2xl">
            <h1 className="text-4xl font-black mb-4">Exam Completed</h1>
            <div className="text-7xl text-blue-600 font-black mb-8">{score}%</div>
            <button onClick={() => window.print()} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold mb-4">Print Certificate</button>
            <button onClick={() => window.location.hash = 'login'} className="text-slate-400">Exit Portal</button>
        </div>
        <div className="hidden print:block p-10 text-center border-8 border-blue-900">
            <h1>CERTIFICATE OF COMPLETION</h1>
            <h2>Student ID: {meta.studentId}</h2>
            <h3>Score: {score}%</h3>
            <p>Validated by ThinkEdge LMS</p>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col no-copy">
      <div className="bg-white border-b p-4 flex justify-between items-center no-print">
        <div className="font-bold text-red-600 bg-red-50 px-3 py-1 rounded text-xs">SECURE EXAM MODE</div>
        <div className="text-slate-400 text-xs font-bold">SID: {meta.studentId}</div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white max-w-2xl w-full rounded-3xl p-10 shadow-xl border">
            <p className="text-xs font-bold text-slate-400 mb-2 uppercase">Question {currentStep + 1}</p>
            <h2 className="text-xl font-bold mb-8">{assessment.questions[currentStep].text}</h2>
            <div className="space-y-3 mb-10">
                {assessment.questions[currentStep].options.map((o, idx) => (
                    <button key={idx} onClick={() => setAnswers({...answers, [assessment.questions[currentStep].id]: idx})} 
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${answers[assessment.questions[currentStep].id] === idx ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-50'}`}>
                        {String.fromCharCode(65 + idx)}) {o}
                    </button>
                ))}
            </div>
            <div className="flex justify-between">
                <button disabled={currentStep === 0} onClick={() => setCurrentStep(p => p - 1)} className="text-slate-400 font-bold disabled:opacity-0">Prev</button>
                {currentStep === assessment.questions.length - 1 ? 
                    <button onClick={handleFinish} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold">Submit</button> :
                    <button onClick={() => setCurrentStep(p => p + 1)} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Next</button>
                }
            </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPortal;
