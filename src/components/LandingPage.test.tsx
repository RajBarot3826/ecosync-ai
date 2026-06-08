import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './LandingPage';

describe('LandingPage Component', () => {
  it('renders the main heading and features', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Your Personal/i)).toBeInTheDocument();
    expect(screen.getByText('Real-Time Score')).toBeInTheDocument();
    expect(screen.getByText('Digital Avatar')).toBeInTheDocument();
    expect(screen.getByText('Gemini AI Coach')).toBeInTheDocument();
  });
});
