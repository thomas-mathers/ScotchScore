import { Auth0Provider } from '@auth0/auth0-react';

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN!;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID!;
const auth0AuthorizationParams = {
  audience: import.meta.env.VITE_AUTH0_AUDIENCE,
};

function MockAuth0Provider({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={auth0AuthorizationParams}
    >
      {children}
    </Auth0Provider>
  );
}

export default MockAuth0Provider;
