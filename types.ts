
export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  instituteId: string;
  className: string;
  isApproved: boolean;
  progressCount?: number; // How many resources completed
  marks?: Record<string, number>;
}

export interface Notification {
  id: string;
  userId: string;
  userEmail: string;
  subject: string;
  body: string;
  sentAt: string;
}

export interface Institute {
  id: string;
  name: string;
  address: string;
}

export interface Class {
  id: string;
  name: string;
  instituteId: string;
  academicYear: string;
  isArchived: boolean;
}

export interface Content {
  id: string;
  instituteId: string;
  className: string;
  title: string;
  type: 'video' | 'pdf' | 'ppt';
  url: string;
  priority: number;
}

export interface Assessment {
  id: string;
  title: string;
  type: 'teacher' | 'student';
  questions: Question[];
  instituteId: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}
