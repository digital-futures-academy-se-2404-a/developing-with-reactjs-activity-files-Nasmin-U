import { render } from '@testing-library/react';
import Header from '../src/Components/Header';

test(`Header matches snapshot`, () => {
  expect(render(<Header />)).toMatchSnapshot();
});