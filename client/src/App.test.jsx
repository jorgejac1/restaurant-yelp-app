import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import * as utils from './utils/utils';

jest.mock('./utils/utils', () => ({
  ...jest.requireActual('./utils/utils'),
  fetchData: jest.fn(),
}));

describe('App Component', () => {
  const mockInitialRestaurants = [
    { id: 1, name: 'Restaurant 1', rating: 4, price: '$', url: 'http://example.com/1' },
    { id: 2, name: 'Restaurant 2', rating: 5, price: '$$', url: 'http://example.com/2' },
  ];

  const mockAdditionalRestaurants = [
    { id: 3, name: 'Restaurant 3', rating: 4, price: '$', url: 'http://example.com/3' },
    { id: 4, name: 'Restaurant 4', rating: 5, price: '$$', url: 'http://example.com/4' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    utils.fetchData.mockImplementation((setAllRestaurants, setDisplayedRestaurants, INITIAL_ITEM_COUNT) => {
      setAllRestaurants(mockInitialRestaurants);
      setDisplayedRestaurants(mockInitialRestaurants.slice(0, INITIAL_ITEM_COUNT));
    });
  });

  test('fetches and displays initial restaurants', async () => {
    render(<App />);
    expect(await screen.findByText('Restaurant 1')).toBeInTheDocument();
    expect(screen.getByText('Restaurant 2')).toBeInTheDocument();
  });

  test('loads more restaurants upon simulating scroll', async () => {
    utils.fetchData.mockImplementationOnce((setAllRestaurants, setDisplayedRestaurants, INITIAL_ITEM_COUNT) => {
      setAllRestaurants([...mockInitialRestaurants, ...mockAdditionalRestaurants]);
      setDisplayedRestaurants([...mockInitialRestaurants, ...mockAdditionalRestaurants].slice(0, INITIAL_ITEM_COUNT * 2));
    });
  
    render(<App />);
  
    fireEvent.scroll(window, { target: { scrollY: 1000 } });
  
    expect(await screen.findByText('Restaurant 3')).toBeInTheDocument();
    expect(await screen.findByText('Restaurant 4')).toBeInTheDocument();
  });
});
