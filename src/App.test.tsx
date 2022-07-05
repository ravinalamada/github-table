import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('search loading', () => {
  render(<App />);
  const linkElement = screen.getByText('Loading...');
  expect(linkElement).toBeInTheDocument();
});

test('Input field shows default value "react" on initial load', async() => {
  render(<App />);
  await waitFor(() => {
    const parent = screen.getByTestId('search-input');
    expect(parent).toBeInTheDocument();
    const input = parent.querySelector('input');
    expect(input?.value).toBe('react');
  }, {
    timeout: 8000
  });
})

test('test if search is executed after I click on the search icon', async() => {
  render(<App />);
  await waitFor(async () => {
    const parent = await screen.findByTestId('search-input');
    const input = parent.querySelector('input');
    
    // @ts-ignore
    fireEvent.change(input, { target: { value: 'angular' } })
  }, {
    timeout: 18000
  });
  const button = await screen.findByTestId('button-search');
  expect(button).toBeInTheDocument();
  fireEvent.click(button)
  await waitFor(async () => {
    const recordName = screen.getByText('angular');
    expect(recordName).toBeInTheDocument();
    expect(recordName.outerHTML).toEqual('<a href="https://github.com/angular/angular">angular</a>');
  }, {
    timeout: 18000
  });
}, 30000)

test('test if search is executed after I press Enter', async () => {
  render(<App />);
  await waitFor(async () => {
    const parent = await screen.findByTestId('search-input');
    const input = parent.querySelector('input');
    
    // @ts-ignore
    fireEvent.change(input, { target: { value: 'angular' } })
  }, {
    timeout: 18000
  });
  const parent = await screen.findByTestId('search-input');
  const input = parent.querySelector('input');
  // @ts-ignore
  fireEvent.keyDown(input, { key: "Enter", code: 13, charCode: 13 });
  
  await waitFor(async () => {
    const recordName = await screen.findByText('angular');
    expect(recordName).toBeInTheDocument();
    expect(recordName.outerHTML).toEqual('<a href="https://github.com/angular/angular">angular</a>');
  }, {
    timeout: 18000
  });
}, 30000)