import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileUploader } from "./FileUploader";
import { FileAnalysis } from "./FileAnalysis";
import { TestCaseConfig } from "./TestCaseConfig";
import { TestResults } from "./TestResults";
import { LogOut, Database, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  userEmail: string;
  onLogout: () => void;
}

type WorkflowStep = "upload" | "analysis" | "configure" | "results";

interface UploadedFiles {
  mapping?: File;
  template?: File;
}

interface AnalysisData {
  totalMappings: number;
  targetTables: number;
  sourceTables: number;
  templateSections: string[];
  mappingPreview: Array<{
    sourceTable: string;
    sourceColumn: string;
    targetTable: string;
    targetColumn: string;
    transformationType: string;
  }>;
}

interface TestConfig {
  outputFormat: string;
  queryTypes: string[];
  complexity: string;
  comments: string;
}

export function Dashboard({ userEmail, onLogout }: DashboardProps) {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>("upload");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({});
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [testConfig, setTestConfig] = useState<TestConfig | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleFilesUploaded = (files: UploadedFiles) => {
    setUploadedFiles(files);
    
    if (files.mapping && files.template) {
      toast({
        title: "Files Uploaded Successfully",
        description: "Both files have been uploaded. You can now analyze them.",
      });
    }
  };

  const handleAnalysisComplete = (data: AnalysisData) => {
    setAnalysisData(data);
    setCurrentStep("configure");
    toast({
      title: "Analysis Complete",
      description: "File analysis completed. Configure your test case generation settings.",
    });
  };

  const handleConfigSubmit = async (config: TestConfig) => {
    setTestConfig(config);
    setIsGenerating(true);
    
    // Simulate test case generation
    setTimeout(() => {
      setCurrentStep("results");
      setIsGenerating(false);
      toast({
        title: "Test Cases Generated",
        description: "Your test cases have been generated successfully!",
      });
    }, 3000);
  };

  const steps = [
    { id: "upload", title: "Upload Files", completed: !!uploadedFiles.mapping && !!uploadedFiles.template },
    { id: "analysis", title: "File Analysis", completed: !!analysisData },
    { id: "configure", title: "Configure", completed: !!testConfig },
    { id: "results", title: "Results", completed: currentStep === "results" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card shadow-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Data Test Case Generator</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">Welcome, {userEmail}</span>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <Card className="mb-8 shadow-card animate-fade-in">
          <CardHeader>
            <CardTitle>Workflow Progress</CardTitle>
            <CardDescription>Follow these steps to generate your test cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      step.completed 
                        ? "bg-primary border-primary text-primary-foreground" 
                        : currentStep === step.id
                        ? "border-primary text-primary"
                        : "border-muted text-muted-foreground"
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <span className="text-sm font-medium mt-2">{step.title}</span>
                    {step.completed && (
                      <Badge variant="secondary" className="mt-1">
                        Complete
                      </Badge>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      step.completed ? "bg-primary" : "bg-muted"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="animate-fade-in">
          {currentStep === "upload" && (
            <FileUploader 
              onFilesUploaded={handleFilesUploaded}
              onAnalyze={() => setCurrentStep("analysis")}
              canAnalyze={!!uploadedFiles.mapping && !!uploadedFiles.template}
            />
          )}
          
          {currentStep === "analysis" && uploadedFiles.mapping && uploadedFiles.template && (
            <FileAnalysis 
              mappingFile={uploadedFiles.mapping}
              templateFile={uploadedFiles.template}
              onAnalysisComplete={handleAnalysisComplete}
            />
          )}
          
          {currentStep === "configure" && analysisData && (
            <TestCaseConfig 
              analysisData={analysisData}
              onSubmit={handleConfigSubmit}
              isGenerating={isGenerating}
            />
          )}
          
          {currentStep === "results" && testConfig && analysisData && (
            <TestResults 
              config={testConfig}
              analysisData={analysisData}
            />
          )}
        </div>
      </div>
    </div>
  );
}