import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, CheckCircle, AlertCircle, X, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploaderProps {
  onFilesUploaded: (files: { mapping?: File; template?: File }) => void;
  onAnalyze: () => void;
  onClearFiles: () => void;
  canAnalyze: boolean;
  uploadedFiles: { mapping?: File; template?: File };
}

export function FileUploader({ onFilesUploaded, onAnalyze, onClearFiles, canAnalyze, uploadedFiles }: FileUploaderProps) {
  const [mappingFile, setMappingFile] = useState<File | null>(uploadedFiles.mapping || null);
  const [templateFile, setTemplateFile] = useState<File | null>(uploadedFiles.template || null);
  const mappingInputRef = useRef<HTMLInputElement>(null);
  const templateInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (type: 'mapping' | 'template', file: File | null) => {
    if (!file) return;
    
    // Validate file type
    const allowedTypes = ['.xlsx', '.xls', '.csv', '.txt'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload Excel, CSV, or Text files only.",
        variant: "destructive"
      });
      return;
    }

    if (type === 'mapping') {
      setMappingFile(file);
      onFilesUploaded({ mapping: file, template: templateFile || undefined });
    } else {
      setTemplateFile(file);
      onFilesUploaded({ mapping: mappingFile || undefined, template: file });
    }

    toast({
      title: "File Uploaded",
      description: `${type === 'mapping' ? 'Mapping' : 'Template'} file uploaded successfully.`,
    });
  };

  const handleClearFile = (type: 'mapping' | 'template') => {
    if (type === 'mapping') {
      setMappingFile(null);
      onFilesUploaded({ mapping: undefined, template: templateFile || undefined });
      if (mappingInputRef.current) {
        mappingInputRef.current.value = '';
      }
    } else {
      setTemplateFile(null);
      onFilesUploaded({ mapping: mappingFile || undefined, template: undefined });
      if (templateInputRef.current) {
        templateInputRef.current.value = '';
      }
    }

    toast({
      title: "File Removed",
      description: `${type === 'mapping' ? 'Mapping' : 'Template'} file has been removed.`,
    });
  };

  const FileUploadCard = ({
    title, 
    description, 
    file, 
    onFileSelect, 
    inputRef,
    type 
  }: {
    title: string;
    description: string;
    file: File | null;
    onFileSelect: (file: File | null) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    type: 'mapping' | 'template';
  }) => (
    <Card className="relative shadow-card hover:shadow-elegant transition-shadow cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            {file && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearFile(type);
                  }}
                  className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
                <CheckCircle className="w-5 h-5 text-success" />
              </>
            )}
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            file 
              ? "border-success bg-success/5" 
              : "border-muted-foreground/25 hover:border-primary bg-muted/20 group-hover:bg-accent/50"
          }`}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.xls,.csv,.txt"
            onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
            className="hidden"
          />
          
          <div className="space-y-3">
            <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
              file ? "bg-success/20" : "bg-muted/50 group-hover:bg-primary/20"
            }`}>
              {file ? (
                <CheckCircle className="w-6 h-6 text-success" />
              ) : (
                <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
              )}
            </div>
            
            {file ? (
              <div>
                <p className="font-medium text-success">File uploaded successfully</p>
                <p className="text-sm text-muted-foreground mt-1">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            ) : (
              <div>
                <p className="font-medium text-foreground group-hover:text-primary">
                  Click to upload file
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports Excel, CSV, and Text files
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Upload Your Files</h2>
        <p className="text-muted-foreground">
          Upload your source-to-target mapping and test case template files to get started
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FileUploadCard
          title="Source-to-Target Mapping"
          description="Upload your data mapping file containing source and target column relationships"
          file={mappingFile}
          onFileSelect={(file) => handleFileUpload('mapping', file)}
          inputRef={mappingInputRef}
          type="mapping"
        />
        
        <FileUploadCard
          title="Test Case Template"
          description="Upload your test case template file that defines the structure for generated tests"
          file={templateFile}
          onFileSelect={(file) => handleFileUpload('template', file)}
          inputRef={templateInputRef}
          type="template"
        />
      </div>

      {(mappingFile || templateFile) && (
        <Card className="shadow-card animate-fade-in">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Upload Status</h3>
                <div className="flex items-center space-x-2">
                  {canAnalyze ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-warning" />
                  )}
                  <span className={canAnalyze ? "text-success" : "text-warning"}>
                    {canAnalyze ? "Ready to analyze" : "Upload both files to continue"}
                  </span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span>Mapping File:</span>
                  <span className={mappingFile ? "text-success font-medium" : "text-muted-foreground"}>
                    {mappingFile ? "✓ Uploaded" : "Not uploaded"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span>Template File:</span>
                  <span className={templateFile ? "text-success font-medium" : "text-muted-foreground"}>
                    {templateFile ? "✓ Uploaded" : "Not uploaded"}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={onAnalyze} 
                  disabled={!canAnalyze}
                  className="flex-1"
                  size="lg"
                >
                  Analyze Files
                </Button>
                <Button 
                  onClick={onClearFiles}
                  disabled={!mappingFile && !templateFile}
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
                >
                  <RotateCcw className="w-4 h-4" />
                  Clear All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}