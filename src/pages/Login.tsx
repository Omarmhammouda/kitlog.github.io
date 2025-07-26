import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Package } from 'lucide-react';

const Login = () => {
  const [firstName, setFirstName] = useState('Omar');
  const [lastName, setLastName] = useState('Hammouda');
  const [email, setEmail] = useState('ohamoudashop@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger Auth0 login instead of custom form submission
    loginWithRedirect();
  };

  // Show loading state while Auth0 is processing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-orange-200 rounded-xl mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-apple-lg bg-white">
        <CardContent className="p-0">
          {/* Header */}
          <div className="text-center pt-12 pb-8 px-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center">
                <Package className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to KitLog</h1>
            <p className="text-gray-600 text-sm">Let's get you set up in just a few steps</p>
          </div>

          {/* Progress Steps */}
          <div className="px-8 mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Step 1 of 3</span>
              <span className="text-sm text-gray-600">33% complete</span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">Step 1</span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <div className="w-6 h-6 bg-gray-400 rounded-sm"></div>
                </div>
                <span className="text-xs text-gray-600">Step 2</span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <Package className="w-6 h-6 text-gray-400" />
                </div>
                <span className="text-xs text-gray-600">Step 3</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Create Your Account</h2>
              <p className="text-gray-600 text-sm">Let's start with your personal information</p>
            </div>

            <form onSubmit={handleContinue} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="pr-8 bg-gray-50 border-gray-200"
                      required
                    />
                    <CheckCircle2 className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <div className="relative">
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="pr-8 bg-gray-50 border-gray-200"
                      required
                    />
                    <CheckCircle2 className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-8 bg-gray-50 border-gray-200"
                    required
                  />
                  <CheckCircle2 className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-8 bg-gray-50 border-gray-200"
                    placeholder="••••••••••••••••"
                    required
                  />
                  <CheckCircle2 className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pr-8 bg-gray-50 border-gray-200"
                    placeholder="••••••••••••••••"
                    required
                  />
                  <CheckCircle2 className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-6">
                <Link 
                  to="/"
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
                >
                  ← Back to Login
                </Link>
                <Button 
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
                >
                  Continue →
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
