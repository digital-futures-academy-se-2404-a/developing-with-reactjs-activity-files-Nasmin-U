import { render } from '@testing-library/react';
import App from '../src/App';

describe('App render test', () => {
  test('App component renders correctly', () => {
    expect(render(<App />)).toBeTruthy();
  });
});
