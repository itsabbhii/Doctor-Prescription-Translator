import { type NextRequest, NextResponse } from "next/server"
import { patientsDB } from "@/lib/db-schema"
import { hashPassword, validateEmail, validatePassword, validatePhoneNumber, generateJWT } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const { full_name, email, phone, password, dob, profile_pic_url } = await request.json()

    // Validation
    if (!full_name || !email || !phone || !password || !dob) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 })
    }

    if (!validatePhoneNumber(phone)) {
      return NextResponse.json({ success: false, message: "Invalid phone number format" }, { status: 400 })
    }

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      return NextResponse.json({ success: false, message: passwordValidation.message }, { status: 400 })
    }

    // Check for duplicate email
    const existingPatient = Array.from(patientsDB.values()).find((p) => p.email === email)
    if (existingPatient) {
      return NextResponse.json({ success: false, message: "Email already registered" }, { status: 409 })
    }

    // Create new patient
    const patient_id = `patient_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const now = new Date().toISOString()

    const newPatient = {
      patient_id,
      full_name,
      email,
      phone,
      password_hash: hashPassword(password),
      dob,
      profile_pic_url: profile_pic_url || "",
      created_at: now,
      updated_at: now,
    }

    patientsDB.set(patient_id, newPatient)

    const token = generateJWT(patient_id)

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        patient_id,
        token,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, message: "Registration failed" }, { status: 500 })
  }
}
