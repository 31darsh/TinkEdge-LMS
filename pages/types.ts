export type UserRole = 'app-admin' | 'institute-admin' | 'teacher' | 'student' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  institute?: string;
  instituteId?: string;
  className?: string;
  isApproved?: boolean;
  progressCount?: number;
  marks?: number;
}

export interface Content {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'quiz' | 'resource';
  url: string;
  priority?: number;
  instituteId?: string;
  className?: string;
}

export interface Class {
  id: string;
  name: string;
  instituteId: string;
  academicYear?: string;
  isArchived?: boolean;
}

export interface Institute {
  id: string;
  name: string;
  address?: string;
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
  type?: 'student' | 'teacher' | 'exam';
  questions: any[];
}