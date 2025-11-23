"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import DoctorList from "@/components/doctor-list"
import BookingModal from "@/components/booking-modal"
import { useToast } from "@/hooks/use-toast"

export default function AppointmentsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (!token) {
      router.push("/auth/login")
    }
  }, [router])

  const handleSelectDoctor = (doctor: any, date: string, time: string) => {
    setSelectedDoctor(doctor)
    setSelectedDate(date)
    setSelectedTime(time)
    setIsModalOpen(true)
  }

  const handleConfirmBooking = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) return

    setIsLoading(true)
    try {
      const patientId = localStorage.getItem("patient_id")
      const response = await fetch("/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: patientId,
          doctor_id: selectedDoctor.doctor_id,
          date: selectedDate,
          time: selectedTime,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to book appointment")
      }

      const data = await response.json()

      toast({
        title: "Success",
        description: "Your appointment has been booked successfully!",
      })

      setIsModalOpen(false)
      setSelectedDoctor(null)
      setSelectedDate("")
      setSelectedTime("")

      // Optionally redirect to dashboard after booking
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-neutral-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Book an Appointment</h1>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>

        <DoctorList onSelectDoctor={handleSelectDoctor} />

        <BookingModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          doctor={selectedDoctor}
          date={selectedDate}
          time={selectedTime}
          onConfirm={handleConfirmBooking}
          isLoading={isLoading}
        />
      </div>
    </main>
  )
}
