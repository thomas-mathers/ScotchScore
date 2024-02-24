import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import LogoButton from './LogoButton';

function renderComponent() {
  return render(
    <BrowserRouter>
      <LogoButton />
    </BrowserRouter>,
  );
}

describe('LogoButton', () => {
  it('renders without crashing', () => {
    renderComponent();

    expect(screen.getByText('ScotchScore')).toBeInTheDocument();
  });
});
