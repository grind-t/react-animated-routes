import { matchPath, RouteProps } from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';

function usePreviousRouteMatch(props: RouteProps) {
  const lastLocation = useLastLocation();
  return lastLocation ? matchPath(lastLocation.pathname, props) : null;
}

export default usePreviousRouteMatch;
