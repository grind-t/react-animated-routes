import React from 'react';
import { useRouteMatch, RouteProps } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimatedRouteProps = Pick<
  RouteProps,
  'location' | 'path' | 'exact' | 'sensitive' | 'strict'
> &
  CSSTransitionProps;

const AnimatedRoute = ({
  location,
  path,
  exact,
  sensitive,
  strict,
  children,
  ...rest
}: AnimatedRouteProps): JSX.Element => {
  const match = useRouteMatch({ location, path, exact, sensitive, strict });

  return (
    <CSSTransition in={match !== null} mountOnEnter unmountOnExit {...rest}>
      {children}
    </CSSTransition>
  );
};

export default AnimatedRoute;
export type { AnimatedRouteProps };
