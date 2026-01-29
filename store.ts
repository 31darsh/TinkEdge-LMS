
import { User, Institute, Class, Content, Assessment, Notification } from './types';

const INITIAL_USERS: User[] = [
  { id: '1', name: 'Super Admin', email: 'admin@lms.com', password: 'admin123', role: 'admin', instituteId: '1', className: '', isApproved: true },
  { id: '2', name: 'Dr. Sarah Wilson', email: 'sarah@school.com', password: 'password123', role: 'teacher', instituteId: '1', className: '10th A', isApproved: true },
  { id: '3', name: 'Alice Johnson', email: 'alice@student.com', password: 'password123', role: 'student', instituteId: '1', className: '10th A', isApproved: true, progressCount: 0 }
];

const INITIAL_INSTITUTES: Institute[] = [
  { id: '1', name: 'ThinkEdge Global Academy', address: 'Tech Park, Bangalore' }
];

const INITIAL_CLASSES: Class[] = [
  { id: '1', name: '10th A', instituteId: '1', academicYear: '2023-24', isArchived: false },
  { id: '2', name: '11th A', instituteId: '1', academicYear: '2023-24', isArchived: false }
];

const INITIAL_CONTENTS: Content[] = [
  { id: 'c1', instituteId: '1', className: '10th A', title: '01. Fundamentals of Physics', type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', priority: 1 },
  { id: 'c2', instituteId: '1', className: '10th A', title: '02. Detailed Research PDF', type: 'pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', priority: 2 }
];

const INITIAL_ASSESSMENTS: Assessment[] = [
  {
    id: 'a1',
    title: 'Mid-Year Science Assessment',
    type: 'student',
    instituteId: '1',
    questions: [
      { id: 'q1', text: 'What is the SI unit of force?', options: ['Newton', 'Joule', 'Pascal', 'Watt'], correctAnswer: 0 },
      { id: 'q2', text: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 1 }
    ]
  }
];

class Store {
  private getData<T>(key: string, initial: T): T {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initial;
  }

  private setData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get users(): User[] { return this.getData('users', INITIAL_USERS); }
  set users(u: User[]) { this.setData('users', u); }

  get notifications(): Notification[] { return this.getData('notifications', []); }
  set notifications(n: Notification[]) { this.setData('notifications', n); }

  get institutes(): Institute[] { return this.getData('institutes', INITIAL_INSTITUTES); }
  set institutes(i: Institute[]) { this.setData('institutes', i); }

  get classes(): Class[] { return this.getData('classes', INITIAL_CLASSES); }
  set classes(c: Class[]) { this.setData('classes', c); }

  get contents(): Content[] { return this.getData('contents', INITIAL_CONTENTS); }
  set contents(c: Content[]) { this.setData('contents', c); }

  get assessments(): Assessment[] { return this.getData('assessments', INITIAL_ASSESSMENTS); }
  set assessments(a: Assessment[]) { this.setData('assessments', a); }

  archiveAndPromote(classId: string, nextClassName: string) {
    const currentClasses = this.classes;
    const targetClass = currentClasses.find(c => c.id === classId);
    if (!targetClass) return;

    targetClass.isArchived = true;
    
    const updatedUsers = this.users.map(u => {
        if (u.role === 'student' && u.className === targetClass.name) {
            return { ...u, className: nextClassName, progressCount: 0 };
        }
        return u;
    });

    this.classes = [...currentClasses];
    this.users = updatedUsers;
  }

  getCurrentUser(): User | null {
    const userId = localStorage.getItem('currentUserId');
    return userId ? this.users.find(u => u.id === userId) || null : null;
  }

  login(email: string, pass: string): User | null {
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user && user.isApproved && user.password === pass) {
      localStorage.setItem('currentUserId', user.id);
      return user;
    }
    return null;
  }

  logout() { localStorage.removeItem('currentUserId'); }
}

export const db = new Store();
