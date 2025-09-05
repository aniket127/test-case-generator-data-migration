import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings, FileType, Code, MessageSquare, Loader2 } from "lucide-react";

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

interface TestCaseConfigProps {
  analysisData: AnalysisData;
  onSubmit: (config: TestConfig) => void;
  isGenerating: boolean;
}

export function TestCaseConfig({ analysisData, onSubmit, isGenerating }: TestCaseConfigProps) {
  const [config, setConfig] = useState<TestConfig>({
    outputFormat: "",
    queryTypes: [],
    complexity: "",
    comments: ""
  });

  const outputFormats = [
    { value: "excel", label: "Excel Workbook (.xlsx)" },
    { value: "word", label: "Word Document (.docx)" },
    { value: "csv", label: "CSV File (.csv)" },
    { value: "text", label: "Text File (.txt)" }
  ];

  const queryTypes = [
    { id: "count", label: "Count Validation", description: "Row count comparisons between source and target" },
    { id: "mapping", label: "Column Mapping", description: "Field-level data validation" },
    { id: "quality", label: "Data Quality", description: "Data integrity and quality checks" },
    { id: "business", label: "Business Rule", description: "Custom business logic validation" },
    { id: "null", label: "Null Validation", description: "Null value and completeness checks" }
  ];

  const complexityLevels = [
    { value: "basic", label: "Basic Queries", description: "Simple SELECT statements" },
    { value: "intermediate", label: "Intermediate", description: "JOINs and aggregations" },
    { value: "advanced", label: "Advanced", description: "Complex queries with CTEs and window functions" }
  ];

  const commentOptions = [
    { value: "detailed", label: "Detailed Comments", description: "Comprehensive explanations" },
    { value: "basic", label: "Basic Comments", description: "Essential comments only" },
    { value: "none", label: "No Comments", description: "Clean code without comments" }
  ];

  const handleQueryTypeToggle = (queryType: string) => {
    setConfig(prev => ({
      ...prev,
      queryTypes: prev.queryTypes.includes(queryType)
        ? prev.queryTypes.filter(t => t !== queryType)
        : [...prev.queryTypes, queryType]
    }));
  };

  const handleSubmit = () => {
    if (config.outputFormat && config.queryTypes.length > 0 && config.complexity && config.comments) {
      onSubmit(config);
    }
  };

  const isFormValid = config.outputFormat && config.queryTypes.length > 0 && config.complexity && config.comments;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Configure Test Case Generation</h2>
        <p className="text-muted-foreground">
          Customize the output format and test case types for your specific needs
        </p>
      </div>

      {/* Analysis Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Analysis Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{analysisData.totalMappings}</p>
              <p className="text-sm text-muted-foreground">Mappings to Process</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-info">{analysisData.sourceTables}</p>
              <p className="text-sm text-muted-foreground">Source Tables</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">{analysisData.targetTables}</p>
              <p className="text-sm text-muted-foreground">Target Tables</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">{analysisData.templateSections.length}</p>
              <p className="text-sm text-muted-foreground">Template Sections</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Output Format */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileType className="w-5 h-5" />
              <span>Output Format</span>
            </CardTitle>
            <CardDescription>
              Choose the format for your generated test cases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="output-format">File Format</Label>
              <Select value={config.outputFormat} onValueChange={(value) => 
                setConfig(prev => ({ ...prev, outputFormat: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select output format" />
                </SelectTrigger>
                <SelectContent>
                  {outputFormats.map(format => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Query Complexity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="w-5 h-5" />
              <span>Query Complexity</span>
            </CardTitle>
            <CardDescription>
              Set the complexity level for generated SQL queries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {complexityLevels.map(level => (
                <div key={level.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={level.value}
                    name="complexity"
                    value={level.value}
                    checked={config.complexity === level.value}
                    onChange={(e) => setConfig(prev => ({ ...prev, complexity: e.target.value }))}
                    className="w-4 h-4 text-primary"
                  />
                  <label htmlFor={level.value} className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">{level.label}</p>
                      <p className="text-sm text-muted-foreground">{level.description}</p>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SQL Query Types */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>SQL Query Types</CardTitle>
          <CardDescription>
            Select the types of test cases you want to generate (select multiple)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {queryTypes.map(queryType => (
              <div 
                key={queryType.id} 
                className={`flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  config.queryTypes.includes(queryType.id)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => handleQueryTypeToggle(queryType.id)}
              >
                <Checkbox
                  id={queryType.id}
                  checked={config.queryTypes.includes(queryType.id)}
                  onChange={() => handleQueryTypeToggle(queryType.id)}
                />
                <div className="flex-1">
                  <Label htmlFor={queryType.id} className="font-medium cursor-pointer">
                    {queryType.label}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {queryType.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comments Configuration */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Code Comments</span>
          </CardTitle>
          <CardDescription>
            Choose the level of comments to include in generated queries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {commentOptions.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={option.value}
                  name="comments"
                  value={option.value}
                  checked={config.comments === option.value}
                  onChange={(e) => setConfig(prev => ({ ...prev, comments: e.target.value }))}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor={option.value} className="flex-1 cursor-pointer">
                  <div>
                    <p className="font-medium">{option.label}</p>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuration Preview */}
      {isFormValid && (
        <Card className="shadow-card animate-scale-in">
          <CardHeader>
            <CardTitle>Configuration Preview</CardTitle>
            <CardDescription>Review your selected configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Output Format:</span>
                <Badge variant="secondary">
                  {outputFormats.find(f => f.value === config.outputFormat)?.label}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Complexity:</span>
                <Badge variant="secondary">
                  {complexityLevels.find(l => l.value === config.complexity)?.label}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Comments:</span>
                <Badge variant="secondary">
                  {commentOptions.find(o => o.value === config.comments)?.label}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Query Types:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {config.queryTypes.map(type => (
                    <Badge key={type} variant="outline">
                      {queryTypes.find(q => q.id === type)?.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generate Button */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Button 
              onClick={handleSubmit}
              disabled={!isFormValid || isGenerating}
              size="lg"
              className="w-full md:w-auto min-w-[200px]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Test Cases...
                </>
              ) : (
                "Generate Test Cases"
              )}
            </Button>
            {!isFormValid && (
              <p className="text-muted-foreground text-sm">
                Please complete all configuration options to continue
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}