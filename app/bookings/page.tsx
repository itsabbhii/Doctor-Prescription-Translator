"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Booking {
  appointment_id: string
  doctor_id: string
  doctor_name: string
  specialty: string
  clinic_location: string
  clinic_phone: string
  date: string
  time: string
  status: string
}

export default function BookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("auth_token")
        const patientId = localStorage.getItem("patient_id")

        if (!token || !patientId) {
          router.push("/auth/login")
          return
        }

        const response = await fetch("/api/appointments/my-bookings", {
          headers: {
            "x-patient-id": patientId,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch bookings")
        }

        const data = await response.json()
        setBookings(data.bookings || [])
      } catch (err) {
        console.error("Error:", err)
        setError("Failed to load your bookings")
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-neutral-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">My Bookings</h1>
            <p className="text-neutral-600 mt-1">View and manage your appointments</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>

        {/* Error Message */}
        {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">{error}</div>}

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-neutral-600 text-lg mb-4">No bookings yet</p>
            <p className="text-neutral-500 mb-6">Start booking appointments with our doctors</p>
            <Link href="/appointments">
              <Button>Book an Appointment</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <Card key={booking.appointment_id} className="p-6 hover:shadow-lg transition">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Doctor Info */}
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-1">{booking.doctor_name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{booking.specialty}</p>
                    <div className="space-y-2 text-neutral-600">
                      <p>
                        <span className="font-semibold">Location:</span> {booking.clinic_location}
                      </p>
                      <p>
                        <span className="font-semibold">Phone:</span> {booking.clinic_phone}
                      </p>
                    </div>
                  </div>

                  {/* Appointment Info */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="text-neutral-600 text-sm mb-4">Appointment Details</p>
                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <p className="text-2xl font-bold text-blue-600 mb-2">{booking.time}</p>
                        <p className="text-neutral-600">{booking.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
