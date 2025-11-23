import { type NextRequest, NextResponse } from "next/server"
import { doctors } from "@/lib/doctors-data"

export async function GET(request: NextRequest) {
  try {
    const patientId = request.headers.get("x-patient-id")

    if (!patientId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const patientBookings: any[] = []

    doctors.forEach((doctor) => {
      // Iterate over slot dates
      Object.entries(doctor.slots).forEach(([date, slots]) => {
        slots.forEach((slot) => {
          if (!slot.available && slot.bookedBy === patientId) {
            patientBookings.push({
              appointment_id: `${doctor.doctor_id}-${date}-${slot.time}`,
              doctor_id: doctor.doctor_id,
              doctor_name: doctor.name,
              specialty: doctor.specialty,
              clinic_location: doctor.location,
              clinic_phone: doctor.phone,
              date: date,
              time: slot.time,
              status: "confirmed",
              booked_at: new Date().toISOString(),
            })
          }
        })
      })
    })

    return NextResponse.json({
      success: true,
      bookings: patientBookings,
      total: patientBookings.length,
    })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}
