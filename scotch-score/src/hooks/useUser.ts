import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

function useUser() {
  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    getAccessTokenSilently().then(setAccessToken);
  }, [getAccessTokenSilently, getIdTokenClaims]);

  return { accessToken };
}

export default useUser;
