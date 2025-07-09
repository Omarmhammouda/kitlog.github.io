import { Auth0Provider as Auth0ProviderLib } from '@auth0/auth0-react';
import { ReactNode } from 'react';

interface Auth0ProviderProps {
  children: ReactNode;
}

const Auth0Provider = ({ children }: Auth0ProviderProps) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL || window.location.origin;

  if (!domain || !clientId) {
    console.error('Auth0 configuration missing. Please check your environment variables.');
    return <div>Auth0 configuration error</div>;
  }

  return (
    <Auth0ProviderLib
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        scope: "openid profile email"
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0ProviderLib>
  );
};

export default Auth0Provider;
