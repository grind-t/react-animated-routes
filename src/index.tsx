import React, { useState, useEffect } from 'react';
import { useLocation, matchPath, RouteProps } from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';
import { useTimeoutFn, useTimeout } from 'react-use';

interface CSSTransition {
  classNames?: string;
  timeout?: number;
  children?: React.ReactNode;
}

function mergeClassName(children: React.ReactNode, className: string) {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const childClassName = child.props.className;
    const mergedClassName = childClassName
      ? `${childClassName} ${className}`
      : className;
    return React.cloneElement(child, { className: mergedClassName });
  });
}

const EnterTransition = ({ classNames, timeout, children }: CSSTransition) => {
  const [phase, setPhase] = useState('enter');

  useEffect(() => setPhase('enter active'), []);
  useTimeoutFn(() => setPhase('done'), timeout);

  const className = classNames ? `${classNames} ${phase}` : phase;

  return <>{mergeClassName(children, className)}</>;
};

const LeaveTransition = ({ classNames, timeout, children }: CSSTransition) => {
  const [phase, setPhase] = useState('exit');
  const [isReady] = useTimeout(timeout);

  useEffect(() => setPhase('exit active'), []);

  if (isReady()) return null;

  const className = classNames ? `${classNames} ${phase}` : phase;

  return <>{mergeClassName(children, className)}</>;
};

type AnimatedRouteProps = Omit<RouteProps, 'children'> & CSSTransition;

const AnimatedRoute = ({
  classNames,
  timeout,
  children,
  ...rest
}: AnimatedRouteProps): JSX.Element | null => {
  const currentLocation = useLocation();
  const lastLocaction = useLastLocation();
  const currentMatch = matchPath(currentLocation.pathname, { ...rest });
  if (currentMatch)
    return (
      <EnterTransition classNames={classNames} timeout={timeout}>
        {children}
      </EnterTransition>
    );
  if (!lastLocaction) return null;
  const lastMatch = matchPath(lastLocaction.pathname, { ...rest });
  if (lastMatch)
    return (
      <LeaveTransition classNames={classNames} timeout={timeout}>
        {children}
      </LeaveTransition>
    );
  return null;
};

export default AnimatedRoute;
export type { AnimatedRouteProps };
