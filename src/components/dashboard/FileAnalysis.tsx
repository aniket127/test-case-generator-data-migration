import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { FileText, Database, Target, ArrowRight, Loader2 } from "lucide-react";

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

interface FileAnalysisProps {
  mappingFile: File;
  templateFile: File;
  onAnalysisComplete: (data: AnalysisData) => void;
}

export function FileAnalysis({ mappingFile, templateFile, onAnalysisComplete }: FileAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  useEffect(() => {
    // Simulate file analysis
    const analyzeFiles = () => {
      setTimeout(() => {
        // Mock analysis data
        const mockData: AnalysisData = {
          totalMappings: 127,
          targetTables: 8,
          sourceTables: 12,
          templateSections: [
            "Test Case Overview",
            "Data Validation Rules",
            "SQL Query Templates",
            "Expected Results Format",
            "Error Handling Scenarios"
          ],
          mappingPreview: [
            {
              sourceTable: "customer_raw",
              sourceColumn: "cust_id",
              targetTable: "dim_customer", 
              targetColumn: "customer_key",
              transformationType: "Direct"
            },
            {
              sourceTable: "customer_raw",
              sourceColumn: "first_name",
              targetTable: "dim_customer",
              targetColumn: "customer_name",
              transformationType: "Transformed"
            },
            {
              sourceTable: "orders_staging",
              sourceColumn: "order_date",
              targetTable: "fact_sales",
              targetColumn: "order_date_key",
              transformationType: "Transformed"
            },
            {
              sourceTable: "product_master",
              sourceColumn: "product_id",
              targetTable: "dim_product",
              targetColumn: "product_key",
              transformationType: "Direct"
            },
            {
              sourceTable: "sales_transactions",
              sourceColumn: "amount",
              targetTable: "fact_sales",
              targetColumn: "sales_amount",
              transformationType: "Direct"
            }
          ]
        };

        setAnalysisData(mockData);
        setIsAnalyzing(false);
      }, 2500);
    };

    analyzeFiles();
  }, [mappingFile, templateFile]);

  const handleContinue = () => {
    if (analysisData) {
      onAnalysisComplete(analysisData);
    }
  };

  if (isAnalyzing) {
    return (
      <Card className="shadow-card animate-scale-in">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span>Analyzing Files</span>
          </CardTitle>
          <CardDescription>
            Processing your mapping and template files...
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
              <Database className="w-8 h-8 text-primary-foreground animate-pulse" />
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground">Extracting mapping relationships...</p>
              <p className="text-muted-foreground">Analyzing template structure...</p>
              <p className="text-muted-foreground">Generating analysis report...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysisData) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">File Analysis Results</h2>
        <p className="text-muted-foreground">
          Review the extracted information from your uploaded files
        </p>
      </div>

      {/* Analysis Summary */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{analysisData.totalMappings}</p>
                <p className="text-muted-foreground text-sm">Total Mappings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{analysisData.sourceTables}</p>
                <p className="text-muted-foreground text-sm">Source Tables</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{analysisData.targetTables}</p>
                <p className="text-muted-foreground text-sm">Target Tables</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{analysisData.templateSections.length}</p>
                <p className="text-muted-foreground text-sm">Template Sections</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Template Structure */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Template Structure</CardTitle>
          <CardDescription>
            Sections identified in your test case template
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {analysisData.templateSections.map((section, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {section}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mapping Preview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Mapping Preview</CardTitle>
          <CardDescription>
            Sample of source-to-target column mappings (showing first 5 rows)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source Table</TableHead>
                  <TableHead>Source Column</TableHead>
                  <TableHead className="text-center">→</TableHead>
                  <TableHead>Target Table</TableHead>
                  <TableHead>Target Column</TableHead>
                  <TableHead>Transformation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analysisData.mappingPreview.map((mapping, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{mapping.sourceTable}</TableCell>
                    <TableCell>{mapping.sourceColumn}</TableCell>
                    <TableCell className="text-center">
                      <ArrowRight className="w-4 h-4 text-muted-foreground mx-auto" />
                    </TableCell>
                    <TableCell className="font-medium">{mapping.targetTable}</TableCell>
                    <TableCell>{mapping.targetColumn}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={mapping.transformationType === "Direct" ? "secondary" : "outline"}
                      >
                        {mapping.transformationType}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Continue Button */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div>
              <h3 className="font-semibold text-foreground">Analysis Complete</h3>
              <p className="text-muted-foreground">
                Your files have been successfully analyzed. Ready to configure test case generation.
              </p>
            </div>
            <Button onClick={handleContinue} size="lg" className="w-full md:w-auto">
              Continue to Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}