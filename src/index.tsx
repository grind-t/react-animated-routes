import React from 'react';
import { useRouteMatch, RouteProps } from 'react-router-dom';
import usePreviousRouteMatch from './hooks/usePreviousRouteMatch';
import CSSTransition, { CSSTransitionProps } from './components/CSSTransition';

type AnimatedRouteProps = Omit<RouteProps, 'children'> &
  Omit<CSSTransitionProps, 'leave'>;

const AnimatedRoute = ({
  classNames,
  duration,
  children,
  ...rest
}: AnimatedRouteProps): JSX.Element | null => {
  const currMatch = useRouteMatch({ ...rest });
  const prevMatch = usePreviousRouteMatch({ ...rest });
  if (!currMatch && !prevMatch) return null;
  return (
    <CSSTransition
      entering={currMatch !== null}
      classNames={classNames}
      duration={duration}
    >
      {children}
    </CSSTransition>
  );
};

export default AnimatedRoute;
export type { AnimatedRouteProps };
