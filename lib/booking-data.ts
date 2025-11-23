export interface Doctor {
  doctor_id: string
  doctor_name: string
  specialty: string
  clinic_name: string
  location: string
  available_slots: string[]
  booked_slots: {
    patient_id: string
    patient_name: string
    time: string
    contact: string
  }[]
  contact: {
    phone: string
    email: string
  }
}

export interface Patient {
  patient_id: string
  patient_name: string
  appointments: {
    doctor_id: string
    doctor_name: string
    time: string
    clinic_name: string
  }[]
  contact: string
}

export interface BookingData {
  doctors: Doctor[]
  patients: Patient[]
}

export const bookingData: BookingData = {
  doctors: [
    {
      doctor_id: "DOC001",
      doctor_name: "Dr. Sarah Mitchell",
      specialty: "Cardiologist",
      clinic_name: "Heart Care Clinic",
      location: "456 Medical Plaza, Downtown, NY 10001",
      available_slots: [
        "2025-11-24T10:00",
        "2025-11-24T11:00",
        "2025-11-24T14:00",
        "2025-11-25T09:30",
        "2025-11-25T15:00",
      ],
      booked_slots: [
        {
          patient_id: "PAT001",
          patient_name: "John Anderson",
          time: "2025-11-24T09:00",
          contact: "john.anderson@email.com",
        },
        {
          patient_id: "PAT002",
          patient_name: "Emma Wilson",
          time: "2025-11-24T16:00",
          contact: "emma.wilson@email.com",
        },
      ],
      contact: {
        phone: "+1-555-201-4567",
        email: "dr.sarah.mitchell@heartcare.com",
      },
    },
    {
      doctor_id: "DOC002",
      doctor_name: "Dr. James Chen",
      specialty: "Pulmonologist",
      clinic_name: "Respiratory Health Center",
      location: "789 Healthcare Ave, Midtown, NY 10022",
      available_slots: [
        "2025-11-24T08:00",
        "2025-11-24T12:00",
        "2025-11-24T13:30",
        "2025-11-25T10:00",
        "2025-11-25T16:30",
      ],
      booked_slots: [
        {
          patient_id: "PAT003",
          patient_name: "Michael Torres",
          time: "2025-11-24T11:00",
          contact: "michael.torres@email.com",
        },
      ],
      contact: {
        phone: "+1-555-202-8901",
        email: "dr.james.chen@resphealth.com",
      },
    },
    {
      doctor_id: "DOC003",
      doctor_name: "Dr. Priya Patel",
      specialty: "Endocrinologist",
      clinic_name: "Diabetes & Hormone Center",
      location: "321 Wellness St, Upper West Side, NY 10025",
      available_slots: [
        "2025-11-24T09:30",
        "2025-11-24T15:00",
        "2025-11-25T08:30",
        "2025-11-25T11:00",
        "2025-11-25T14:00",
      ],
      booked_slots: [
        {
          patient_id: "PAT001",
          patient_name: "John Anderson",
          time: "2025-11-24T14:30",
          contact: "john.anderson@email.com",
        },
        {
          patient_id: "PAT002",
          patient_name: "Emma Wilson",
          time: "2025-11-25T09:00",
          contact: "emma.wilson@email.com",
        },
        {
          patient_id: "PAT004",
          patient_name: "Lisa Brown",
          time: "2025-11-25T15:00",
          contact: "lisa.brown@email.com",
        },
      ],
      contact: {
        phone: "+1-555-203-5234",
        email: "dr.priya.patel@diabetescare.com",
      },
    },
  ],
  patients: [
    {
      patient_id: "PAT001",
      patient_name: "John Anderson",
      appointments: [
        {
          doctor_id: "DOC001",
          doctor_name: "Dr. Sarah Mitchell",
          time: "2025-11-24T09:00",
          clinic_name: "Heart Care Clinic",
        },
        {
          doctor_id: "DOC003",
          doctor_name: "Dr. Priya Patel",
          time: "2025-11-24T14:30",
          clinic_name: "Diabetes & Hormone Center",
        },
      ],
      contact: "john.anderson@email.com",
    },
    {
      patient_id: "PAT002",
      patient_name: "Emma Wilson",
      appointments: [
        {
          doctor_id: "DOC001",
          doctor_name: "Dr. Sarah Mitchell",
          time: "2025-11-24T16:00",
          clinic_name: "Heart Care Clinic",
        },
        {
          doctor_id: "DOC003",
          doctor_name: "Dr. Priya Patel",
          time: "2025-11-25T09:00",
          clinic_name: "Diabetes & Hormone Center",
        },
      ],
      contact: "emma.wilson@email.com",
    },
    {
      patient_id: "PAT003",
      patient_name: "Michael Torres",
      appointments: [
        {
          doctor_id: "DOC002",
          doctor_name: "Dr. James Chen",
          time: "2025-11-24T11:00",
          clinic_name: "Respiratory Health Center",
        },
      ],
      contact: "michael.torres@email.com",
    },
    {
      patient_id: "PAT004",
      patient_name: "Lisa Brown",
      appointments: [
        {
          doctor_id: "DOC003",
          doctor_name: "Dr. Priya Patel",
          time: "2025-11-25T15:00",
          clinic_name: "Diabetes & Hormone Center",
        },
      ],
      contact: "lisa.brown@email.com",
    },
  ],
}
