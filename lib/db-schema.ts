// Database schema for patient management
export interface Patient {
  patient_id: string
  full_name: string
  email: string
  phone: string
  password_hash: string
  dob: string
  profile_pic_url?: string
  created_at: string
  updated_at: string
}

// In-memory database for demo (in production, use Supabase/PostgreSQL)
export const patientsDB: Map<string, Patient> = new Map()
