import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AnimatedRoute from './index';
import { BrowserRouter, Link } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

type ProvidersProps = { children: React.ReactNode };
const Providers = ({ children }: ProvidersProps) => (
  <BrowserRouter>
    <LastLocationProvider>{children}</LastLocationProvider>
  </BrowserRouter>
);

it('should unmount on exit by default', async () => {
  render(
    <Providers>
      <Link to="/other" />
      <AnimatedRoute timeout={10} exact path="/">
        <div>root</div>
      </AnimatedRoute>
    </Providers>
  );
  expect(screen.getByText('root')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link'));
  await waitForElementToBeRemoved(() => screen.queryByText('root'));
});

it('should override transition', async () => {
  render(
    <Providers>
      <Link
        to={{
          pathname: '/a',
          state: { transition: { classNames: 'slide' } },
        }}
      />

      <AnimatedRoute classNames="fade" timeout={10} path="/a">
        <div>a</div>
      </AnimatedRoute>
    </Providers>
  );
  fireEvent.click(screen.getByRole('link'));
  expect(screen.getByText('a')).toHaveClass('slide-enter slide-enter-active');
});

it("shouldn't override active exit transition", () => {
  render(
    <Providers>
      <Link to="/a" />
      <Link
        to={{
          pathname: '/b',
          state: { transition: { classNames: 'slide' } },
        }}
      />
      <Link to="/c" />

      <AnimatedRoute classNames="fade" timeout={10} path="/a">
        <div>a</div>
      </AnimatedRoute>
      <AnimatedRoute classNames="fade" timeout={10} path="/b">
        <div>b</div>
      </AnimatedRoute>
    </Providers>
  );
  screen.getAllByRole('link').forEach((link) => fireEvent.click(link));
  expect(screen.getByText('a')).toHaveClass('fade-exit fade-exit-active');
  expect(screen.getByText('b')).toHaveClass('slide-exit slide-exit-active');
});
