import { render, screen } from '@testing-library/react';
import Restaurant from './components/Restaurant';

const mockRestaurant = {
  name: 'Test Restaurant',
  rating: 4,
  price: '$',
  url: 'http://example.com'
};

test('renders Restaurant component with correct data', () => {
  render(<Restaurant restaurant={mockRestaurant} />);
  expect(screen.getByText(mockRestaurant.name)).toBeInTheDocument();
  expect(screen.getByText(new RegExp(mockRestaurant.rating, 'i'))).toBeInTheDocument();
  expect(screen.getByText(mockRestaurant.price)).toBeInTheDocument();
});
