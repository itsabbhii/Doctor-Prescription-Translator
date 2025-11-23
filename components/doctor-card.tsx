import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Appointment } from "@/lib/appointments-data"

interface DoctorCardProps {
  doctor: Appointment
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const totalSlots = doctor.available_slots.length + doctor.booked_slots.length
  const occupancyRate = ((doctor.booked_slots.length / totalSlots) * 100).toFixed(0)

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground">{doctor.doctor_name}</h3>
            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
          </div>
          <Badge variant="secondary" className="whitespace-nowrap">
            {occupancyRate}% Booked
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-foreground font-medium">{doctor.clinic_name}</p>
          <p className="text-muted-foreground">{doctor.location}</p>

          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground">
              📞{" "}
              <a href={`tel:${doctor.contact.phone}`} className="hover:text-primary">
                {doctor.contact.phone}
              </a>
            </p>
            <p className="text-muted-foreground">
              📧{" "}
              <a href={`mailto:${doctor.contact.email}`} className="hover:text-primary">
                {doctor.contact.email}
              </a>
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">
                Available Slots ({doctor.available_slots.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {doctor.available_slots.map((slot) => (
                  <Badge key={slot} variant="outline" className="text-xs">
                    {new Date(slot).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Badge>
                ))}
              </div>
            </div>

            {doctor.booked_slots.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">
                  Booked Appointments ({doctor.booked_slots.length})
                </p>
                <div className="space-y-2">
                  {doctor.booked_slots.map((booking, idx) => (
                    <div key={idx} className="text-xs p-2 rounded bg-muted text-muted-foreground">
                      <p className="font-medium">{booking.patient_name}</p>
                      <p>
                        {new Date(booking.time).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="text-xs">{booking.contact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
