"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface BookingModalProps {
  open: boolean
  onClose: () => void
  doctor: any
  date: string
  time: string
  onConfirm: () => void
  isLoading: boolean
}

export default function BookingModal({ open, onClose, doctor, date, time, onConfirm, isLoading }: BookingModalProps) {
  if (!doctor) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Appointment</DialogTitle>
          <DialogDescription>Review your appointment details before confirming</DialogDescription>
        </DialogHeader>

        <Card className="p-4 bg-secondary/5">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-neutral-600">Doctor</p>
              <p className="font-semibold text-neutral-900">{doctor.name}</p>
              <p className="text-sm text-primary">{doctor.specialty}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-neutral-600">Date</p>
                <p className="font-semibold text-neutral-900">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Time</p>
                <p className="font-semibold text-neutral-900">{time}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-neutral-600">Location</p>
              <p className="font-semibold text-neutral-900">{doctor.location}</p>
            </div>

            <div>
              <p className="text-sm text-neutral-600">Contact</p>
              <p className="font-semibold text-neutral-900">{doctor.phone}</p>
            </div>
          </div>
        </Card>

        <div className="flex gap-3 pt-4">
          <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isLoading} className="flex-1">
            {isLoading ? "Booking..." : "Confirm Booking"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
