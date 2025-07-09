import { useAuth0 } from '@auth0/auth0-react';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Authentication Required</h2>
          <p className="text-gray-600">Please log in to access this page.</p>
          <Button onClick={() => loginWithRedirect()}>
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
