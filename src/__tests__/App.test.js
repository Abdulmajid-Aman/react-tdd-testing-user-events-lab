import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders the form correctly', () => {
  render(<App />);
  
  // Check for name input
  expect(screen.getByLabelText(/name:/i)).toBeTruthy();
  
  // Check for email input
  expect(screen.getByLabelText(/email:/i)).toBeTruthy();
  
  // Check for interests checkboxes
  expect(screen.getByLabelText(/coding/i)).toBeTruthy();
  expect(screen.getByLabelText(/marketing/i)).toBeTruthy();
  expect(screen.getByLabelText(/design/i)).toBeTruthy();
  
  // Check for submit button
  expect(screen.getByRole('button', { name: /submit/i })).toBeTruthy();
});

test('submitting the form displays a thank you message with interests', () => {
  render(<App />);
  
  fireEvent.change(screen.getByLabelText(/name:/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/email:/i), { target: { value: 'john@example.com' } });
  
  fireEvent.click(screen.getByLabelText(/coding/i));
  fireEvent.click(screen.getByLabelText(/marketing/i));
  
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(screen.getByText(/thank you for signing up, john doe!/i)).toBeTruthy();
  expect(screen.getByText(/coding/i)).toBeTruthy();
  expect(screen.getByText(/marketing/i)).toBeTruthy();
  expect(screen.queryByText(/design/i)).toBeNull();
});

test('check form fields update on user input', () => {
  render(<App />);
  
  fireEvent.change(screen.getByLabelText(/name:/i), { target: { value: 'Jane Smith' } });
  fireEvent.change(screen.getByLabelText(/email:/i), { target: { value: 'jane@example.com' } });
  
  expect(screen.getByLabelText(/name:/i).value).toBe('Jane Smith');
  expect(screen.getByLabelText(/email:/i).value).toBe('jane@example.com');
});

test('interests checkboxes update correctly', () => {
  render(<App />);
  
  const codingCheckbox = screen.getByLabelText(/coding/i);
  const marketingCheckbox = screen.getByLabelText(/marketing/i);
  const designCheckbox = screen.getByLabelText(/design/i);
  
  fireEvent.click(codingCheckbox);
  fireEvent.click(marketingCheckbox);
  
  expect(codingCheckbox.checked).toBe(true);
  expect(marketingCheckbox.checked).toBe(true);
  expect(designCheckbox.checked).toBe(false);
});
