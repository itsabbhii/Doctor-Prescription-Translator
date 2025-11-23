// Mock doctors and appointments data
export interface TimeSlot {
  time: string
  available: boolean
  bookedBy?: string
}

export interface Doctor {
  doctor_id: string
  name: string
  specialty: string
  clinic: string
  location: string
  phone: string
  bio: string
  rating: number
  slots: {
    [date: string]: TimeSlot[]
  }
}

export const doctorsDB: Doctor[] = [
  {
    doctor_id: "doc_1",
    name: "Dr. Sarah Johnson",
    specialty: "General Practitioner",
    clinic: "City Medical Center",
    location: "123 Medical St, Downtown",
    phone: "+1 (555) 123-4567",
    bio: "Experienced GP with 10+ years in patient care and diagnosis",
    rating: 4.8,
    slots: {
      "2025-11-24": [
        { time: "09:00 AM", available: true },
        { time: "10:00 AM", available: true },
        { time: "11:00 AM", available: false, bookedBy: "patient_123" },
        { time: "02:00 PM", available: true },
        { time: "03:00 PM", available: true },
      ],
      "2025-11-25": [
        { time: "09:00 AM", available: true },
        { time: "10:00 AM", available: true },
        { time: "11:00 AM", available: true },
        { time: "02:00 PM", available: true },
        { time: "03:00 PM", available: false, bookedBy: "patient_456" },
      ],
      "2025-11-26": [
        { time: "09:00 AM", available: true },
        { time: "10:00 AM", available: false, bookedBy: "patient_789" },
        { time: "11:00 AM", available: true },
        { time: "02:00 PM", available: true },
        { time: "03:00 PM", available: true },
      ],
    },
  },
  {
    doctor_id: "doc_2",
    name: "Dr. Michael Chen",
    specialty: "Cardiologist",
    clinic: "Heart Care Hospital",
    location: "456 Hospital Ave, Midtown",
    phone: "+1 (555) 234-5678",
    bio: "Specialized in cardiac care with expertise in preventive medicine",
    rating: 4.9,
    slots: {
      "2025-11-24": [
        { time: "08:00 AM", available: true },
        { time: "09:00 AM", available: true },
        { time: "10:00 AM", available: true },
        { time: "01:00 PM", available: false, bookedBy: "patient_111" },
        { time: "02:00 PM", available: true },
      ],
      "2025-11-25": [
        { time: "08:00 AM", available: true },
        { time: "09:00 AM", available: false, bookedBy: "patient_222" },
        { time: "10:00 AM", available: true },
        { time: "01:00 PM", available: true },
        { time: "02:00 PM", available: true },
      ],
      "2025-11-26": [
        { time: "08:00 AM", available: true },
        { time: "09:00 AM", available: true },
        { time: "10:00 AM", available: true },
        { time: "01:00 PM", available: true },
        { time: "02:00 PM", available: false, bookedBy: "patient_333" },
      ],
    },
  },
  {
    doctor_id: "doc_3",
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    clinic: "Skin Health Clinic",
    location: "789 Wellness Rd, Uptown",
    phone: "+1 (555) 345-6789",
    bio: "Expert in skin conditions and cosmetic dermatology",
    rating: 4.7,
    slots: {
      "2025-11-24": [
        { time: "10:00 AM", available: true },
        { time: "11:00 AM", available: true },
        { time: "12:00 PM", available: false, bookedBy: "patient_444" },
        { time: "03:00 PM", available: true },
        { time: "04:00 PM", available: true },
      ],
      "2025-11-25": [
        { time: "10:00 AM", available: false, bookedBy: "patient_555" },
        { time: "11:00 AM", available: true },
        { time: "12:00 PM", available: true },
        { time: "03:00 PM", available: true },
        { time: "04:00 PM", available: true },
      ],
      "2025-11-26": [
        { time: "10:00 AM", available: true },
        { time: "11:00 AM", available: true },
        { time: "12:00 PM", available: true },
        { time: "03:00 PM", available: false, bookedBy: "patient_666" },
        { time: "04:00 PM", available: true },
      ],
    },
  },
]

export interface Appointment {
  appointment_id: string
  patient_id: string
  doctor_id: string
  date: string
  time: string
  status: "confirmed" | "cancelled" | "completed"
  created_at: string
}

export const appointmentsDB: Appointment[] = []

export const doctors = doctorsDB
