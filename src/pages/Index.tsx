import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { Dashboard } from "@/components/dashboard/Dashboard";

type AuthMode = "login" | "signup";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleSignup = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail("");
    setAuthMode("login");
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  };

  if (isAuthenticated) {
    return <Dashboard userEmail={userEmail} onLogout={handleLogout} />;
  }

  return (
    <>
      {authMode === "login" ? (
        <LoginForm onLogin={handleLogin} onToggleMode={toggleAuthMode} />
      ) : (
        <SignupForm onSignup={handleSignup} onToggleMode={toggleAuthMode} />
      )}
    </>
  );
};

export default Index;
