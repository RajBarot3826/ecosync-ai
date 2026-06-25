import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

import { BrowserRouter } from 'react-router-dom';

// Mock Recharts to prevent errors in JSDOM
vi.mock('recharts', () => {
  return {
    ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
    LineChart: ({ children }: any) => <div>{children}</div>,
    CartesianGrid: () => <div>CartesianGrid</div>,
    XAxis: () => <div>XAxis</div>,
    YAxis: () => <div>YAxis</div>,
    Tooltip: () => <div>Tooltip</div>,
    Line: () => <div>Line</div>,
  };
});

describe('Dashboard Component', () => {
  it('renders the carbon hub header and score', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    expect(screen.getByText('My Carbon Hub')).toBeInTheDocument();
    expect(screen.getByText('Real-Time Score')).toBeInTheDocument();
    expect(screen.getByText('Sustainability Twin Status')).toBeInTheDocument();
  });
});
