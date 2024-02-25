import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import MockAuth0Provider from '../tests/MockAuth0Provider';
import MockQueryClientProvider from '../tests/MockQueryClientProvider';
import NewReviewDialog, { NewReviewDialogProps } from './NewReviewDialog';

function renderComponent(props: NewReviewDialogProps) {
  const user = userEvent.setup();
  return {
    user,
    ...render(
      <MockQueryClientProvider>
        <MockAuth0Provider>
          <NewReviewDialog {...props} />
        </MockAuth0Provider>
      </MockQueryClientProvider>,
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
