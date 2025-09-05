import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Database, Shield, Zap, DatabaseZap, HardDrive, Activity, Network, Server } from "lucide-react";

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-primary/20">
      {/* Database-themed Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dynamic Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.08)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse"></div>
        
        {/* Floating Database Icons */}
        <div className="absolute top-20 left-16 text-primary/20 animate-bounce">
          <Database size={40} />
        </div>
        <div className="absolute top-40 right-24 text-primary/15 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <HardDrive size={32} />
        </div>
        <div className="absolute bottom-32 left-24 text-primary/25 animate-bounce" style={{ animationDelay: '1s' }}>
          <Server size={36} />
        </div>
        <div className="absolute bottom-20 right-32 text-primary/20 animate-pulse" style={{ animationDelay: '1.5s' }}>
          <Activity size={28} />
        </div>
        <div className="absolute top-1/2 left-1/3 text-primary/12 animate-bounce" style={{ animationDelay: '2s' }}>
          <Network size={44} />
        </div>
        <div className="absolute top-1/4 right-1/3 text-primary/18 animate-pulse" style={{ animationDelay: '0.3s' }}>
          <DatabaseZap size={38} />
        </div>

        {/* Data Flow Animation Lines */}
        <div className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/25 to-transparent animate-pulse"></div>
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-success/30 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Vertical Data Streams */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-0 right-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-success/25 to-transparent animate-pulse" style={{ animationDelay: '0.8s' }}></div>
        
        {/* Orbital Elements */}
        <div className="absolute top-1/3 left-2/3 w-32 h-32 border border-primary/10 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-1/3 right-2/3 w-24 h-24 border border-success/15 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Left Side - Branding & Features */}
          <div className="space-y-10 text-center lg:text-left animate-fade-in">
            <div className="space-y-6">
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <div className="relative group">
                  <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-glow hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                    <DatabaseZap className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center animate-pulse">
                    <Activity className="w-4 h-4 text-success-foreground" />
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-primary/30 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-success to-primary bg-clip-text text-transparent">
                    DataTestGen Pro
                  </h1>
                  <p className="text-muted-foreground text-lg">Advanced ETL Testing Platform</p>
                </div>
              </div>
              
              <div className="space-y-8 max-w-2xl mx-auto lg:mx-0">
                <h2 className="text-5xl font-bold text-foreground leading-tight">
                  Transform Your
                  <span className="block bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                    Data Testing Workflow
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Generate comprehensive test cases automatically from your data mappings. 
                  Streamline validation, ensure data integrity, and accelerate your ETL testing processes 
                  with intelligent automation and AI-powered insights.
                </p>
                
                <div className="grid grid-cols-3 gap-6 pt-6">
                  <div className="text-center space-y-3 group cursor-default">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-glow transition-all duration-300">
                      <Database className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Smart Analysis</p>
                      <p className="text-sm text-muted-foreground">AI-powered insights</p>
                    </div>
                  </div>
                  <div className="text-center space-y-3 group cursor-default">
                    <div className="w-16 h-16 bg-gradient-to-br from-success/20 to-success/10 rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-glow transition-all duration-300">
                      <Zap className="w-8 h-8 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Auto Generation</p>
                      <p className="text-sm text-muted-foreground">Instant test creation</p>
                    </div>
                  </div>
                  <div className="text-center space-y-3 group cursor-default">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-success/10 rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-glow transition-all duration-300">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Data Security</p>
                      <p className="text-sm text-muted-foreground">Enterprise grade</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Right Side - Login Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-lg shadow-2xl border-0 bg-card/90 backdrop-blur-2xl animate-scale-in">
              <CardHeader className="space-y-6 pb-8 pt-10">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-glow">
                    <Shield className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold text-foreground">Welcome Back</CardTitle>
                    <CardDescription className="text-lg text-muted-foreground mt-2">
                      Sign in to access your testing dashboard
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-10 pb-10 space-y-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-base font-semibold text-foreground">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-14 px-4 text-base bg-background/60 border-2 border-border/50 focus:bg-background focus:border-primary/60 focus:ring-4 focus:ring-primary/20 rounded-xl transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-base font-semibold text-foreground">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-14 px-4 text-base bg-background/60 border-2 border-border/50 focus:bg-background focus:border-primary/60 focus:ring-4 focus:ring-primary/20 rounded-xl transition-all duration-300"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-semibold bg-gradient-primary hover:shadow-glow transition-all duration-500 rounded-xl hover:scale-[1.02]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      "Sign In to Dashboard"
                    )}
                  </Button>
                </form>

                <div className="text-center pt-6 border-t border-border/30">
                  <p className="text-base text-muted-foreground">
                    Don't have an account?{" "}
                    <button 
                      onClick={onToggleMode}
                      className="text-primary font-semibold hover:text-success hover:underline focus:outline-none transition-all duration-200"
                    >
                      Create Account
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}