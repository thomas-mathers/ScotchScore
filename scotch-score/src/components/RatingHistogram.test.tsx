import { render, screen } from '@testing-library/react';

import RatingHistogram, { RatingHistogramProps } from './RatingHistogram';

function renderComponent(props: RatingHistogramProps) {
  return render(<RatingHistogram {...props} />);
}

describe('RatingHistogram', () => {
  it('renders without crashing', () => {
    renderComponent({ ratings: [1, 2, 3, 4, 5] });

    expect(screen.getByText('1 stars')).toBeInTheDocument();
    expect(screen.getByText('2 stars')).toBeInTheDocument();
    expect(screen.getByText('3 stars')).toBeInTheDocument();
    expect(screen.getByText('4 stars')).toBeInTheDocument();
    expect(screen.getByText('5 stars')).toBeInTheDocument();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
