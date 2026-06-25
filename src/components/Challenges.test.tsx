import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Challenges from './Challenges';

describe('Challenges Component', () => {
  it('renders challenges header and list', () => {
    render(<Challenges />);
    expect(screen.getByText('Carbon Reduction Challenges')).toBeInTheDocument();
    expect(screen.getByText(/Use public transit, cycle, or walk/i)).toBeInTheDocument();
  });
});
