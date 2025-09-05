import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Database, Shield, Zap, Code } from "lucide-react";

interface LoginFormProps {
  onLogin: (email: string) => void;
  onToggleMode: () => void;
}

export function LoginForm({ onLogin, onToggleMode }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Login Successful",
          description: "Welcome to Data Test Case Generator",
        });
        onLogin(email);
      } else {
        toast({
          title: "Login Failed", 
          description: "Please enter valid credentials",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="hidden lg:block animate-slide-in">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Data Test Case Generator</h1>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground leading-tight">
                Generate Comprehensive Test Cases for Your ETL Workflows
              </h2>
              <p className="text-lg text-muted-foreground">
                Transform your source-to-target mappings into powerful test cases and SQL queries with our intelligent automation platform.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-foreground">Secure data processing and analysis</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-foreground">Automated test case generation</span>
              </div>
              <div className="flex items-center space-x-3">
                <Database className="w-5 h-5 text-primary" />
                <span className="text-foreground">Multiple output formats</span>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="w-full max-w-md mx-auto shadow-elegant animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <span>Test Case Generator - Data Migration</span>
            </CardTitle>
            <CardDescription>
              Sign in to your account to continue generating test cases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={onToggleMode}
                  className="text-primary hover:text-primary-glow transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}