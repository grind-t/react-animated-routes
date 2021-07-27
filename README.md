# react-animated-routes

Small wrapper over the [Route](https://reactrouter.com/web/api/Route) and [CSSTransition](http://reactcommunity.org/react-transition-group/css-transition) with the ability to override CSSTransition props.

## Install

```sh
npm i react-animated-routes
# You also need to make sure you have peer dependencies installed
npm i react react-dom react-router-dom react-router-last-location
```

## Basic usage

`<AnimatedRoute />` combines `<Route />` and `<CSSTransition />` logic and props, so it's easier to use:

```jsx
// You can write
<AnimatedRoute exact path="/page" timeout={300} classNames="fade">
    <div>Page</div>
</AnimatedRoute>

// Instead of
<Route exact path="/page">
  {({ match }) => (
    <CSSTransition
      in={match != null}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <div>Page</div>
    </CSSTransition>
  )}
</Route>
```

## Override props

You can also override CSSTransition props with location state.

To do this, you need to declare `<LastLocationProvider />` inside `<Router />`:

```jsx
import { BrowserRouter as Router } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

const App = () => (
  <Router>
    <LastLocationProvider>...</LastLocationProvider>
  </Router>
);
```

Then you can override CSSTransition props with [history object](https://reactrouter.com/web/api/history) or [Link component](https://reactrouter.com/web/api/Link):

```jsx
// Override CSSTransition props
const transition = { timeout: 400, classNames="slide" };

// With history object
history.push('/page', { transition });

// Or Link component
<Link
  to={{
    pathname: '/page',
    state: { transition },
  }}
/>
```

## Demo

[See it in action](https://codesandbox.io/s/ne8bm).
