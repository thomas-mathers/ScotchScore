import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

import ErrorPage from './components/ErrorPage';
import theme from './theme';
import ScotchDetailPage from './components/ScotchDetailPage';
import Root from './components/Root';
import ScotchTable from './components/ScotchTable';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Auth0Provider } from '@auth0/auth0-react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
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

root.render(
  <StrictMode>
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN!}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
            authorizationParams={{
              audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            }}
          >
            <RouterProvider router={router} />
          </Auth0Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  </StrictMode>,
);
