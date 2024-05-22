import { render } from '@testing-library/react';
import Header from '../src/Components/Header';
import { MemoryRouter } from 'react-router-dom';

test(`Header matches snapshot`, () => {
  const headerComponent = render(<MemoryRouter><Header /></MemoryRouter>);

  expect(headerComponent).toMatchSnapshot();
});