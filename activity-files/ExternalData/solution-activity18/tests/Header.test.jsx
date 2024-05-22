import { render } from '@testing-library/react';
import Header from '../src/Components/Header';

test(`Header matches snapshot`, () => {
  const headerComponent = render(<Header />);

  expect(headerComponent).toMatchSnapshot();
});