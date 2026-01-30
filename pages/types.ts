export type UserRole = 'app-admin' | 'institute-admin' | 'teacher' | 'student' | null;

export interface User {
  role: UserRole;
  name: string;
  id: string;
  institute?: string;
  marks?: number;
}

export interface InstituteRegistration {
  id: number;
  name: string;
  admin: string;
  email: string;
  phone: string;
  address: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export interface Assessment {
  id: string;
  title: string;
  questions: any[];
}