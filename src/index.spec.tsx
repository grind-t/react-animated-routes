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
          <Link
            to={{
              pathname: '/b',
              state: { transition: { classNames: 'slide' } },
            }}
          >
            Link b
          </Link>
          <Link to="/с">Link c</Link>

          <AnimatedRoute classNames="fade" timeout={1000} path="/a">
            <span>a</span>
          </AnimatedRoute>
          <AnimatedRoute classNames="fade" timeout={1000} path="/b">
            <span>b</span>
          </AnimatedRoute>
          <AnimatedRoute classNames="fade" timeout={1000} path="/с">
            <span>с</span>
          </AnimatedRoute>
        </LastLocationProvider>
      </BrowserRouter>
    );
    const linkA = screen.getByText('Link a');
    const linkB = screen.getByText('Link b');
    const linkC = screen.getByText('Link c');
    fireEvent.click(linkA);
    expect(screen.getByText('a')).toBeInTheDocument();
    fireEvent.click(linkB);
    expect(screen.getByText('b')).toBeInTheDocument();
    fireEvent.click(linkC);
    expect(screen.getByText('c')).toBeInTheDocument();
    screen.debug();
    /*
    await waitFor(() => {
      expect(screen.queryByText('a')).not.toBeInTheDocument();
    });
    screen.debug();*/
  });
});
