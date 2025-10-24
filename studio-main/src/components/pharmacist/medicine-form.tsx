'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Medicine } from '@/lib/types';
import { DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import AiSuggestionTool from './ai-suggestion-tool';
import { PharmacistAISuggestionInput } from '@/ai/flows/pharmacist-ai-suggestion-tool';

interface MedicineFormProps {
  medicine: Medicine | null;
  onSave: (data: Medicine) => void;
  onCancel: () => void;
}

const formSchema = z.object({
  name_en: z.string().min(1, 'English name is required.'),
  name_hi: z.string().min(1, 'Hindi name is required.'),
  generic_name: z.string().min(1, 'Generic name is required.'),
  uses_en: z.string().min(1, 'English uses are required.'),
  uses_hi: z.string().min(1, 'Hindi uses are required.'),
  precautions_en: z.string().min(1, 'English precautions are required.'),
  precautions_hi: z.string().min(1, 'Hindi precautions are required.'),
  side_effects_en: z.string().min(1, 'English side effects are required.'),
  side_effects_hi: z.string().min(1, 'Hindi side effects are required.'),
});

export default function MedicineForm({ medicine, onSave, onCancel }: MedicineFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: medicine || {
      name_en: '',
      name_hi: '',
      generic_name: '',
      uses_en: '',
      uses_hi: '',
      precautions_en: '',
      precautions_hi: '',
      side_effects_en: '',
      side_effects_hi: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave({
      ...values,
      id: medicine?.id || '',
      verified: medicine?.verified || false,
    });
  }

  const getFormData = (): PharmacistAISuggestionInput => {
    return form.getValues();
  };


  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-headline">
          {medicine ? 'Edit Medicine' : 'Add New Medicine'}
        </DialogTitle>
        <DialogDescription>
          Fill in the details for the medicine. Use the AI tool for suggestions.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <ScrollArea className="h-[60vh] pr-6">
            <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name_en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (English)</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name_hi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (Hindi)</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="generic_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Generic Name</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="uses_en" render={({ field }) => (
                <FormItem><FormLabel>Uses (English)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="uses_hi" render={({ field }) => (
                <FormItem><FormLabel>Uses (Hindi)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="precautions_en" render={({ field }) => (
                <FormItem><FormLabel>Precautions (English)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="precautions_hi" render={({ field }) => (
                <FormItem><FormLabel>Precautions (Hindi)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="side_effects_en" render={({ field }) => (
                <FormItem><FormLabel>Side Effects (English)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="side_effects_hi" render={({ field }) => (
                <FormItem><FormLabel>Side Effects (Hindi)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            </div>
          </ScrollArea>
          <div className="flex justify-between items-center pt-4 border-t">
            <AiSuggestionTool getFormData={getFormData} onApplySuggestion={(field, suggestion) => form.setValue(field as any, suggestion)} />
            <div className="space-x-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
                </Button>
                <Button type="submit">Save</Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
