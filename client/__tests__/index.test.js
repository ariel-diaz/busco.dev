import React from 'react';
import { render } from '@testing-library/react';
import Home from '../pages/index';

it("renders Aerolab's logo", () => {
  const { getByTestId } = render(<Home />);

  expect(getByTestId('aerolab-logo')).toBeTruthy();
});
