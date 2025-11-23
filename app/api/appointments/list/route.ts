import { doctorsDB } from "@/lib/doctors-data"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Return all doctors with their available slots
    const doctors = doctorsDB.map((doctor) => ({
      doctor_id: doctor.doctor_id,
      name: doctor.name,
      specialty: doctor.specialty,
      clinic: doctor.clinic,
      location: doctor.location,
      phone: doctor.phone,
      bio: doctor.bio,
      rating: doctor.rating,
      slots: doctor.slots,
    }))

    return NextResponse.json({ doctors }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 })
  }
}
