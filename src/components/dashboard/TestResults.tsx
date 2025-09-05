import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, Check, Code, Eye, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TestConfig {
  outputFormat: string;
  queryTypes: string[];
  complexity: string;
  comments: string;
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

interface TestResultsProps {
  config: TestConfig;
  analysisData: AnalysisData;
}

export function TestResults({ config, analysisData }: TestResultsProps) {
  const [downloadingAll, setDownloadingAll] = useState(false);
  const { toast } = useToast();

  // Mock generated test cases
  const testCases = [
    {
      id: "count-validation-001",
      name: "Count Validation - Customer Data",
      type: "Count Validation",
      description: "Validates row counts between source customer_raw and target dim_customer tables",
      sql: `-- Count Validation Test Case
-- Purpose: Verify row count consistency between source and target
-- Expected: Source and target counts should match within tolerance

SELECT 
    'customer_raw' as source_table,
    COUNT(*) as source_count,
    (SELECT COUNT(*) FROM dim_customer) as target_count,
    CASE 
        WHEN COUNT(*) = (SELECT COUNT(*) FROM dim_customer) 
        THEN 'PASS' 
        ELSE 'FAIL' 
    END as test_result
FROM customer_raw;`
    },
    {
      id: "column-mapping-001",
      name: "Column Mapping - Customer Name Transform",
      type: "Column Mapping",
      description: "Validates customer name transformation from first_name to customer_name",
      sql: `-- Column Mapping Test Case
-- Purpose: Verify customer name transformation logic
-- Expected: All non-null source names should have corresponding target values

SELECT 
    cr.cust_id,
    cr.first_name as source_value,
    dc.customer_name as target_value,
    CASE 
        WHEN cr.first_name IS NOT NULL AND dc.customer_name IS NOT NULL 
        THEN 'PASS' 
        ELSE 'FAIL' 
    END as test_result
FROM customer_raw cr
LEFT JOIN dim_customer dc ON cr.cust_id = dc.customer_key
WHERE cr.first_name IS NOT NULL;`
    },
    {
      id: "data-quality-001",
      name: "Data Quality - Null Value Check",
      type: "Data Quality",
      description: "Checks for unexpected null values in critical fields",
      sql: `-- Data Quality Test Case
-- Purpose: Identify null values in critical target fields
-- Expected: No null values in primary key and required fields

SELECT 
    'dim_customer' as table_name,
    'customer_key' as column_name,
    COUNT(*) as total_rows,
    COUNT(customer_key) as non_null_count,
    COUNT(*) - COUNT(customer_key) as null_count,
    CASE 
        WHEN COUNT(*) - COUNT(customer_key) = 0 
        THEN 'PASS' 
        ELSE 'FAIL' 
    END as test_result
FROM dim_customer;`
    },
    {
      id: "business-rule-001",
      name: "Business Rule - Sales Amount Validation",
      type: "Business Rule",
      description: "Validates sales amount business rules and constraints",
      sql: `-- Business Rule Test Case
-- Purpose: Validate sales amount constraints
-- Expected: All sales amounts should be positive and within expected range

SELECT 
    COUNT(*) as total_sales,
    COUNT(CASE WHEN sales_amount > 0 THEN 1 END) as positive_amounts,
    COUNT(CASE WHEN sales_amount > 1000000 THEN 1 END) as high_value_sales,
    CASE 
        WHEN COUNT(CASE WHEN sales_amount <= 0 THEN 1 END) = 0 
        THEN 'PASS' 
        ELSE 'FAIL' 
    END as test_result
FROM fact_sales
WHERE order_date_key >= '2024-01-01';`
    }
  ];

  const handleDownloadIndividual = (testCase: typeof testCases[0]) => {
    // Mock download functionality
    toast({
      title: "Download Started",
      description: `Downloading ${testCase.name}...`,
    });
    
    // In a real app, this would trigger actual file download
    const element = document.createElement("a");
    const file = new Blob([testCase.sql], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${testCase.id}.sql`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadAll = async () => {
    setDownloadingAll(true);
    
    // Simulate zip creation
    setTimeout(() => {
      toast({
        title: "All Files Downloaded",
        description: "All test cases have been packaged and downloaded.",
      });
      setDownloadingAll(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Check className="w-8 h-8 text-success" />
          <h2 className="text-3xl font-bold text-foreground">Test Cases Generated Successfully</h2>
        </div>
        <p className="text-muted-foreground">
          Your test cases are ready for download and implementation
        </p>
      </div>

      {/* Generation Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Generation Summary</CardTitle>
          <CardDescription>Overview of your generated test cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-subtle rounded-lg">
              <p className="text-2xl font-bold text-success">{testCases.length}</p>
              <p className="text-sm text-muted-foreground">Test Cases Generated</p>
            </div>
            <div className="text-center p-4 bg-gradient-subtle rounded-lg">
              <p className="text-2xl font-bold text-primary">{analysisData.totalMappings}</p>
              <p className="text-sm text-muted-foreground">Mappings Processed</p>
            </div>
            <div className="text-center p-4 bg-gradient-subtle rounded-lg">
              <p className="text-2xl font-bold text-info">{config.queryTypes.length}</p>
              <p className="text-sm text-muted-foreground">Query Types Used</p>
            </div>
            <div className="text-center p-4 bg-gradient-subtle rounded-lg">
              <p className="text-2xl font-bold text-warning">
                {config.outputFormat.toUpperCase()}
              </p>
              <p className="text-sm text-muted-foreground">Output Format</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Download Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Download Options</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleDownloadAll}
              disabled={downloadingAll}
              className="flex-1"
              size="lg"
            >
              {downloadingAll ? (
                <>
                  <Package className="w-4 h-4 mr-2 animate-spin" />
                  Creating Package...
                </>
              ) : (
                <>
                  <Package className="w-4 h-4 mr-2" />
                  Download All (ZIP)
                </>
              )}
            </Button>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span className="text-sm">Or download individual test cases below</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Cases */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Generated Test Cases</CardTitle>
          <CardDescription>
            Review and download individual test cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testCases.map((testCase, index) => (
              <Card key={testCase.id} className="shadow-card border">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{testCase.name}</CardTitle>
                        <Badge variant="outline">{testCase.type}</Badge>
                      </div>
                      <CardDescription>{testCase.description}</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadIndividual(testCase)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="preview" className="w-full">
                    <TabsList>
                      <TabsTrigger value="preview" className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>Preview</span>
                      </TabsTrigger>
                      <TabsTrigger value="sql" className="flex items-center space-x-1">
                        <Code className="w-4 h-4" />
                        <span>SQL Code</span>
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="mt-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          This test case will validate the {testCase.type.toLowerCase()} requirements 
                          for your data pipeline. The generated SQL query includes proper error handling 
                          and follows best practices for {config.complexity} complexity level.
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="sql" className="mt-4">
                      <div className="bg-muted/50 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                          {testCase.sql}
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuration Used */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Configuration Used</CardTitle>
          <CardDescription>The settings used to generate these test cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Output Format</Label>
                <p className="font-medium">{config.outputFormat.toUpperCase()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Query Complexity</Label>
                <p className="font-medium capitalize">{config.complexity}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Comments Level</Label>
                <p className="font-medium capitalize">{config.comments}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Query Types</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {config.queryTypes.map(type => (
                    <Badge key={type} variant="secondary" className="capitalize">
                      {type.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Label({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement> & { className?: string }) {
  return (
    <label className={className} {...props}>
      {children}
    </label>
  );
}