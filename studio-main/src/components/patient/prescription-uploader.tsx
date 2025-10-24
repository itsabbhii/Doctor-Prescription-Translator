'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UploadCloud, FileCheck2, Loader2, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MedicineInfoDisplay from './medicine-info-display';
import { mockMedicines } from '@/lib/mock-data';
import MedicineForm from '../pharmacist/medicine-form';
import { Medicine, PrescriptionUpload } from '@/lib/types';
import { extractMedicinesFromImage } from '@/app/actions/pharmacist-actions';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';

export default function PrescriptionUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isOcrComplete, setIsOcrComplete] = useState(false);
  const [extractedMedicines, setExtractedMedicines] = useState<string[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState<Medicine | null>(null);
  const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines);
  const { toast } = useToast();
  const { addUploadToHistory } = useAuth();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setIsOcrComplete(false);
      setExtractedMedicines([]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const imageDataUri = reader.result as string;
        const result = await extractMedicinesFromImage({ imageDataUri });
        setExtractedMedicines(result.medicines);
        setIsOcrComplete(true);

        const newUpload: PrescriptionUpload = {
            id: `up${Date.now()}`,
            fileName: file.name,
            uploadDate: new Date().toLocaleDateString('en-CA'),
            status: 'Completed',
            reportUrl: '#',
        };
        addUploadToHistory(newUpload);
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not read the uploaded file.',
        });
      };
    } catch (error) {
        console.error(error);
        toast({
            variant: 'destructive',
            title: 'Analysis Failed',
            description: 'Could not analyze the prescription image.',
        });
    } finally {
        setIsUploading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setFileName('');
    setIsOcrComplete(false);
    setExtractedMedicines([]);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleMedicineClick = (medicineName: string) => {
    const existingMedicine = medicines.find(m => m.name_en.toLowerCase() === medicineName.toLowerCase());
    if (existingMedicine) {
      setSelectedMedicine(medicineName);
    } else {
      const newMed: Medicine = {
        id: `med${medicines.length + 1}`,
        name_en: medicineName,
        name_hi: '',
        generic_name: '',
        uses_en: '',
        uses_hi: '',
        precautions_en: '',
        precautions_hi: '',
        side_effects_en: '',
        side_effects_hi: '',
        verified: false,
      };
      setNewMedicine(newMed);
      setIsFormOpen(true);
    }
  };

  const handleSaveNewMedicine = (medicineData: Medicine) => {
    setMedicines(prev => [...prev, medicineData]);
    setIsFormOpen(false);
    setNewMedicine(null);
    // Optionally, open the info display for the newly added medicine
    setSelectedMedicine(medicineData.name_en);
  };


  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Upload Prescription</CardTitle>
          <CardDescription>
            Upload a scanned image or photo of your prescription. We'll extract the medicine names for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 bg-secondary/50 hover:bg-secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-center">
                    {file ? (
                        <div className="flex items-center gap-2 text-foreground">
                            <FileCheck2 className="h-5 w-5 text-green-500" />
                            <span>{fileName}</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <UploadCloud className="h-5 w-5" />
                            <span>Click to select a file</span>
                        </div>
                    )}
                </div>
              </div>
              <Input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*,.pdf"
              />
              {file && (
                <Button variant="ghost" size="icon" onClick={handleClear} aria-label="Clear file">
                    <X className="h-5 w-5" />
                </Button>
              )}
            </div>
            
            <Button onClick={handleUpload} disabled={!file || isUploading}>
              {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isUploading ? 'Analyzing...' : isOcrComplete ? 'Analysis Complete' : 'Analyze Prescription'}
            </Button>
            
            {isOcrComplete && (
              <div className="pt-4">
                <h3 className="font-semibold text-lg">Extracted Medicines:</h3>
                <p className="text-sm text-muted-foreground mb-2">Click on a medicine to see details.</p>
                <div className="flex flex-wrap gap-2">
                  {extractedMedicines.map((med, index) => (
                    <Button key={index} variant="outline" onClick={() => handleMedicineClick(med)}>
                      {med}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={!!selectedMedicine} onOpenChange={() => setSelectedMedicine(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">{selectedMedicine}</DialogTitle>
          </DialogHeader>
          {selectedMedicine && <MedicineInfoDisplay medicineName={selectedMedicine} />}
        </DialogContent>
      </Dialog>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl">
          <MedicineForm
            medicine={newMedicine}
            onSave={handleSaveNewMedicine}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
