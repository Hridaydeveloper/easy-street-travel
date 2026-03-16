
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Mail, Lock, User, Phone, Eye, EyeOff, ArrowLeft, UserCheck, X, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AuthProps {
  onSkip?: () => void;
}

const Auth = ({ onSkip }: AuthProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();
  const { login, signup, setGuestMode, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      sessionStorage.setItem('justLoggedIn', 'true');
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    const { error } = await login(loginData.email, loginData.password);
    
    if (error) {
      setError(error);
      setIsSubmitting(false);
      return;
    }
    
    setIsSubmitting(false);
    // Navigation will happen via the useEffect above when isAuthenticated becomes true
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    const { error } = await signup(signupData.email, signupData.password, {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      phone: signupData.phone,
    });
    
    if (error) {
      setError(error);
      setIsSubmitting(false);
      return;
    }
    
    setIsSubmitting(false);
    setSignupSuccess(true);
  };

  const handleSkip = () => {
    setGuestMode(true);
    if (onSkip) {
      onSkip();
    } else {
      navigate('/');
    }
  };

  const handleBack = () => {
    if (onSkip) {
      onSkip();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('/lovable-uploads/660b454f-8bfe-4dd4-adb2-e9e8f7ca60d3.png')`
        }}
      />
      
      <Button
        variant="ghost"
        onClick={handleBack}
        className="absolute top-4 left-4 text-white hover:bg-white/10 z-10"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </Button>

      <Button
        variant="ghost"
        onClick={handleSkip}
        className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
      >
        <X className="h-5 w-5 mr-2" />
        Skip
      </Button>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <Car className="h-8 w-8 text-black" />
            </div>
            <span className="text-3xl font-bold text-white">Drivio</span>
          </div>
          <p className="text-white/80">Welcome! Sign in to continue your journey.</p>
        </div>

        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-white">Get Started</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {signupSuccess && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm">Account created! Please check your email to confirm your account, then sign in.</p>
              </div>
            )}

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/10">
                <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-black text-white">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:text-black text-white">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-white/60"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-white text-black hover:bg-gray-200 py-3 transition-all duration-300 transform hover:scale-105"
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="First name"
                        value={signupData.firstName}
                        onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60"
                        required
                      />
                    </div>
                    <Input
                      placeholder="Last name"
                      value={signupData.lastName}
                      onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder-white/60"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Phone number"
                      value={signupData.phone}
                      onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-white/60"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-white text-black hover:bg-gray-200 py-3 transition-all duration-300 transform hover:scale-105"
                  >
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                onClick={handleSkip}
                className="text-white hover:bg-white/10 w-full"
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Continue as Guest
              </Button>
              <p className="text-white/60 text-sm mt-2">Explore without signing up</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
