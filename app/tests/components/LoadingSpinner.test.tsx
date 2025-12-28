import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from '~/components/small/Spinner';

describe('Spinner', () => {
  it('renders the spinner container', () => {
    render(<Spinner />);
    const container = document.querySelector('.flex.justify-center.items-center');
    expect(container).toBeInTheDocument();
  });

  it('renders the spinner div', () => {
    render(<Spinner />);
    const spinner = document.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Spinner />);
    expect(asFragment()).toMatchSnapshot();
  });
});
