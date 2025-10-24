'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { mockMedicines } from '@/lib/mock-data';
import type { Medicine } from '@/lib/types';
import MedicineForm from './medicine-form';
import { Dialog, DialogContent } from '../ui/dialog';

export default function MedicineCatalog() {
  const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  const handleAddNew = () => {
    setSelectedMedicine(null);
    setIsFormOpen(true);
  };

  const handleEdit = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setIsFormOpen(true);
  };
  
  const handleVerify = (medicineId: string) => {
    setMedicines(prev => prev.map(med => med.id === medicineId ? {...med, verified: true} : med));
  }

  const handleSave = (medicineData: Medicine) => {
    if (selectedMedicine) {
      // Update existing
      setMedicines(prev =>
        prev.map(med => (med.id === medicineData.id ? medicineData : med))
      );
    } else {
      // Add new
      setMedicines(prev => [...prev, { ...medicineData, id: `med${prev.length + 1}` }]);
    }
    setIsFormOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Medicines</CardTitle>
                <CardDescription>
                    Manage the medicine database. Add, edit, and verify entries.
                </CardDescription>
            </div>
            <Button onClick={handleAddNew}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name (EN)</TableHead>
                <TableHead>Name (HI)</TableHead>
                <TableHead>Generic Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicines.map(medicine => (
                <TableRow key={medicine.id}>
                  <TableCell className="font-medium">{medicine.name_en}</TableCell>
                  <TableCell>{medicine.name_hi}</TableCell>
                  <TableCell className="text-muted-foreground">{medicine.generic_name}</TableCell>
                  <TableCell>
                    {medicine.verified ? (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Unverified
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(medicine)}>
                          Edit
                        </DropdownMenuItem>
                        {!medicine.verified && (
                          <DropdownMenuItem onClick={() => handleVerify(medicine.id)}>
                            Verify
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl">
          <MedicineForm
            medicine={selectedMedicine}
            onSave={handleSave}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
