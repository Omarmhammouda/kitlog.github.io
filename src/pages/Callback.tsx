import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Redirect to home page or dashboard after successful login
      navigate('/');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold mb-4">Completing Authentication...</h2>
        <p className="text-gray-600">Please wait while we finish logging you in.</p>
      </div>
    </div>
  );
};

export default Callback;
