import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  it('renders without crashing and includes navigation links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByRole('navigation', { name: /Main Navigation/i })).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Calculator')).toBeInTheDocument();
    expect(screen.getByText('AI Coach')).toBeInTheDocument();
  });
});
