import { useCallback, useEffect, useState } from 'react';

enum Phase {
  Start,
  Active,
  End,
}

const enteringClasses = ['enter', 'enter entering', 'entered'];
const leavingClasses = ['leave', 'leave leaving', 'left'];

function useCSSTransition(isEntering?: boolean): [Phase, string, () => void] {
  const [prevIsEntering, setPrevIsEntering] = useState(isEntering);
  const [phase, setPhase] = useState<Phase>(Phase.Start);
  const done = useCallback(() => setPhase(Phase.End), []);

  useEffect(() => {
    if (phase === Phase.Start) setPhase(Phase.Active);
  }, [phase]);

  if (isEntering !== prevIsEntering) {
    setPhase(Phase.Start);
    setPrevIsEntering(isEntering);
  }

  const classes = isEntering ? enteringClasses[phase] : leavingClasses[phase];
  return [phase, classes, done];
}

export { useCSSTransition, Phase };
