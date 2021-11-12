import { LoadingComponent } from '@ekidpro/ui.loading';
import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';


const ApplicationCreate = lazy(() => import('page/application/application-create'));
const EventList = lazy(() => import('page/application/application-detail/event-list'));

export const ApplicationTabContent: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Suspense fallback={<LoadingComponent />}>
      <Switch>

        <Route path={`${path}/events`}>
          <EventList />
        </Route>

        <Route path={`${path}/update`}>
          <ApplicationCreate />
        </Route>

        <Redirect to={`${path}/events`} />
      </Switch>
    </Suspense>
  );
};
