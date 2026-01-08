import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Sort, { SortComponent } from '~/components/Sort';
import { FIELDS, asc, desc } from '~/consts';
import type { SortProps } from '~/types/components.types';

describe('SortComponent', () => {
  let onChangeMock: SortProps['onChange'];

  beforeEach(() => {
    onChangeMock = vi.fn();
  });

  it('renders all sort buttons', () => {
    render(<SortComponent sort={undefined} onChange={onChangeMock} />);
    FIELDS.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('calls onChange with asc if no sort is set', () => {
    render(<SortComponent sort={undefined} onChange={onChangeMock} />);
    const button = screen.getByText(FIELDS[0].label).closest('button')!;
    fireEvent.click(button);
    expect(onChangeMock).toHaveBeenCalledWith({
      field: FIELDS[0].value,
      order: asc,
    });
  });

  it('changes asc to desc on second click', () => {
    render(<SortComponent sort={{ field: FIELDS[0].value, order: asc }} onChange={onChangeMock} />);
    const button = screen.getByText(FIELDS[0].label).closest('button')!;
    fireEvent.click(button);
    expect(onChangeMock).toHaveBeenCalledWith({
      field: FIELDS[0].value,
      order: desc,
    });
  });

  it('removes sort on third click', () => {
    render(
      <SortComponent sort={{ field: FIELDS[0].value, order: desc }} onChange={onChangeMock} />,
    );
    const button = screen.getByText(FIELDS[0].label).closest('button')!;
    fireEvent.click(button);
    expect(onChangeMock).toHaveBeenCalledWith(undefined);
  });

  it('renders arrow for active sort asc', () => {
    render(<SortComponent sort={{ field: FIELDS[0].value, order: asc }} onChange={onChangeMock} />);
    expect(screen.getByText('↑')).toBeInTheDocument();
  });

  it('renders arrow for active sort desc', () => {
    render(
      <SortComponent sort={{ field: FIELDS[0].value, order: desc }} onChange={onChangeMock} />,
    );
    expect(screen.getByText('↓')).toBeInTheDocument();
  });

  it('does not render arrow for inactive buttons', () => {
    render(<SortComponent sort={{ field: FIELDS[0].value, order: asc }} onChange={onChangeMock} />);
    if (FIELDS.length > 1) {
      const inactiveButton = screen.getByText(FIELDS[1].label).closest('button')!;
      expect(inactiveButton).not.toHaveTextContent('↑');
      expect(inactiveButton).not.toHaveTextContent('↓');
    }
  });

  it('matches snapshot with no sort', () => {
    const { asFragment } = render(<SortComponent sort={undefined} onChange={onChangeMock} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with active asc sort', () => {
    const { asFragment } = render(
      <SortComponent sort={{ field: FIELDS[0].value, order: asc }} onChange={onChangeMock} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with active desc sort', () => {
    const { asFragment } = render(
      <SortComponent sort={{ field: FIELDS[0].value, order: desc }} onChange={onChangeMock} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Sort memo', () => {
  it('renders memoized Sort correctly', () => {
    const onChangeMock = vi.fn();
    render(<Sort sort={undefined} onChange={onChangeMock} />);
    FIELDS.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('matches snapshot for memoized Sort', () => {
    const onChangeMock = vi.fn();
    const { asFragment } = render(<Sort sort={undefined} onChange={onChangeMock} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
