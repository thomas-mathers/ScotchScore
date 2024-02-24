import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

import { Auth0Provider } from '@auth0/auth0-react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import ScotchDetailPage from './components/ScotchDetailPage';
import ScotchTable from './components/ScotchTable';
import theme from './theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ScotchTable />,
      },
      {
        path: '/scotches/:id',
        element: <ScotchDetailPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN!;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID!;
const auth0AuthorizationParams = {
  audience: import.meta.env.VITE_AUTH0_AUDIENCE,
};

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Auth0Provider
          domain={auth0Domain}
          clientId={auth0ClientId}
          authorizationParams={auth0AuthorizationParams}
        >
          <RouterProvider router={router} />
        </Auth0Provider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
