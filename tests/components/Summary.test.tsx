import { render, screen } from '@testing-library/react';
import type { Metrics } from '~/types/types';
import { SalesSummaryComponent, Summary } from '~/components/Summary';

const mockMetrics: Metrics = {
  totalRevenue: 1234.56,
  totalOrders: 78,
  avgOrderValue: 15.87,
};

describe('SalesSummaryComponent', () => {
  it('renders all summary items correctly', () => {
    render(<SalesSummaryComponent {...mockMetrics} />);

    expect(screen.getByText('🏆 Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('1 234.56 $')).toBeInTheDocument();

    expect(screen.getByText('📊 Total Orders')).toBeInTheDocument();
    expect(screen.getByText('78')).toBeInTheDocument();

    expect(screen.getByText('💰 Average Order Value')).toBeInTheDocument();
    expect(screen.getByText('15.87 $')).toBeInTheDocument();
  });

  it('renders the correct number of SummaryItem components', () => {
    const { container } = render(<SalesSummaryComponent {...mockMetrics} />);
    const items = container.querySelectorAll('.panel');
    expect(items.length).toBe(3);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<SalesSummaryComponent {...mockMetrics} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('SalesSummary memo', () => {
  it('renders memoized component correctly', () => {
    render(<Summary {...mockMetrics} />);

    expect(screen.getByText('🏆 Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('📊 Total Orders')).toBeInTheDocument();
    expect(screen.getByText('💰 Average Order Value')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Summary {...mockMetrics} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
