import { render, screen } from '@testing-library/react';
import ComponentWithProps from '../src/ComponentWithProps.jsx';

  test(`it should render the correct heading from props when a header prop is supplied`, () => {
    const testHeaderValue = `Test Header`;
    render(<ComponentWithProps header={testHeaderValue} />);

    expect(screen.getByText(testHeaderValue)).toBeInTheDocument();
  });

  test(`it should render the correct content from props when a content prop is supplied`, () => {
    const testContentValue = `Test Content`;
    render(<ComponentWithProps content={testContentValue} />);

    expect(screen.getByText(testContentValue)).toBeInTheDocument();
  });

  test(`it should render the correct number from props when a number prop is supplied`, () => {
    const testNumber = 10000;
    render(<ComponentWithProps number={testNumber} />);

    expect(screen.getByTestId(`numberPara`).textContent).toContain(testNumber.toString());
  });
