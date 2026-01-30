import React, { useState } from 'react';
import { ArrowLeft, Building2, User, Mail, ShieldCheck, CheckCircle2, Phone, MapPin } from 'lucide-react';

const Register = ({ onBack }: { onBack: () => void }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    instituteName: '',
    adminName: '',
    email: '',
    phone: '',
    address: '',
    type: 'school'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-slate-100 animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Application Received</h2>
          <p className="text-slate-500 mb-8">
            Your detailed registration for <strong>{formData.instituteName}</strong> is being reviewed by our App Admins. 
            Once approved, login credentials will be sent to <strong>{formData.email}</strong>.
          </p>
          <button 
            onClick={onBack}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-100 transition-all"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <button onClick={onBack} className="flex items-center space-x-2 text-slate-500 hover:text-slate-800 mb-8 transition-colors">
          <ArrowLeft size={18} />
          <span className="font-medium text-sm">Back to Login</span>
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Detailed Institute Onboarding</h1>
          <p className="text-slate-500 text-sm font-medium">Please provide comprehensive details for system verification.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2 col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Official Institute Name</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <input 
                name="instituteName"
                value={formData.instituteName}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                placeholder="Global Excellence Academy" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Admin Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <input 
                name="adminName"
                value={formData.adminName}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                placeholder="John Doe" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <input 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                placeholder="+1 (555) 000-0000" 
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Official Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <input 
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                placeholder="admin@institute.edu" 
              />
            </div>
          </div>

          <div className="space-y-2 col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Physical Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <textarea 
                name="address"
                rows={2}
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none" 
                placeholder="123 Education Lane, Academic City..." 
              />
            </div>
          </div>

          <div className="md:col-span-2 mt-4">
            <button 
              type="submit" 
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center space-x-2 active:scale-95"
            >
              <ShieldCheck size={20} />
              <span>Submit Detailed Application</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
