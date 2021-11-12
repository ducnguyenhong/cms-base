import { lazy } from 'react';
import { RoutePath } from './route-path';

// const ComingSoon = lazy(() => import('layout/coming-soon'));
const Dashboard = lazy(() => import('page/dashboard'));
const Profile = lazy(() => import('page/profile'));

const UserList = lazy(() => import('page/user/user-list'));
const UserCreate = lazy(() => import('page/user/user-create'));
const UserDetail = lazy(() => import('page/user/user-detail'));

const EventList = lazy(() => import('page/event/event-list'));
const EventCreate = lazy(() => import('page/event/event-create'));
const EventDetail = lazy(() => import('page/event/event-detail'));

const ApplicationList = lazy(() => import('page/application/application-list'));
const ApplicationCreate = lazy(() => import('page/application/application-create'));
const ApplicationDetail = lazy(() => import('page/application/application-detail'));

export type MenuItem = {
  title: string;
  icon?: string;
  hidden?: boolean;
  exact?: boolean;
  path?: string;
  main?: any;
  type?: 'primary' | 'secondary';
  subItem?: MenuItem[];
};

export type Menu = {
  title: string;
  subMenu: MenuItem[];
};

export const menuDashboard: MenuItem[] = [
  {
    title: 'Bảng điều khiển',
    icon: 'fas fa-tachometer-alt',
    path: RoutePath.dashboard,
    main: () => <Dashboard />,
    exact: true,
  },
];

export const menuUser: MenuItem[] = [
  {
    title: 'Chi tiết người dùng',
    path: RoutePath.userDetail,
    main: () => <UserDetail />,
    hidden: true,
  },
  {
    title: 'Tạo người dùng',
    path: RoutePath.createUser,
    main: () => <UserCreate />,
    type: 'secondary',
    hidden: true,
    exact: true,
  },
  {
    title: 'Người dùng',
    icon: 'fas fa-user-circle',
    subItem: [
      {
        title: 'Tất cả người dùng',
        path: RoutePath.users,
        icon: 'fas fa-users',
        main: () => <UserList />,
        exact: true,
        type: 'secondary',
      },
      {
        title: 'App owner',
        icon: 'fas fa-user-shield',
        path: RoutePath.appOwnerUsers,
        main: () => <UserList type="APP_OWNER" title="Danh sách App owner" />,
        exact: true,
        type: 'secondary',
      },
      {
        title: 'Editor',
        icon: 'fas fa-user-edit',
        path: RoutePath.editorUsers,
        main: () => <UserList type="EDITOR" title="Danh sách Editor" />,
        exact: true,
        type: 'secondary',
      },
      {
        title: 'Competitor',
        icon: 'fas fa-user-graduate',
        path: RoutePath.competitorUsers,
        main: () => <UserList type="COMPETITOR" title="Danh sách Competitor" />,
        exact: true,
        type: 'secondary',
      },
      {
        title: 'Host',
        icon: 'fas fa-user-check',
        path: RoutePath.hostUsers,
        main: () => <UserList type="HOST" title="Danh sách Host" />,
        exact: true,
        type: 'secondary',
      },
    ],
  },
  {
    title: 'Thông tin cá nhân',
    path: RoutePath.profile,
    main: () => <Profile />,
    hidden: true,
  },
];

export const menuContent: MenuItem[] = [
  {
    title: 'Ứng dụng',
    icon: 'fas fa-th',
    path: RoutePath.applications,
    main: () => <ApplicationList />,
    exact: true,
  },
  {
    title: 'Tạo ứng dụng',
    path: RoutePath.createApplication,
    main: () => <ApplicationCreate />,
    type: 'secondary',
    hidden: true,
    exact: true,
  },
  {
    title: 'Chi tiết ứng dụng',
    path: RoutePath.applicationDetail,
    main: () => <ApplicationDetail />,
    hidden: true,
  },
  {
    title: 'Sự kiện',
    icon: 'fas fa-calendar-week',
    path: RoutePath.events,
    main: () => <EventList />,
    exact: true,
  },
  {
    title: 'Tạo sự kiện',
    path: RoutePath.createEvent,
    main: () => <EventCreate />,
    type: 'secondary',
    hidden: true,
    exact: true,
  },
  {
    title: 'Chi tiết sự kiện',
    path: RoutePath.eventDetail,
    main: () => <EventDetail />,
    hidden: true,
  },
];

export const menu: Menu[] = [
  { title: 'Bảng điều khiển', subMenu: menuDashboard },
  { title: 'Nội dung', subMenu: menuContent },
  { title: 'Người dùng', subMenu: menuUser },
];

export const allMenu = [...menuUser, ...menuContent, ...menuDashboard];
