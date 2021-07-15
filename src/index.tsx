import React from 'react';
import { useLocation, matchPath, RouteProps } from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';

type AnimatedRouteProps = Pick<
  RouteProps,
  'path' | 'exact' | 'sensitive' | 'strict'
> & {
  classNames?: string | CSSTransitionClassNames;
  timeout:
    | number
    | {
        appear?: number | undefined;
        enter?: number | undefined;
        exit?: number | undefined;
      };
  children?: React.ReactNode;
};

const AnimatedRoute = ({
  path,
  exact,
  sensitive,
  strict,
  classNames,
  timeout,
  children,
}: AnimatedRouteProps): JSX.Element | null => {
  const currentLocation = useLocation();
  const lastLocaction = useLastLocation();
  const routeProps = { path, exact, sensitive, strict };
  const currentMatch = matchPath(currentLocation.pathname, routeProps);
  if (!lastLocaction) return null;
  const lastMatch = matchPath(lastLocaction.pathname, routeProps);
  if (!currentMatch && !lastMatch) return null;
  return (
    <CSSTransition
      in={currentMatch !== null}
      classNames={classNames}
      timeout={timeout}
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

export default AnimatedRoute;
export type { AnimatedRouteProps };
