export interface Appointment {
  appointment_id: string
  doctor_name: string
  specialty: string
  clinic_name: string
  location: string
  available_slots: string[]
  booked_slots: Array<{
    patient_name: string
    time: string
    contact: string
  }>
  contact: {
    phone: string
    email: string
  }
}

export const appointmentsData: { appointments: Appointment[] } = {
  appointments: [
    {
      appointment_id: "APT001",
      doctor_name: "Dr. Sarah Mitchell",
      specialty: "Cardiologist",
      clinic_name: "Heart Care Clinic",
      location: "123 Medical Plaza, New York, NY 10001",
      available_slots: [
        "2025-11-24T10:00",
        "2025-11-24T11:00",
        "2025-11-24T14:00",
        "2025-11-24T15:30",
        "2025-11-25T09:00",
      ],
      booked_slots: [
        {
          patient_name: "Jane Smith",
          time: "2025-11-24T09:00",
          contact: "jane.smith@example.com",
        },
        {
          patient_name: "Robert Johnson",
          time: "2025-11-24T13:00",
          contact: "robert.j@example.com",
        },
      ],
      contact: {
        phone: "+1-555-123-4567",
        email: "dr.mitchell@heartcare.com",
      },
    },
    {
      appointment_id: "APT002",
      doctor_name: "Dr. James Chen",
      specialty: "Dermatologist",
      clinic_name: "Skin Health Center",
      location: "456 Wellness Ave, Los Angeles, CA 90001",
      available_slots: [
        "2025-11-24T09:30",
        "2025-11-24T10:30",
        "2025-11-24T16:00",
        "2025-11-25T10:00",
        "2025-11-25T14:00",
      ],
      booked_slots: [
        {
          patient_name: "Emily Davis",
          time: "2025-11-24T09:00",
          contact: "emily.davis@example.com",
        },
        {
          patient_name: "Michael Brown",
          time: "2025-11-24T11:00",
          contact: "m.brown@example.com",
        },
        {
          patient_name: "Lisa Wang",
          time: "2025-11-25T09:00",
          contact: "lisa.wang@example.com",
        },
      ],
      contact: {
        phone: "+1-555-987-6543",
        email: "dr.chen@skinhealth.com",
      },
    },
    {
      appointment_id: "APT003",
      doctor_name: "Dr. Priya Patel",
      specialty: "Neurologist",
      clinic_name: "Brain & Spine Institute",
      location: "789 Research Dr, Chicago, IL 60601",
      available_slots: [
        "2025-11-24T11:00",
        "2025-11-24T12:00",
        "2025-11-24T15:00",
        "2025-11-25T11:00",
        "2025-11-25T13:30",
      ],
      booked_slots: [
        {
          patient_name: "David Garcia",
          time: "2025-11-24T10:00",
          contact: "d.garcia@example.com",
        },
        {
          patient_name: "Amanda Thompson",
          time: "2025-11-24T14:00",
          contact: "amanda.t@example.com",
        },
      ],
      contact: {
        phone: "+1-555-456-7890",
        email: "dr.patel@braincenter.com",
      },
    },
  ],
}
