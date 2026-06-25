import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Rewards from './Rewards';

describe('Rewards Component', () => {
  it('renders rewards header and balance info', () => {
    render(<Rewards />);
    expect(screen.getByText('Eco Rewards')).toBeInTheDocument();
    expect(screen.getByText(/YOUR BALANCE/i)).toBeInTheDocument();
  });
});
