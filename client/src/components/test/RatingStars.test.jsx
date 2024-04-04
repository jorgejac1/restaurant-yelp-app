import { render, screen } from '@testing-library/react';
import RatingStars from './components/RatingStars';

test('renders RatingStars with proper rating', () => {
  const rate = 3;
  render(<RatingStars rate={rate} />);
  const stars = screen.getAllByTestId('star');
  expect(stars.length).toBe(rate);
});
