import React, { useEffect, useState } from 'react';
import { useTimeout } from 'react-use';

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
  const [isEntering, setIsEntering] = useState(entering);
  const [isReady, , reset] = useTimeout(duration);

  useEffect(() => {
    reset();
    setIsEntering(entering);
  }, [entering, reset]);

  if (!isEntering && isReady()) return null;

  const transitionClasses = isEntering
    ? isReady()
      ? 'entered'
      : 'enter entering'
    : 'leave leaving';
  const className = classNames
    ? `${classNames} ${transitionClasses}`
    : transitionClasses;

  return <>{mergeClassName(children, className)}</>;
};

export default CSSTransition;
export type { CSSTransitionProps };
