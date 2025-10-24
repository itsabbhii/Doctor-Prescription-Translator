'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function UploadHistory() {
  const { uploadHistory } = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload History</CardTitle>
        <CardDescription>
          View your past prescription uploads and download reports.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {uploadHistory.map((upload) => (
              <TableRow key={upload.id}>
                <TableCell className="font-medium">{upload.fileName}</TableCell>
                <TableCell>{upload.uploadDate}</TableCell>
                <TableCell>
                  <Badge variant={upload.status === 'Completed' ? 'default' : 'secondary'}
                    className={upload.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                  >
                    {upload.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {upload.status === 'Completed' && (
                    <Button variant="ghost" size="sm">
                      <FileDown className="mr-2 h-4 w-4" />
                      Report
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
