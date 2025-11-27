import { useState, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useProgressBackup } from '@/hooks/useProgressBackup';
import { ProgressBackup as ProgressBackupType } from '@/types/progressTypes';
import { toast } from '@/hooks/use-toast';
import { 
  Download, 
  Upload, 
  FileJson, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  Shield,
  Info
} from 'lucide-react';

export default function ProgressBackup() {
  const { downloadBackup, validateBackup, restoreProgress, getBackupSummary } = useProgressBackup();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    error?: string;
    backup?: ProgressBackupType;
    summary?: string[];
  } | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setValidationResult(null);

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      const result = validateBackup(data);
      
      if (result.valid && result.backup) {
        const summary = getBackupSummary(result.backup);
        setValidationResult({ ...result, summary });
      } else {
        setValidationResult(result);
      }
    } catch (error) {
      setValidationResult({
        valid: false,
        error: 'This file does not appear to be a valid JSON file. Please select a CIP Readiness progress backup file.',
      });
    }
  };

  const handleRestore = async () => {
    if (!validationResult?.backup) return;

    setIsRestoring(true);
    
    const success = restoreProgress(validationResult.backup);
    
    setTimeout(() => {
      setIsRestoring(false);
      if (success) {
        toast({
          title: 'Progress Restored',
          description: 'Your training progress has been restored. Refreshing your dashboards now.',
        });
        // Refresh the page to reload all state
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast({
          title: 'Restore Failed',
          description: 'There was an error restoring your progress. Please try again.',
          variant: 'destructive',
        });
      }
    }, 500);
  };

  const clearFileSelection = () => {
    setSelectedFile(null);
    setValidationResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Progress Backup
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Export your CIP Readiness Academy training progress to back it up or transfer to another device. 
                Import a previous backup to restore your progress.
              </p>
            </div>

            <div className="grid gap-6">
              {/* Export Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    Export Progress
                  </CardTitle>
                  <CardDescription>
                    Download your current training progress including completed modules, tasks, missions, badges, and role selections.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <Button onClick={downloadBackup} size="lg" className="gap-2">
                      <FileJson className="h-5 w-5" />
                      Download My Training Progress
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Saves as a JSON file you can keep or share
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Import Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    Import Progress
                  </CardTitle>
                  <CardDescription>
                    Restore your training progress from a previously exported backup file.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="backup-file-input"
                      />
                      <Button
                        variant="outline"
                        size="lg"
                        className="gap-2"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-5 w-5" />
                        Upload Progress Backup (.json)
                      </Button>
                      {selectedFile && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {selectedFile.name}
                          </span>
                          <Button variant="ghost" size="sm" onClick={clearFileSelection}>
                            Clear
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Validation Result */}
                    {validationResult && (
                      <div className="space-y-4">
                        {validationResult.valid ? (
                          <>
                            <Alert className="border-success/50 bg-success/5">
                              <CheckCircle2 className="h-4 w-4 text-success" />
                              <AlertTitle>Valid Backup File</AlertTitle>
                              <AlertDescription>
                                This backup file is ready to restore.
                              </AlertDescription>
                            </Alert>

                            {validationResult.summary && validationResult.summary.length > 0 && (
                              <div className="bg-muted/50 rounded-lg p-4">
                                <h4 className="font-medium text-navy mb-2">Backup Contents:</h4>
                                <ul className="space-y-1">
                                  {validationResult.summary.map((item, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                      <CheckCircle2 className="h-3 w-3 text-success" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <Alert>
                              <Info className="h-4 w-4" />
                              <AlertTitle>Important</AlertTitle>
                              <AlertDescription>
                                Restoring will overwrite your current progress. Make sure to export your 
                                current progress first if you want to keep it.
                              </AlertDescription>
                            </Alert>

                            <Button 
                              onClick={handleRestore} 
                              size="lg"
                              className="gap-2"
                              disabled={isRestoring}
                            >
                              {isRestoring ? (
                                <>
                                  <RefreshCw className="h-5 w-5 animate-spin" />
                                  Restoring...
                                </>
                              ) : (
                                <>
                                  <RefreshCw className="h-5 w-5" />
                                  Restore This Progress
                                </>
                              )}
                            </Button>
                          </>
                        ) : (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Invalid Backup File</AlertTitle>
                            <AlertDescription>
                              {validationResult.error}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Info Section */}
              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>
                        <strong>What's included in the backup:</strong> Your selected role, completed modules, 
                        phase tasks, missions, earned badges, final exam status, and onboarding preferences.
                      </p>
                      <p>
                        <strong>Privacy:</strong> All data is stored locally in your browser. Backups are 
                        standard JSON files that you control. No data is sent to any server.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
