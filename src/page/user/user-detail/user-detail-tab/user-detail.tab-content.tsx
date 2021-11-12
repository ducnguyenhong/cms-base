import { LoadingComponent } from '@ekidpro/ui.loading';
import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { UserType } from 'types/user.type';

const UserTabInfo = lazy(() => import('page/user/user-detail/user-detail.tab-info'));
const UserCreate = lazy(() => import('page/user/user-create'));

interface UserContentProps {
  userInfo?: UserType | undefined;
}

export const UserTabContent: React.FC<UserContentProps> = (props) => {
  const { userInfo } = props;
  const { path } = useRouteMatch();

  return (
    <Suspense fallback={<LoadingComponent />}>
      <Switch>
        <Route path={`${path}/information`}>
          <UserTabInfo userInfo={userInfo} />
        </Route>

        <Route path={`${path}/update`}>
          <UserCreate />
        </Route>

        <Redirect to={`${path}/information`} />
      </Switch>
    </Suspense>
  );
};
