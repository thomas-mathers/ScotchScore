import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginButton, { LoginButtonProps } from './LoginButton';

function renderComponent(props: LoginButtonProps = {}) {
  const user = userEvent.setup();
  return {
    user,
    ...render(<LoginButton {...props} />),
  };
}

describe('LoginButton', () => {
  it('renders without crashing', () => {
    renderComponent();

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = jest.fn();
    const { user } = renderComponent({ onClick });

    await user.click(screen.getByText('Login'));

    expect(onClick).toHaveBeenCalled();
  });
});
