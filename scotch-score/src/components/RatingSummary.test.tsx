import { render, screen } from '@testing-library/react';

import RatingSummary, { RatingSummaryProps } from './RatingSummary';

function renderComponent(props: RatingSummaryProps) {
  render(<RatingSummary {...props} />);
}

describe('RatingSummary', () => {
  it('renders without crashing', () => {
    renderComponent({
      rating: 4.5,
      numberOfRatings: 100,
      numberOfPositiveRecommendations: 80,
      numberOfRecommendations: 100,
    });

    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('100 ratings')).toBeInTheDocument();
    expect(
      screen.getByText('80 out of 100 people would recommend this product'),
    ).toBeInTheDocument();
  });
});
