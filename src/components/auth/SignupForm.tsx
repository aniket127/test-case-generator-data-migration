import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Database, Shield, Zap, DatabaseZap, Users, CheckCircle } from "lucide-react";

interface SignupFormProps {
  onSignup: (email: string) => void;
  onToggleMode: () => void;
}

export function SignupForm({ onSignup, onToggleMode }: SignupFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate registration
    setTimeout(() => {
      toast({
        title: "Account Created",
        description: "Your account has been created successfully",
      });
      onSignup(formData.email);
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/10 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-accent/30 to-primary/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Hero Section */}
        <div className="hidden lg:block animate-fade-in">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center shadow-elegant hover-scale">
                <DatabaseZap className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Test Case Generator</h1>
                <p className="text-lg text-primary font-medium">Data Migration</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Join Thousands of Data Engineers
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Start generating comprehensive test cases and SQL queries for your ETL processes today.
              </p>
            </div>

            {/* Feature highlights for signup */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-4 p-4 bg-card/80 backdrop-blur-sm rounded-xl shadow-elegant hover-scale transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-success/20 to-success/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">10,000+ Active Users</h3>
                  <p className="text-muted-foreground">Join our growing community</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-card/80 backdrop-blur-sm rounded-xl shadow-elegant hover-scale transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Free to Start</h3>
                  <p className="text-muted-foreground">No credit card required</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Signup Form */}
        <Card className="w-full max-w-md mx-auto shadow-elegant animate-scale-in bg-card/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
          <CardHeader className="text-center pb-6 pt-8">
            {/* Logo and Title inside card */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-elegant hover-scale">
                <DatabaseZap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-left">
                <h1 className="text-xl font-bold text-card-foreground">Test Case Generator</h1>
                <p className="text-primary font-medium text-sm">Data Migration</p>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-card-foreground">Create Account</CardTitle>
            <CardDescription className="text-muted-foreground">
              Join us to start generating test cases
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className="h-12 px-4 border-2 border-input focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-lg transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="h-12 px-4 border-2 border-input focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-lg transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                  className="h-12 px-4 border-2 border-input focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-lg transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
                  className="h-12 px-4 border-2 border-input focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-lg transition-all duration-200"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold rounded-lg shadow-elegant hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 hover-scale" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <button
                  onClick={onToggleMode}
                  className="text-primary hover:text-accent font-semibold hover:underline transition-colors duration-200"
                >
                  Sign in
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}