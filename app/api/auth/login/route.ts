import { type NextRequest, NextResponse } from "next/server"
import { patientsDB } from "@/lib/db-schema"
import { verifyPassword, generateJWT } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password required" }, { status: 400 })
    }

    // Find patient by email
    const patient = Array.from(patientsDB.values()).find((p) => p.email === email)

    if (!patient) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    if (!verifyPassword(password, patient.password_hash)) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    const token = generateJWT(patient.patient_id)

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        patient_id: patient.patient_id,
        token,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "Login failed" }, { status: 500 })
  }
}
