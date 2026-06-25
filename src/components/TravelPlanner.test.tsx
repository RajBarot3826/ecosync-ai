import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TravelPlanner from './TravelPlanner';

describe('TravelPlanner Component', () => {
  it('renders travel planner header and route comparison list', () => {
    render(<TravelPlanner />);
    expect(screen.getByText('Route Planner')).toBeInTheDocument();
    expect(screen.getByText(/Route Emission Comparison/i)).toBeInTheDocument();
  });
});
