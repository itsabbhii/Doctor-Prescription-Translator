'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '../ui/sheet';
import { Sparkles, Lightbulb, Check, Loader2, AlertTriangle } from 'lucide-react';
import { fetchAiSuggestions } from '@/app/actions/pharmacist-actions';
import { PharmacistAISuggestionInput, PharmacistAISuggestionOutput } from '@/ai/flows/pharmacist-ai-suggestion-tool';
import { ScrollArea } from '../ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { useToast } from '@/hooks/use-toast';

interface AiSuggestionToolProps {
  getFormData: () => PharmacistAISuggestionInput;
  onApplySuggestion: (field: string, suggestion: string) => void;
}

export default function AiSuggestionTool({ getFormData, onApplySuggestion }: AiSuggestionToolProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PharmacistAISuggestionOutput | null>(null);
  const { toast } = useToast();

  const handleFetchSuggestions = async () => {
    setIsLoading(true);
    setResult(null);
    try {
      const formData = getFormData();
      const suggestions = await fetchAiSuggestions(formData);
      setResult(suggestions);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch AI suggestions.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openSheetAndFetch = () => {
    setIsOpen(true);
    handleFetchSuggestions();
  };

  const fieldLabels: Record<string, string> = {
    name_hi: "Name (Hindi)",
    uses_hi: "Uses (Hindi)",
    precautions_hi: "Precautions (Hindi)",
    side_effects_hi: "Side Effects (Hindi)",
  };

  return (
    <>
      <Button type="button" variant="outline" onClick={openSheetAndFetch}>
        <Sparkles className="mr-2 h-4 w-4 text-primary" />
        AI Suggestions
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="sm:max-w-lg w-full">
          <SheetHeader>
            <SheetTitle className="font-headline flex items-center gap-2">
              <Sparkles className="text-primary" /> AI Smart Suggestions
            </SheetTitle>
            <SheetDescription>
              Review and apply AI-powered suggestions to improve the medicine details.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-150px)]">
            <div className="py-4 pr-6">
                {isLoading && (
                    <div className="flex justify-center items-center h-48">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}
                {result && (
                    <div className="space-y-4">
                        {result.flaggedAsPotentiallyErroneous && (
                            <Card className="border-destructive bg-destructive/10">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-destructive">
                                        <AlertTriangle /> Potentially Erroneous Info
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm">{result.flagReason}</p>
                                </CardContent>
                            </Card>
                        )}
                        {result.suggestions.length > 0 ? (
                            result.suggestions.map((item, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-base justify-between">
                                            <span>{fieldLabels[item.field] || item.field}</span>
                                            <Badge variant="outline">Confidence: {(item.confidence * 100).toFixed(0)}%</Badge>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <p className="text-sm p-3 bg-secondary rounded-md">{item.suggestion}</p>
                                        <Button size="sm" onClick={() => onApplySuggestion(item.field, item.suggestion)}>
                                            <Check className="mr-2 h-4 w-4"/>
                                            Apply Suggestion
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="text-center text-muted-foreground p-8">
                                <Lightbulb className="mx-auto h-10 w-10 mb-2"/>
                                <p>No specific suggestions. Everything looks good!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
          </ScrollArea>
          <SheetFooter className="border-t pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
