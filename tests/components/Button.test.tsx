import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '~/components/small/Button';

describe('Button', () => {
  it('renders children', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies additional className', () => {
    const { container } = render(<Button className="extra-class">Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('extra-class');
    expect(container).toMatchSnapshot();
  });

  it('is disabled when disabled prop is true', () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(container).toMatchSnapshot();
  });

  it('accepts type prop', () => {
    const { container } = render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(container).toMatchSnapshot();
  });

  it('accepts id prop', () => {
    const { container } = render(<Button id="my-button">ID Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('id', 'my-button');
    expect(container).toMatchSnapshot();
  });

  it('handles multiple classNames correctly', () => {
    const { container } = render(<Button className="first second">Classes</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('first');
    expect(button).toHaveClass('second');
    expect(container).toMatchSnapshot();
  });
});
