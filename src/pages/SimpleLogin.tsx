import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Package, LogIn } from 'lucide-react';

const SimpleLogin = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
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
            <p className="text-gray-600 text-sm">Manage your creative equipment with ease</p>
          </div>

          {/* Login Content */}
          <div className="px-8 pb-12">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Get Started</h2>
              <p className="text-gray-600 text-sm">
                Sign in to access your equipment inventory and start managing your creative tools.
              </p>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={handleLogin}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-base font-medium"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign In with Auth0
              </Button>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  New to KitLog? Your account will be created automatically after signing in.
                </p>
              </div>
            </div>
          </div>

          {/* Features Preview */}
          <div className="bg-gray-50 px-8 py-6 rounded-b-lg">
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                Track your equipment inventory
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                Manage lending and borrowing
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                Generate usage reports
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleLogin;
