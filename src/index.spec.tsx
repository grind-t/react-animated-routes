import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AnimatedRoute from './index';
import { BrowserRouter, Link } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

describe('sample desc', () => {
  it('sample it', async () => {
    render(
      <BrowserRouter>
        <LastLocationProvider>
          <Link to="/a">Link a</Link>
          <Link to="/b">Link b</Link>

          <AnimatedRoute classNames="fade" duration={1000} path="/a">
            <span>a</span>
          </AnimatedRoute>
          <AnimatedRoute classNames="fade" duration={1000} path="/b">
            <span>b</span>
          </AnimatedRoute>
        </LastLocationProvider>
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('Link a'));
    screen.debug();
    expect(screen.getByText('a')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Link b'));
    screen.debug();
    expect(screen.getByText('b')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('a')).not.toBeInTheDocument();
    });
    screen.debug();
  });
});
