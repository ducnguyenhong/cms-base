import { lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { RoutePath } from './route-path';

const LoginPage = lazy(() => import('page/login'));

export function AuthRouter() {
  return (
    <Switch>
      <Route exact path={RoutePath.login} component={LoginPage} />
      <Redirect to={RoutePath.login} />
    </Switch>
  );
}
