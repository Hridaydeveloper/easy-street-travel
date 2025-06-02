
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Mail, Lock, User, Phone, Eye, EyeOff, ArrowLeft, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [loginData, setLoginData] = useState({ email: '', phone: '', password: '' });
  const [signupData, setSignupData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '', 
    password: '' 
  });
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', loginData);
    navigate('/dashboard');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup:', signupData);
    navigate('/dashboard');
  };

  const handleGuestAccess = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('/lovable-uploads/660b454f-8bfe-4dd4-adb2-e9e8f7ca60d3.png')`
        }}
      />
      
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 text-white hover:bg-white/10 z-10"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Home
      </Button>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <Car className="h-8 w-8 text-black" />
            </div>
            <span className="text-3xl font-bold text-white">Uber</span>
          </div>
          <p className="text-white/80">Welcome! Sign in to continue your journey.</p>
        </div>

        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-white">Get Started</CardTitle>
          </CardHeader>
          <CardContent>
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
                  {/* Login Method Toggle */}
                  <div className="flex space-x-2 mb-4">
                    <Button
                      type="button"
                      variant={loginMethod === 'email' ? 'default' : 'ghost'}
                      onClick={() => setLoginMethod('email')}
                      className={`flex-1 ${loginMethod === 'email' ? 'bg-white text-black' : 'text-white hover:bg-white/10'}`}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button
                      type="button"
                      variant={loginMethod === 'phone' ? 'default' : 'ghost'}
                      onClick={() => setLoginMethod('phone')}
                      className={`flex-1 ${loginMethod === 'phone' ? 'bg-white text-black' : 'text-white hover:bg-white/10'}`}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Phone
                    </Button>
                  </div>

                  {loginMethod === 'email' ? (
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
                  ) : (
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="tel"
                        placeholder="Phone number"
                        value={loginData.phone}
                        onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60"
                        required
                      />
                    </div>
                  )}
                  
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
                    className="w-full bg-white text-black hover:bg-gray-200 py-3 transition-all duration-300 transform hover:scale-105"
                  >
                    Sign In
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
                    className="w-full bg-white text-black hover:bg-gray-200 py-3 transition-all duration-300 transform hover:scale-105"
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Guest Access */}
            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                onClick={handleGuestAccess}
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
