import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

test('renders a simple component', () => {
  const { getByText } = render(<div>Hello, AgroEdge!</div>);
  expect(getByText('Hello, AgroEdge!')).toBeInTheDocument();
});