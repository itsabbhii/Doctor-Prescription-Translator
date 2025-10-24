'use client';

import { useState } from 'react';
import { mockMedicines } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileDown, Info, Pill, Languages, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface MedicineInfoDisplayProps {
  medicineName: string;
}

const InfoSection = ({ title, content, icon: Icon }: { title: string; content: string | null; icon: React.ElementType }) => {
    if (!content) return null;
    return (
        <div>
            <h3 className="flex items-center gap-2 font-semibold mb-1">
            <Icon className="h-4 w-4 text-primary" />
            {title}
            </h3>
            <p className="pl-6 text-muted-foreground">{content}</p>
        </div>
    )
};

export default function MedicineInfoDisplay({ medicineName }: MedicineInfoDisplayProps) {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  
  const medicine = mockMedicines.find(m => m.name_en.toLowerCase() === medicineName.toLowerCase());

  if (!medicine) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Medicine Not Found</AlertTitle>
        <AlertDescription>
          Details for "{medicineName}" are not available in our database. You can add the details for our pharmacists to review.
        </AlertDescription>
      </Alert>
    );
  }

  const handlePrint = () => {
    // A more robust solution would generate a PDF on the server
    // or use a library like jspdf with html2canvas.
    // window.print() is a simple, effective client-side solution.
    window.print();
  };

  const currentLang = language;
  const showHindi = currentLang === 'hi';

  const details = {
    genericName: medicine.generic_name,
    uses: showHindi ? medicine.uses_hi : medicine.uses_en,
    precautions: showHindi ? medicine.precautions_hi : medicine.precautions_en,
    sideEffects: showHindi ? medicine.side_effects_hi : medicine.side_effects_en,
  };

  return (
    <div className="space-y-6">
      <div id="printable-content" className="printable-content space-y-4">
        <div className="flex items-center justify-between no-print">
            <div className="flex items-center space-x-2">
                <Languages className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="language-switch">English</Label>
                <Switch
                    id="language-switch"
                    checked={showHindi}
                    onCheckedChange={(checked) => setLanguage(checked ? 'hi' : 'en')}
                    aria-label="Toggle language to Hindi"
                />
                <Label htmlFor="language-switch">हिंदी</Label>
            </div>
            <Button variant="outline" size="sm" onClick={handlePrint}>
                <FileDown className="mr-2 h-4 w-4" />
                Download PDF
            </Button>
        </div>

        {!medicine.verified && (
            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Not Verified</AlertTitle>
                <AlertDescription>
                These details have been added by a user and are awaiting verification by a pharmacist.
                </AlertDescription>
            </Alert>
        )}
        
        <h2 className="font-headline text-3xl font-bold print-only text-black" style={{display: 'none'}}>{medicineName}</h2>

        <div className="grid gap-4 rounded-lg border p-4">
            <InfoSection title={showHindi ? 'जेनेरिक नाम' : 'Generic Name'} content={details.genericName} icon={Pill} />
            <InfoSection title={showHindi ? 'उपयोग' : 'Uses'} content={details.uses} icon={Info} />
            <InfoSection title={showHindi ? 'सावधानियां' : 'Precautions'} content={details.precautions} icon={ShieldAlert} />
            <InfoSection title={showHindi ? 'दुष्प्रभाव' : 'Side Effects'} content={details.sideEffects} icon={AlertTriangle} />
        </div>
      </div>
    </div>
  );
}
