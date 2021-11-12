import { NavLink, useRouteMatch } from 'react-router-dom';

interface TabType {
  title: string;
  route: string;
  icon?: string;
  exact?: boolean;
}

const EVENT_DETAIL_TABS: TabType[] = [
  { title: 'Thông tin', route: 'information', icon: 'fas fa-info-circle', exact: true },
  { title: 'Cập nhật', route: 'update', icon: 'fas fa-edit', exact: true },
];

export const UserTabControl: React.FC = () => {
  const { url } = useRouteMatch();

  return (
    <div className="mt-5">
      <div className="md:flex pt-2 border border-t-0 border-l-0 border-r-0">
        {EVENT_DETAIL_TABS.map((item) => {
          const { route, title, icon, exact } = item;
          return (
            <NavLink
              to={`${url}/${route}`}
              key={`event_detail_${route}`}
              className="flex mr-8 items-center text-gray-400 cursor-pointer px-2 py-3 hover:border-b-2 font-bold "
              activeClassName="text-blue-500 border-b-2 border-blue-500"
              exact={exact}
            >
              <i className={`${icon} mr-2.5`} />
              <span className="whitespace-nowrap">{title}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
