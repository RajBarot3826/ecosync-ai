import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AICoach from './AICoach';

describe('AICoach Component', () => {
  it('renders the initial greeting', () => {
    render(<AICoach />);
    expect(screen.getByText(/Hi! I am your EcoSync AI Coach/i)).toBeInTheDocument();
  });

  it('allows user to type a message', () => {
    render(<AICoach />);
    const input = screen.getByLabelText(/Message input field/i);
    fireEvent.change(input, { target: { value: 'How can I save energy?' } });
    expect(input).toHaveValue('How can I save energy?');
  });
});
