export type UserRole = 'Patient' | 'Pharmacist' | 'Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  specialization?: string;
}

export interface Medicine {
  id: string;
  name_en: string;
  name_hi: string;
  generic_name: string;
  uses_en: string;
  uses_hi: string;
  precautions_en: string;
  precautions_hi: string;
  side_effects_en: string;
  side_effects_hi: string;
  verified: boolean;
}

export interface PrescriptionUpload {
  id: string;
  fileName: string;
  uploadDate: string;
  status: 'Completed' | 'Processing';
  reportUrl?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  pharmacistId: string;
  patientName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}
