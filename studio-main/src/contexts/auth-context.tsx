'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import type { User, UserRole, Appointment, PrescriptionUpload } from '@/lib/types';
import { mockUsers, mockAppointments, mockUploadHistory } from '@/lib/mock-data';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  signup: (name: string, email: string, role: UserRole, specialization?: string) => void;
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  registeredUsers: User[];
  uploadHistory: PrescriptionUpload[];
  addUploadToHistory: (upload: PrescriptionUpload) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(mockUsers);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [uploadHistory, setUploadHistory] = useState<PrescriptionUpload[]>(mockUploadHistory);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd check for a token in localStorage or a cookie
    try {
      const storedUser = localStorage.getItem('spam-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      
      const storedRegisteredUsers = localStorage.getItem('spam-registered-users');
      if (storedRegisteredUsers) {
        setRegisteredUsers(JSON.parse(storedRegisteredUsers));
      } else {
        localStorage.setItem('spam-registered-users', JSON.stringify(mockUsers));
      }

      const storedAppointments = localStorage.getItem('spam-appointments');
      if (storedAppointments) {
        setAppointments(JSON.parse(storedAppointments));
      } else {
        localStorage.setItem('spam-appointments', JSON.stringify(mockAppointments));
      }
      
      const storedUploadHistory = localStorage.getItem('spam-upload-history');
      if (storedUploadHistory) {
        setUploadHistory(JSON.parse(storedUploadHistory));
      } else {
        localStorage.setItem('spam-upload-history', JSON.stringify(mockUploadHistory));
      }

    } catch (error) {
      console.error("Failed to parse from localStorage", error);
      localStorage.removeItem('spam-user');
      localStorage.removeItem('spam-registered-users');
      localStorage.removeItem('spam-appointments');
      localStorage.removeItem('spam-upload-history');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email: string, role: UserRole) => {
    setLoading(true);
    const foundUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.role === role
    );

    if (foundUser) {
      localStorage.setItem('spam-user', JSON.stringify(foundUser));
      setUser(foundUser);
      setLoading(false);
    } else {
      setLoading(false);
      throw new Error('Invalid credentials or role for this user.');
    }
  };

  const signup = (name: string, email: string, role: UserRole, specialization?: string) => {
    setLoading(true);

    const existingUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
        setLoading(false);
        throw new Error('A user with this email already exists.');
    }

    const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email,
        role,
        specialization: role === 'Pharmacist' ? specialization : undefined,
    };
    
    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('spam-registered-users', JSON.stringify(updatedUsers));
    localStorage.setItem('spam-user', JSON.stringify(newUser));
    setUser(newUser);
    setLoading(false);
  };


  const logout = () => {
    setLoading(true);
    localStorage.removeItem('spam-user');
    setUser(null);
    setLoading(false);
  };

  const addAppointment = (appointment: Appointment) => {
    const updatedAppointments = [...appointments, appointment];
    setAppointments(updatedAppointments);
    localStorage.setItem('spam-appointments', JSON.stringify(updatedAppointments));
  }

  const addUploadToHistory = (upload: PrescriptionUpload) => {
    const updatedHistory = [upload, ...uploadHistory];
    setUploadHistory(updatedHistory);
    localStorage.setItem('spam-upload-history', JSON.stringify(updatedHistory));
  }


  const value = { user, loading, login, logout, signup, appointments, addAppointment, registeredUsers, uploadHistory, addUploadToHistory };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
