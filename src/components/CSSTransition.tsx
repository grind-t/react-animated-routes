import React, { useEffect } from 'react';
import { useTimeoutFn } from 'react-use';
import { Phase, useCSSTransition } from '../hooks/useCSSTransition';

interface CSSTransitionProps {
  entering?: boolean;
  classNames?: string;
  duration?: number;
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

const CSSTransition = ({
  entering,
  classNames,
  duration,
  children,
}: CSSTransitionProps): JSX.Element | null => {
  const [phase, classes, done] = useCSSTransition(entering);
  const [, , reset] = useTimeoutFn(done, duration);

  useEffect(() => {
    if (phase === Phase.Start) reset();
  }, [phase, reset]);

  if (!entering && phase === Phase.End) return null;

  const className = classNames ? `${classNames} ${classes}` : classes;

  return <>{mergeClassName(children, className)}</>;
};

export default CSSTransition;
export type { CSSTransitionProps };
