import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Community from './Community';

describe('Community Component', () => {
  it('renders community feed header and mock posts', () => {
    render(<Community />);
    expect(screen.getByText('Community Hub')).toBeInTheDocument();
    expect(screen.getByText(/Sarah Jenkins/i)).toBeInTheDocument();
  });
});
