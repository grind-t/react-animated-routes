import React, { ReactNode } from 'react';
import { useLocation, matchPath, RouteProps } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import { useLastLocation } from 'react-router-last-location';
import { RemoveIndex, DistributiveOmit } from './utils';

type CustomRouteProps = Pick<
  RouteProps,
  'location' | 'path' | 'exact' | 'sensitive' | 'strict'
>;

// Da, eto pizdec.
type CustomTransitionProps = DistributiveOmit<
  RemoveIndex<CSSTransitionProps>,
  'children'
>;

type AnimatedRouteProps = CustomRouteProps &
  CustomTransitionProps & { children: ReactNode };

interface LocationState {
  transition?: CustomTransitionProps;
}

const AnimatedRoute = ({
  location,
  path,
  exact,
  sensitive,
  strict,
  children,
  ...transition
}: AnimatedRouteProps): JSX.Element => {
  const routerLocation = useLocation();
  location = location || routerLocation;
  const lastLocation = useLastLocation();
  const match = matchPath(location.pathname, {
    path,
    exact,
    strict,
    sensitive,
  });
  const locationState = (match ? location.state : lastLocation?.state) as
    | LocationState
    | undefined;
  const overrideTransition = locationState?.transition;

  return (
    <CSSTransition
      in={match !== null}
      mountOnEnter
      unmountOnExit
      {...transition}
      {...overrideTransition}
    >
      {children}
    </CSSTransition>
  );
};

export default AnimatedRoute;
export type { AnimatedRouteProps };
