import { User, Institute, Class, Content, Assessment, Notification } from './types';

class Store {
  users: User[] = [
    {
      id: '1',
      name: 'System Admin',
      email: 'admin@demo.com',
      password: 'admin',
      role: 'app-admin',
      isApproved: true
    },
    {
      id: '2',
      name: 'Teacher User',
      email: 'teacher@demo.com',
      password: 'teacher',
      role: 'teacher',
      instituteId: '1',
      isApproved: true
    }
  ];

  institutes: Institute[] = [
    { id: '1', name: 'Global Excellence Academy', address: '123 Education Lane' }
  ];

  classes: Class[] = [
    { id: '1', name: 'Grade 10-A', instituteId: '1' }
  ];

  contents: Content[] = [];

  assessments: Assessment[] = [
    {
      id: '1',
      title: 'Mid-term Mathematics',
      type: 'exam',
      instituteId: '1',
      questions: [
        { id: 1, text: 'What is 2+2?', options: ['3', '4', '5'], answer: '4' }
      ]
    }
  ];

  notifications: Notification[] = [];

  login(email: string): User | undefined {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  addUser(user: User) {
    this.users.push(user);
  }

  getUsersByInstitute(instituteId: string) {
    return this.users.filter(u => u.instituteId === instituteId);
  }
}

// Exported as 'db' to match App.tsx requirements and resolve build error
export const db = new Store();
export const store = db;