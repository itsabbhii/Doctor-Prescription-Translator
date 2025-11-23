"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const router = useRouter()
  const [patient, setPatient] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    const patientId = localStorage.getItem("patient_id")

    if (!token || !patientId) {
      router.push("/auth/login")
      return
    }

    setPatient({ id: patientId })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("patient_id")
    router.push("/auth/login")
  }

  if (!patient) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-neutral-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Patient Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-neutral-900 mb-2">Prescription Analyzer</h2>
            <p className="text-neutral-600">Upload and analyze your prescriptions instantly</p>
          </Link>

          <Link href="/appointments" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-neutral-900 mb-2">Book Appointments</h2>
            <p className="text-neutral-600">Browse and book appointments with available doctors</p>
          </Link>

          <Link href="/bookings" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-neutral-900 mb-2">My Bookings</h2>
            <p className="text-neutral-600">View and manage your confirmed appointments</p>
          </Link>
        </div>
      </div>
    </main>
  )
}
