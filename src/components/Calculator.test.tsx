import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator Component', () => {
  it('renders the form correctly', () => {
    render(<Calculator />);
    expect(screen.getByText('Carbon Calculator')).toBeInTheDocument();
    expect(screen.getByLabelText(/Miles Driven Today/i)).toBeInTheDocument();
  });

  it('calculates the footprint correctly when submitted', () => {
    render(<Calculator />);
    const milesInput = screen.getByLabelText(/Miles Driven Today/i);
    const elecInput = screen.getByLabelText(/Electricity Used/i);
    const meatInput = screen.getByLabelText(/Meat Meals/i);
    
    fireEvent.change(milesInput, { target: { value: '10' } });
    fireEvent.change(elecInput, { target: { value: '10' } });
    fireEvent.change(meatInput, { target: { value: '2' } });
    
    const submitBtn = screen.getByRole('button', { name: /Calculate my carbon footprint/i });
    fireEvent.click(submitBtn);
    
    // (10 * 0.4) + (10 * 0.85) + (2 * 2.5) = 4 + 8.5 + 5 = 17.5
    expect(screen.getByText(/17.5/)).toBeInTheDocument();
  });
});
