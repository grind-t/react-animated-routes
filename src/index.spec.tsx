import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Sample from './index';

describe('sample desc', () => {
  it('sample it', () => {
    render(<Sample />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
    screen.debug();
  });
});
