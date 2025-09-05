import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Database, Shield, Zap, DatabaseZap } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary-glow/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-accent/30 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
      
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
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
        <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-card/95 border-0 shadow-2xl shadow-primary/20 animate-scale-in hover:shadow-primary/30 transition-all duration-500">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-bold flex items-center justify-center space-x-3 mb-2 whitespace-nowrap">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                <DatabaseZap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent whitespace-nowrap">
                Test Case Generator - Data Migration
              </span>
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Sign in to your account to continue generating test cases
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 px-4 bg-background/50 border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 px-4 bg-background/50 border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-primary hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300 font-medium text-base" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={onToggleMode}
                  className="text-primary hover:text-primary-glow font-medium underline-offset-4 hover:underline transition-all duration-300"
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