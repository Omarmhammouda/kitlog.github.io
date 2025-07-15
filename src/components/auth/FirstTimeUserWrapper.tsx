import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import useFirstTimeUserCheck from '@/hooks/useFirstTimeUserCheck';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Users, CheckCircle } from 'lucide-react';

interface FirstTimeUserWrapperProps {
  children: ReactNode;
}

const FirstTimeUserWrapper = ({ children }: FirstTimeUserWrapperProps) => {
  const { isAuthenticated, user } = useAuth();
  const { hasTeam, loading, error, defaultTeam } = useFirstTimeUserCheck();

  // Don't show anything if user is not authenticated
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  // Show loading state while checking/creating team
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-orange-600" />
            </div>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Setting up your workspace
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
            </div>
            <p className="text-gray-600 mb-6">
              We're creating your personal team and setting up your equipment management workspace.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Creating your team
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Setting up permissions
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Preparing your dashboard
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show error state if team setup failed
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Setup Error
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              There was an issue setting up your team. Please try refreshing the page.
            </p>
            <p className="text-sm text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Refresh Page
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show success message briefly before showing the actual app
  if (hasTeam && defaultTeam) {
    return (
      <div className="min-h-screen">
        {/* Optional: Show a brief success message */}
        <div className="bg-green-50 border-b border-green-200 p-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-800">
                Welcome to KitLog! Your workspace is ready.
              </span>
            </div>
          </div>
        </div>
        {children}
      </div>
    );
  }

  // Fallback - show the children
  return <>{children}</>;
};

export default FirstTimeUserWrapper;
