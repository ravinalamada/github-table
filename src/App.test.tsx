import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('search loading', () => {
  render(<App />);
  const linkElement = screen.getByText('Loading...');
  expect(linkElement).toBeInTheDocument();
});

test('custom search term loads results that includes search term', async() => {
  render(<App />);
  const input = 
  await waitFor(async() => expect(await screen.findByTestId('search-input')).toBeInTheDocument())
  
})
