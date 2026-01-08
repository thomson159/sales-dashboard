import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ColumnSelector } from '~/components/Table/ColumnSelector';
import type { ColumnKey } from '~/types/types';

vi.mock('~/consts', () => ({
  COLUMNS: [
    { key: 'name' as ColumnKey, label: 'Name' },
    { key: 'age' as ColumnKey, label: 'Age' },
    { key: 'email' as ColumnKey, label: 'Email' },
  ],
}));

describe('ColumnSelector', () => {
  const toggleColumn = vi.fn();

  beforeEach(() => {
    toggleColumn.mockClear();
  });

  it('renders all columns with unchecked checkboxes by default', () => {
    render(<ColumnSelector visibleColumns={[]} onToggle={toggleColumn} />);

    expect(screen.getAllByRole('checkbox')).toHaveLength(3);

    expect((screen.getByLabelText('Name') as HTMLInputElement).checked).toBe(false);
    expect((screen.getByLabelText('Age') as HTMLInputElement).checked).toBe(false);
    expect((screen.getByLabelText('Email') as HTMLInputElement).checked).toBe(false);
  });

  it('marks only visible columns as checked', () => {
    render(
      <ColumnSelector
        visibleColumns={['name' as ColumnKey, 'email' as ColumnKey]}
        onToggle={toggleColumn}
      />,
    );

    expect((screen.getByLabelText('Name') as HTMLInputElement).checked).toBe(true);
    expect((screen.getByLabelText('Age') as HTMLInputElement).checked).toBe(false);
    expect((screen.getByLabelText('Email') as HTMLInputElement).checked).toBe(true);
  });

  it('calls toggleColumn with correct key on checkbox click', () => {
    render(<ColumnSelector visibleColumns={[]} onToggle={toggleColumn} />);

    fireEvent.click(screen.getByLabelText('Name'));
    fireEvent.click(screen.getByLabelText('Email'));

    expect(toggleColumn).toHaveBeenNthCalledWith(1, 'name');
    expect(toggleColumn).toHaveBeenNthCalledWith(2, 'email');
    expect(toggleColumn).toHaveBeenCalledTimes(2);
  });

  it('allows toggling already selected column', () => {
    render(<ColumnSelector visibleColumns={['age' as ColumnKey]} onToggle={toggleColumn} />);

    fireEvent.click(screen.getByLabelText('Age'));

    expect(toggleColumn).toHaveBeenCalledTimes(1);
    expect(toggleColumn).toHaveBeenCalledWith('age');
  });

  it('handles unknown visibleColumns keys gracefully', () => {
    render(<ColumnSelector visibleColumns={['unknown' as ColumnKey]} onToggle={toggleColumn} />);

    expect((screen.getByLabelText('Name') as HTMLInputElement).checked).toBe(false);
    expect((screen.getByLabelText('Age') as HTMLInputElement).checked).toBe(false);
    expect((screen.getByLabelText('Email') as HTMLInputElement).checked).toBe(false);
  });

  it('has proper input attributes for accessibility', () => {
    render(<ColumnSelector visibleColumns={[]} onToggle={toggleColumn} />);

    const nameCheckbox = screen.getByLabelText('Name') as HTMLInputElement;

    expect(nameCheckbox.type).toBe('checkbox');
    expect(nameCheckbox.name).toBe('name');
    expect(nameCheckbox.id).toBe('column-name');
  });

  it('matches snapshot when all columns are visible', () => {
    const { container } = render(
      <ColumnSelector
        visibleColumns={['name' as ColumnKey, 'age' as ColumnKey, 'email' as ColumnKey]}
        onToggle={toggleColumn}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
