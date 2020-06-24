import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders logo', () => {
  const { getByText } = render(<App />);
  const logo = getByText(/logo.svg/i);
  expect(logo).toBeInTheDocument();
});

test('renders error alert', () => {
  const { getByRole } = render(<App />);
  const errorAlert = getByRole(/alert/i);
  expect(errorAlert).toBeInTheDocument();
});
