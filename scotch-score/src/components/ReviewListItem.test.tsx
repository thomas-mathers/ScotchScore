import { faker } from '@faker-js/faker';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import MockAuth0Provider from '../tests/MockAuth0Provider';
import MockQueryClientProvider from '../tests/MockQueryClientProvider';
import ReviewListItem, { ReviewListItemProps } from './ReviewListItem';

function renderComponent(overrides: Partial<ReviewListItemProps> = {}) {
  const user = userEvent.setup();
  const props: ReviewListItemProps = {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    rating: faker.number.float({ min: 1, max: 5, multipleOf: 0.1 }),
    userName: faker.internet.userName(),
    userProfilePictureUrl: faker.image.avatar(),
    upvotes: faker.number.int(100),
    downvotes: faker.number.int(100),
    dateCreated: faker.date.recent(),
    userVote: undefined,
    isAuthenticated: false,
    ...overrides,
  };
  return {
    user,
    ...render(
      <MockQueryClientProvider>
        <MockAuth0Provider>
          <ReviewListItem {...props} />
        </MockAuth0Provider>
      </MockQueryClientProvider>,
    ),
  };
}

describe('ReviewListItem', () => {
  it('should render the review', () => {
    const title = faker.lorem.sentence();
    const description = faker.lorem.paragraph();
    const userName = faker.internet.userName();
    const upvotes = faker.number.int(100);
    const downvotes = faker.number.int(100);

    renderComponent({
      title,
      description,
      userName,
      upvotes,
      downvotes,
    });

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByText(userName)).toBeInTheDocument();
    expect(screen.getByText(`(${upvotes})`)).toBeInTheDocument();
    expect(screen.getByText(`(${downvotes})`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'upvote' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'downvote' }),
    ).toBeInTheDocument();
  });

  it('should disable the upvote button when not authenticated', () => {
    renderComponent();

    expect(screen.getByRole('button', { name: 'upvote' })).toBeDisabled();
  });

  it('should display a tooltip on hover over the upvote button when not authenticated', async () => {
    renderComponent();

    await userEvent.hover(screen.getByRole('button', { name: 'upvote' }), {
      pointerEventsCheck: 0,
    });

    await waitFor(() =>
      expect(screen.getByText('Login to vote')).toBeInTheDocument(),
    );
  });

  it('should enable the upvote button when authenticated', () => {
    renderComponent({ isAuthenticated: true });

    expect(screen.getByRole('button', { name: 'upvote' })).not.toBeDisabled();
  });

  it('should not display a tooltip on hover over the upvote button when authenticated', async () => {
    renderComponent({ isAuthenticated: true });

    await userEvent.hover(screen.getByRole('button', { name: 'upvote' }), {
      pointerEventsCheck: 0,
    });

    await waitFor(() =>
      expect(screen.queryByText('Login to vote')).not.toBeInTheDocument(),
    );
  });

  it('should call the onClickUpvote function when the upvote button is clicked', async () => {
    const onClickUpvote = vi.fn();

    renderComponent({ isAuthenticated: true, onClickUpvote });

    await userEvent.click(screen.getByRole('button', { name: 'upvote' }));

    expect(onClickUpvote).toHaveBeenCalled();
  });

  it('should indicate that the user has upvoted the review', () => {
    renderComponent({ userVote: 'Upvote' });

    expect(screen.getByLabelText('upvoted')).toBeInTheDocument();
    expect(screen.queryByText('downvoted')).not.toBeInTheDocument();
  });

  it('should disable the downvote button when not authenticated', () => {
    renderComponent();

    expect(screen.getByRole('button', { name: 'downvote' })).toBeDisabled();
  });

  it('should display a tooltip on hover over the downvote button when not authenticated', async () => {
    renderComponent();

    await userEvent.hover(screen.getByRole('button', { name: 'downvote' }), {
      pointerEventsCheck: 0,
    });

    await waitFor(() =>
      expect(screen.getByText('Login to vote')).toBeInTheDocument(),
    );
  });

  it('should enable the downvote button when authenticated', () => {
    renderComponent({ isAuthenticated: true });

    expect(screen.getByRole('button', { name: 'downvote' })).not.toBeDisabled();
  });

  it('should not display a tooltip on hover over the downvote button when authenticated', async () => {
    renderComponent({ isAuthenticated: true });

    await userEvent.hover(screen.getByRole('button', { name: 'downvote' }), {
      pointerEventsCheck: 0,
    });

    await waitFor(() =>
      expect(screen.queryByText('Login to vote')).not.toBeInTheDocument(),
    );
  });

  it('should call the onClickDownvote function when the downvote button is clicked', async () => {
    const onClickDownvote = vi.fn();

    renderComponent({ isAuthenticated: true, onClickDownvote });

    await userEvent.click(screen.getByRole('button', { name: 'downvote' }));

    expect(onClickDownvote).toHaveBeenCalled();
  });

  it('should indicate that the user has downvoted the review', () => {
    renderComponent({ userVote: 'Downvote' });

    expect(screen.queryByText('upvoted')).not.toBeInTheDocument();
    expect(screen.getByLabelText('downvoted')).toBeInTheDocument();
  });
});
