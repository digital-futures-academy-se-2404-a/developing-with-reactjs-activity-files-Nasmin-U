import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Header from '../src/Components/Header';

test('should put class show on the nav bar when toggler is clicked', async () => {
  
  render(<Header />, {wrapper : MemoryRouter});

  const toggleButton = screen.getByRole('button');

  await userEvent.click(toggleButton);

  const menu = await screen.findByTestId(/collapsemenu/i);

  expect(menu).toHaveClass(`show`);
});

test('should remove class show on the nav bar when toggler is clicked a second time', async () => {
  
  render(<Header />, {wrapper : MemoryRouter});

  const toggleButton = screen.getByRole('button');

  await userEvent.click(toggleButton);

  await userEvent.click(toggleButton);

  const menu = await screen.findByTestId(/collapsemenu/i);

  expect(menu).not.toHaveClass(`show`);
});

