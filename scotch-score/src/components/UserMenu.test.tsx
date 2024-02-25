import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import UserMenu, { UserMenuProps } from './UserMenu';

function renderComponent(props: UserMenuProps = {}) {
  const user = userEvent.setup();
  return {
    user,
    ...render(<UserMenu {...props} />),
  };
}

describe('UserMenu', () => {
  it('renders without crashing', () => {
    renderComponent();
  });

  it('shows a tooltip when hovered', async () => {
    const { user } = renderComponent();

    await user.hover(screen.getByRole('button'));

    const tooltip = await screen.findByText('Profile');

    expect(tooltip).toBeInTheDocument();
  });

  it('calls onLogout when the logout button is clicked', async () => {
    const onClickLogout = vi.fn();

    const { user } = renderComponent({ onClickLogout });

    await user.click(screen.getByRole('button'));

    await user.click(screen.getByText('Logout'));

    expect(onClickLogout).toHaveBeenCalled();
  });

  it('shows the user name', async () => {
    const userName = faker.person.fullName();

    const { user } = renderComponent({ userName });

    await user.click(screen.getByRole('button'));

    const name = await screen.findByText(userName);

    expect(name).toBeInTheDocument();
  });
});
