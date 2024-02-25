import { Auth0Provider } from '@auth0/auth0-react';
import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import NewReviewDialog, { NewReviewDialogProps } from './NewReviewDialog';

const queryClient = new QueryClient();

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN!;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID!;
const auth0AuthorizationParams = {
  audience: import.meta.env.VITE_AUTH0_AUDIENCE,
};

function renderComponent(props: NewReviewDialogProps) {
  const user = userEvent.setup();
  return {
    user,
    ...render(
      <QueryClientProvider client={queryClient}>
        <Auth0Provider
          domain={auth0Domain}
          clientId={auth0ClientId}
          authorizationParams={auth0AuthorizationParams}
        >
          <NewReviewDialog {...props} />
        </Auth0Provider>
      </QueryClientProvider>,
    ),
  };
}

describe('NewReviewDialog', () => {
  it('should render nothing when not open', () => {
    renderComponent({
      scotchId: faker.string.uuid(),
      rating: 0,
      open: false,
    });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render the dialog when open', () => {
    renderComponent({
      scotchId: faker.string.uuid(),
      rating: 0,
      open: true,
    });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should close the dialog when the close button is clicked', async () => {
    const onClose = vi.fn();

    renderComponent({
      scotchId: faker.string.uuid(),
      rating: 0,
      open: true,
      onClose,
    });

    await userEvent.click(screen.getByText('Cancel'));

    expect(onClose).toHaveBeenCalled();
  });

  it('should show validation error when the review is empty', async () => {
    renderComponent({
      scotchId: faker.string.uuid(),
      rating: 0,
      open: true,
    });

    await userEvent.type(
      screen.getByLabelText('Review Title'),
      faker.lorem.word(),
    );

    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Review is required')).toBeInTheDocument();
  });

  it('should show validation error when the review title is empty', async () => {
    renderComponent({
      scotchId: faker.string.uuid(),
      rating: 0,
      open: true,
    });

    await userEvent.type(
      screen.getByLabelText('Review'),
      faker.lorem.paragraph(),
    );

    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Review Title is required')).toBeInTheDocument();
  });

  it('should call the onSubmit function with the correct data', async () => {
    const onClose = vi.fn();

    renderComponent({
      scotchId: faker.string.uuid(),
      rating: 0,
      open: true,
      onClose,
    });

    await userEvent.type(
      screen.getByLabelText('Review'),
      faker.lorem.paragraph(),
    );

    await userEvent.type(
      screen.getByLabelText('Review Title'),
      faker.lorem.word(),
    );

    await userEvent.click(screen.getByText('Submit'));

    expect(onClose).toHaveBeenCalled();
  });
});
