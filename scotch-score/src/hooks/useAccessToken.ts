import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

function useAccessToken() {
  const { getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAccessToken() {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      } catch (error: any) {
        if (error.error !== 'login_required') {
          console.error('Error getting access token', error);
        }
      } finally {
        setLoading(false);
      }
    }

    getAccessToken();
  }, [getAccessTokenSilently]);

  return { loading, accessToken };
}

export default useAccessToken;
