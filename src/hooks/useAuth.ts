import { useAuth0 } from '@auth0/auth0-react';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    getIdTokenClaims,
  } = useAuth0();

  const login = () => {
    loginWithRedirect();
  };

  const logoutUser = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const getAccessToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      return token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  };

  const getUserInfo = () => {
    return {
      id: user?.sub,
      email: user?.email,
      name: user?.name,
      picture: user?.picture,
      emailVerified: user?.email_verified,
    };
  };

  return {
    user: getUserInfo(),
    isAuthenticated,
    isLoading,
    error,
    login,
    logout: logoutUser,
    getAccessToken,
    getIdTokenClaims,
  };
};

export default useAuth;
