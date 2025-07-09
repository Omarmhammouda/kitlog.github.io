import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, User, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthButton = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Button variant="outline" disabled>
        Loading...
      </Button>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4" />
          <span>Welcome, {user?.name}</span>
        </div>
        <Link to="/dashboard">
          <Button variant="outline" size="sm">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={() => logout({ 
            logoutParams: { 
              returnTo: window.location.origin 
            } 
          })}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={() => loginWithRedirect()}
    >
      <LogIn className="w-4 h-4 mr-2" />
      Login
    </Button>
  );
};

export default AuthButton;
