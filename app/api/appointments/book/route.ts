import { appointmentsDB, doctorsDB } from "@/lib/doctors-data"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { patient_id, doctor_id, date, time } = await request.json()

    if (!patient_id || !doctor_id || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Find doctor
    const doctor = doctorsDB.find((d) => d.doctor_id === doctor_id)
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 })
    }

    // Check if slot exists and is available
    const dateSlots = doctor.slots[date]
    if (!dateSlots) {
      return NextResponse.json({ error: "Date not available" }, { status: 400 })
    }

    const slot = dateSlots.find((s) => s.time === time)
    if (!slot || !slot.available) {
      return NextResponse.json({ error: "Slot not available" }, { status: 400 })
    }

    // Book the appointment
    slot.available = false
    slot.bookedBy = patient_id

    const appointment_id = `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const appointment = {
      appointment_id,
      patient_id,
      doctor_id,
      date,
      time,
      status: "confirmed" as const,
      created_at: new Date().toISOString(),
    }

    appointmentsDB.push(appointment)

    return NextResponse.json(
      {
        success: true,
        appointment,
        message: "Appointment booked successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 })
  }
}
