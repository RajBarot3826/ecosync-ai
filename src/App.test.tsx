import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  it('renders the loading state initially due to React.lazy', () => {
    render(<App />);
    expect(screen.getByText(/Loading EcoSync AI/i)).toBeInTheDocument();
  });
  
  it('has a main navigation bar with aria-label', () => {
    render(<App />);
    expect(screen.getByRole('navigation', { name: /Main Navigation/i })).toBeInTheDocument();
  });
});
