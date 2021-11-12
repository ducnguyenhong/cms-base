import { NavLink, useRouteMatch } from "react-router-dom";

interface TabType {
  title: string;
  route: string;
  icon?: string;
  exact?: boolean;
}

const APPLICATION_DETAIL_TABS: TabType[] = [
  { title: 'Sự kiện', route: 'events', icon: 'fas fa-calendar-week', exact: true },
  { title: 'Cập nhật ứng dụng', route: 'update', icon: 'fas fa-edit', exact: true },
];

export const ApplcationTab = () => {
  const { url } = useRouteMatch();
  return (
    <div className="px-4 py-6 flex flex-col space-y-2 backdrop-filter backdrop-blur">
      {APPLICATION_DETAIL_TABS.map((item) => {
        const { route, title, icon, exact } = item;
        return (
          <NavLink
            to={`${url}/${route}`}
            key={`application_detail_${route}`}
            className="px-4 py-4 hover:text-blue-500 hover:bg-gray-100 cursor-pointer rounded-md text-gray-500 text-sm"
            activeClassName="text-blue-500 bg-gray-100 text-base font-medium"
            exact={exact}
          >
            <i className={`${icon} pr-3 w-8`} />
            {title}
          </NavLink>
        );
      })}
    </div>
  )
}