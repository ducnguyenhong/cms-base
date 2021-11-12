import { LoadingComponent } from '@ekidpro/ui.loading';
import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { UserType } from 'types/user.type';

const UserTabInfo = lazy(() => import('page/user/user-detail/user-detail.tab-info'));
const ProfileUpdate = lazy(() => import('./profile.update-info'));
const ChangePassword = lazy(() => import('./profile.change-password'));

interface UserContentProps {
  userInfo?: UserType | undefined;
}

export const ProfileTabContent: React.FC<UserContentProps> = (props) => {
  const { userInfo } = props;
  const { path } = useRouteMatch();

  return (
    <Suspense fallback={<LoadingComponent />}>
      <Switch>
        <Route path={`${path}/information`}>
          <UserTabInfo userInfo={userInfo} />
        </Route>

        <Route path={`${path}/update`}>
          <ProfileUpdate />
        </Route>

        <Route path={`${path}/profile`}>
          <ChangePassword />
        </Route>

        <Redirect to={`${path}/information`} />
      </Switch>
    </Suspense>
  );
};
