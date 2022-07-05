import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
// jest.setTimeout(30000)

// test('search loading', () => {
//   render(<App />);
//   const linkElement = screen.getByText('Loading...');
//   expect(linkElement).toBeInTheDocument();
// });

// test('Input field shows default value "react" on initial load', async() => {
//   render(<App />);
//   await waitFor(() => {
//     const parent = screen.getByTestId('search-input');
//     expect(parent).toBeInTheDocument();
//     const input = parent.querySelector('input');
//     expect(input?.value).toBe('react');
//   }, {
//     timeout: 8000
//   });
// })

test('test if search is executed after I click on the search icon', async() => {
  render(<App />);
  await waitFor(async() => {
    const parent = screen.getByTestId('search-input');
    expect(parent).toBeInTheDocument();
    const input = parent.querySelector('input');
    // expect(input.value).toBe('') // empty before
    // @ts-ignore
  fireEvent.change(input, {target: {value: 'angular'}})
  expect(input?.value).toBe('angular') 
  const button = screen.getByTestId('button-search');
  expect(button).toBeInTheDocument();
  // fireEvent.click(button)
  fireEvent(
    button,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )

  const tableBody = await screen.findByTestId('table-body');
  expect(tableBody).toBeInTheDocument();

  // const tableData = tableBody.querySelectorAll('td');
  // console.log(tableData, 'data');
  
  // expect(ta)
  }, {
    timeout: 18000
  });
}, 10000)
