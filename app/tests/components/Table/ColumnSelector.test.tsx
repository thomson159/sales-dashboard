import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ColumnSelector } from '~/components/Table/ColumnSelector';
import type { ColumnKey } from '~/types/types';

const columns = [
  { key: 'name' as ColumnKey, label: 'Name' },
  { key: 'age' as ColumnKey, label: 'Age' },
  { key: 'email' as ColumnKey, label: 'Email' },
];

describe('ColumnSelector', () => {
  it('renders all columns', () => {
    render(<ColumnSelector columns={columns} visibleColumns={[]} toggleColumn={vi.fn()} />);

    columns.forEach((col) => {
      expect(screen.getByText(col.label)).toBeDefined();
      const checkbox = screen.getByLabelText(col.label) as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });
  });

  it('checks checkboxes for visible columns', () => {
    render(
      <ColumnSelector
        columns={columns}
        visibleColumns={['name' as ColumnKey, 'email' as ColumnKey]}
        toggleColumn={vi.fn()}
      />,
    );

    expect((screen.getByLabelText('Name') as HTMLInputElement).checked).toBe(true);
    expect((screen.getByLabelText('Age') as HTMLInputElement).checked).toBe(false);
    expect((screen.getByLabelText('Email') as HTMLInputElement).checked).toBe(true);
  });

  it('calls toggleColumn when a checkbox is clicked', () => {
    const toggleColumn = vi.fn();
    render(<ColumnSelector columns={columns} visibleColumns={[]} toggleColumn={toggleColumn} />);

    fireEvent.click(screen.getByLabelText('Name'));
    fireEvent.click(screen.getByLabelText('Email'));

    expect(toggleColumn).toHaveBeenCalledWith('name');
    expect(toggleColumn).toHaveBeenCalledWith('email');
    expect(toggleColumn).toHaveBeenCalledTimes(2);
  });

  it('renders correctly with no columns', () => {
    render(<ColumnSelector columns={[]} visibleColumns={[]} toggleColumn={vi.fn()} />);

    expect(screen.queryByRole('checkbox')).toBeNull();
  });

  it('matches snapshot with all columns visible', () => {
    const { container } = render(
      <ColumnSelector
        columns={columns}
        visibleColumns={['name' as ColumnKey, 'age' as ColumnKey, 'email' as ColumnKey]}
        toggleColumn={vi.fn()}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
