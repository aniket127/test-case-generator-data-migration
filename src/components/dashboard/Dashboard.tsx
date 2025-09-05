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
  const [currentStep, setCurrentStep] = useState<WorkflowStep>("upload"); // Actual progression
  const [viewedStep, setViewedStep] = useState<WorkflowStep>("upload"); // Currently viewed step
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

  const handleClearFiles = () => {
    setUploadedFiles({});
    setAnalysisData(null);
    setTestConfig(null);
    setCurrentStep("upload");
    toast({
      title: "Files Cleared",
      description: "All files have been cleared. You can upload new files now.",
    });
  };

  const handleStepClick = (stepId: WorkflowStep) => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const currentStepIndex = steps.findIndex(s => s.id === currentStep);
    
    // Always allow viewing any step
    setViewedStep(stepId);
    
    // Only allow actual progression to completed steps or the next available step
    if (stepIndex <= currentStepIndex || steps[stepIndex - 1]?.completed) {
      setCurrentStep(stepId);
    }
  };

  const handleAnalysisComplete = (data: AnalysisData) => {
    setAnalysisData(data);
    setCurrentStep("configure");
    setViewedStep("configure");
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
      setViewedStep("results");
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
              {steps.map((step, index) => {
                const canProgress = step.completed || currentStep === step.id || 
                  (index > 0 && steps[index - 1]?.completed);
                const isViewed = viewedStep === step.id;
                const isActive = currentStep === step.id;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => handleStepClick(step.id as WorkflowStep)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 cursor-pointer ${
                          step.completed 
                            ? "bg-primary border-primary text-primary-foreground hover:bg-primary/90" 
                            : isActive
                            ? "border-primary text-primary bg-primary/10"
                            : isViewed
                            ? "border-primary/60 text-primary/70 bg-primary/5"
                            : "border-muted-foreground/50 text-muted-foreground hover:border-primary hover:text-primary"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </button>
                      <span className={`text-sm font-medium mt-2 ${
                        step.completed || isActive ? "text-foreground" : 
                        isViewed ? "text-foreground/70" : "text-muted-foreground"
                      }`}>
                        {step.title}
                      </span>
                      <div className="flex flex-col items-center gap-1">
                        {step.completed && (
                          <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                            Complete
                          </Badge>
                        )}
                        {isViewed && !canProgress && !step.completed && (
                          <Badge variant="outline" className="text-xs bg-muted/50 text-muted-foreground">
                            Preview
                          </Badge>
                        )}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-4 transition-colors ${
                        step.completed ? "bg-primary" : "bg-muted"
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="animate-fade-in">
          {viewedStep === "upload" && (
            <FileUploader 
              onFilesUploaded={handleFilesUploaded}
              onAnalyze={() => {
                setCurrentStep("analysis");
                setViewedStep("analysis");
              }}
              onClearFiles={handleClearFiles}
              canAnalyze={!!uploadedFiles.mapping && !!uploadedFiles.template}
              uploadedFiles={uploadedFiles}
            />
          )}
          
          {viewedStep === "analysis" && (
            <div className={currentStep !== "analysis" && !steps.find(s => s.id === "analysis")?.completed ? "opacity-60 pointer-events-none" : ""}>
              {(!uploadedFiles.mapping || !uploadedFiles.template) && currentStep !== "analysis" ? (
                <Card className="p-8 text-center">
                  <CardContent>
                    <p className="text-muted-foreground">Upload files in Step 1 to view analysis</p>
                  </CardContent>
                </Card>
              ) : (
                <FileAnalysis 
                  mappingFile={uploadedFiles.mapping!}
                  templateFile={uploadedFiles.template!}
                  onAnalysisComplete={handleAnalysisComplete}
                />
              )}
            </div>
          )}
          
          {viewedStep === "configure" && (
            <div className={currentStep !== "configure" && !steps.find(s => s.id === "configure")?.completed ? "opacity-60 pointer-events-none" : ""}>
              {!analysisData && currentStep !== "configure" ? (
                <Card className="p-8 text-center">
                  <CardContent>
                    <p className="text-muted-foreground">Complete analysis in Step 2 to configure test cases</p>
                  </CardContent>
                </Card>
              ) : (
                <TestCaseConfig 
                  analysisData={analysisData!}
                  onSubmit={handleConfigSubmit}
                  isGenerating={isGenerating}
                />
              )}
            </div>
          )}
          
          {viewedStep === "results" && (
            <div className={currentStep !== "results" && !steps.find(s => s.id === "results")?.completed ? "opacity-60 pointer-events-none" : ""}>
              {(!testConfig || !analysisData) && currentStep !== "results" ? (
                <Card className="p-8 text-center">
                  <CardContent>
                    <p className="text-muted-foreground">Complete configuration in Step 3 to view results</p>
                  </CardContent>
                </Card>
              ) : (
                <TestResults 
                  config={testConfig!}
                  analysisData={analysisData!}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}