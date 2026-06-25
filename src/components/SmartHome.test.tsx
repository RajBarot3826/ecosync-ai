import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SmartHome from './SmartHome';

describe('SmartHome Component', () => {
  it('renders smart home header and control widgets', () => {
    render(<SmartHome />);
    expect(screen.getByText('Smart Home Hub')).toBeInTheDocument();
    expect(screen.getByText(/Appliance Controls/i)).toBeInTheDocument();
  });
});
