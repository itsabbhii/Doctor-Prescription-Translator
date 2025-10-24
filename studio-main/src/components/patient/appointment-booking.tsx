'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Stethoscope } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Appointment, User as UserType } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';

const getDoctorInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return names[0].substring(0, 2);
}

export default function AppointmentBooking({ patientId }: { patientId: string }) {
  const [specialty, setSpecialty] = useState<string>('All');
  const { appointments, addAppointment, user, registeredUsers } = useAuth();
  const { toast } = useToast();
  const avatarImage = PlaceHolderImages.find(p => p.id === 'user-avatar');

  const doctors = registeredUsers.filter(u => u.role === 'Pharmacist');

  const specialties = ['All', ...Array.from(new Set(doctors.map(d => d.specialization).filter(Boolean))) as string[]];

  const filteredDoctors = specialty === 'All'
    ? doctors
    : doctors.filter(d => d.specialization === specialty);

  const handleBookAppointment = (doctor: UserType) => {
    if (!user) return;
    // This is a mock implementation. In a real app, you'd check for availability.
    const newAppointment: Appointment = {
        id: `apt${appointments.length + 1}`,
        patientId: user.id,
        patientName: user.name,
        pharmacistId: doctor.id,
        appointmentDate: '2024-08-20', // Mocked date
        appointmentTime: '03:00 PM', // Mocked time
        status: 'Pending',
    };

    addAppointment(newAppointment);

    toast({
        title: 'Appointment Requested',
        description: `Your appointment with ${doctor.name} has been requested. You will be notified once it's confirmed.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="specialty-filter" className="text-sm font-medium">Filter by specialty</label>
        <Select value={specialty} onValueChange={setSpecialty}>
          <SelectTrigger id="specialty-filter" className="w-full md:w-64 mt-1">
            <SelectValue placeholder="Select a specialty" />
          </SelectTrigger>
          <SelectContent>
            {specialties.map(spec => (
              <SelectItem key={spec} value={spec}>{spec}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDoctors.map(doctor => (
          <Card key={doctor.id}>
            <CardHeader className="flex-row items-center gap-4">
               <Avatar className="h-14 w-14">
                    {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={doctor.name} />}
                    <AvatarFallback>{getDoctorInitials(doctor.name)}</AvatarFallback>
                </Avatar>
              <div>
                <CardTitle>{doctor.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 pt-1">
                    <Stethoscope className="h-4 w-4" />
                    {doctor.specialization || 'General'}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Next available: Today</span>
                </div>
              <Button className="w-full" onClick={() => handleBookAppointment(doctor)}>
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
