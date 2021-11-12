import { LoadingComponent } from '@ekidpro/ui';
import ErrorFallback from 'layout/error-fallback';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Redirect, Route, Switch } from 'react-router-dom';
import DefaultLayout from '../layout/default-layout';
import { menu } from './menu-state';
import { RoutePath } from './route-path';

const NotFoundPage404 = lazy(() => import('page/404'));


export function MainRouter() {
  const prevLink = sessionStorage.getItem('prev_login_path');

  return (
    <DefaultLayout>
      <Suspense fallback={<LoadingComponent />}>
        <Switch>
          {menu.map((obj) => {
            // gộp các menu item và các sub menu item
            const rootSubMenu = obj.subMenu.slice(0);
            const newSubMenu = rootSubMenu.reduce(
              (prev, curr) => {
                let result = [...prev, curr];
                if (curr.subItem) {
                  result = [...result, ...curr.subItem];
                }
                return result;
              },
              [rootSubMenu[0]],
            );

            if (newSubMenu[0]) {
              newSubMenu.shift();
            }

            return newSubMenu
              .filter((o) => o.path !== null)
              .map((route, index) => {
                return (
                  <Route path={route.path || '/404'} key={route.path || ''}>
                    <ErrorBoundary key={route.path} FallbackComponent={ErrorFallback}>
                      {route.main && (
                        <Route key={index} path={route.path} exact={route.exact} children={<route.main />} />
                      )}
                    </ErrorBoundary>
                  </Route>
                );
              });
          })}

          <Route exact path={RoutePath.notFound} component={NotFoundPage404} />

          <Redirect exact from={RoutePath.login} to={prevLink ?? RoutePath.dashboard} />
          <Redirect exact from="/" to={RoutePath.dashboard} />

          <Route path="*" component={NotFoundPage404} />
        </Switch>
      </Suspense>
    </DefaultLayout>
  );
}
