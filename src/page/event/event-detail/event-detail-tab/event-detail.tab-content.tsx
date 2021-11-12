import { LoadingComponent } from '@ekidpro/ui.loading';
import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

const QuestionList = lazy(() => import('page/event/event-detail/question-list'));
const EventCreate = lazy(() => import('page/event/event-create'));

export const EventTabContent: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Suspense fallback={<LoadingComponent />}>
      <Switch>
        <Route path={`${path}/questions`}>
          <QuestionList />
        </Route>

        <Route path={`${path}/update`}>
          <EventCreate />
        </Route>

        <Redirect to={`${path}/questions`} />
      </Switch>
    </Suspense>
  );
};
