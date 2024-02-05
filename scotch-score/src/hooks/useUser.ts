import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

function useUser() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    getAccessTokenSilently().then(setAccessToken).catch(console.error);
  }, [getAccessTokenSilently]);

  return { user, accessToken };
}

export default useUser;
