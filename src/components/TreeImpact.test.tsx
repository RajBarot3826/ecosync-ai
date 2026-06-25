import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TreeImpact from './TreeImpact';

describe('TreeImpact Component', () => {
  it('renders tree impact header and forest details', () => {
    render(<TreeImpact />);
    expect(screen.getByText('Tree Impact Offset')).toBeInTheDocument();
    expect(screen.getByText(/My Virtual Forest/i)).toBeInTheDocument();
  });
});
