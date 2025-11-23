"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface Doctor {
  doctor_id: string
  name: string
  specialty: string
  clinic: string
  location: string
  phone: string
  bio: string
  rating: number
  slots: {
    [date: string]: Array<{
      time: string
      available: boolean
    }>
  }
}

interface DoctorListProps {
  onSelectDoctor: (doctor: Doctor, date: string, time: string) => void
}

export default function DoctorList({ onSelectDoctor }: DoctorListProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDates, setSelectedDates] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("/api/appointments/list")
        const data = await response.json()
        setDoctors(data.doctors)
      } catch (error) {
        console.error("Failed to fetch doctors:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  const getAvailableSlots = (doctor: Doctor, selectedDate: string) => {
    if (!selectedDate || !doctor.slots[selectedDate]) return []
    return doctor.slots[selectedDate].filter((slot) => slot.available)
  }

  if (loading) {
    return <div className="text-center py-8">Loading doctors...</div>
  }

  return (
    <div className="space-y-6">
      {doctors.map((doctor) => (
        <Card key={doctor.doctor_id} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-neutral-900">{doctor.name}</h3>
              <p className="text-primary font-medium">{doctor.specialty}</p>
              <p className="text-neutral-600 text-sm">{doctor.clinic}</p>
              <p className="text-neutral-600 text-sm mb-2">{doctor.location}</p>
              <p className="text-neutral-600 text-sm">{doctor.bio}</p>
            </div>
            <div className="flex items-center gap-1 bg-accent/10 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="font-semibold text-accent">{doctor.rating}</span>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-neutral-700 mb-2">Select Date & Time:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.keys(doctor.slots).map((date) => (
                <div key={date} className="border rounded-lg p-3">
                  <p className="text-sm font-semibold text-neutral-700 mb-2">
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <div className="space-y-2">
                    {getAvailableSlots(doctor, date).map((slot) => (
                      <Button
                        key={`${date}-${slot.time}`}
                        onClick={() => {
                          onSelectDoctor(doctor, date, slot.time)
                          setSelectedDates({ ...selectedDates, [doctor.doctor_id]: date })
                        }}
                        variant="outline"
                        size="sm"
                        className="w-full text-xs"
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t">
            <p className="text-sm text-neutral-600">
              <span className="font-medium">Contact:</span> {doctor.phone}
            </p>
          </div>
        </Card>
      ))}
    </div>
  )
}
