import { Fragment, useMemo } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { allMenu } from 'routes/menu-state';

export function BreadCrumbs() {
  const { params } = useRouteMatch<Record<string, string>>();
  const { pathname } = useLocation();
  const arrPathname = pathname.split('/'); // '', path, id

  const rootSubMenu = allMenu;
  const newSubMenu = rootSubMenu.reduce(
    (prev, curr) => {
      let result = [...prev, curr];
      if (curr.subItem) {
        result = [...result, ...curr.subItem];
      }
      return result;
    },
    [allMenu[0]],
  );

  if (newSubMenu[0]) {
    newSubMenu.shift();
  }

  const items = useMemo(() => {
    const matched: { title: string; link?: string }[] = [];
    for (let i = 0; i < newSubMenu.length; i += 1) {
      const tmp = newSubMenu[i];

      if (!`${tmp.path}/`.startsWith(`/${arrPathname[1]}/`)) {
        continue;
      }

      let path = pathname;
      if (Object.keys(params).length > 0) {
        path = Object.keys(params).reduce((path, param) => path.replace(`:${param}`, params[param]), path);
      }

      matched.push({
        title: tmp.title,
        link: tmp.type === 'secondary' ? `${tmp?.path?.replace(':id', arrPathname[2])}` : tmp.path,
      });
    }

    return matched;
  }, [pathname, params, arrPathname, newSubMenu]);

  return (
    <ol className="list-reset hidden md:flex">
      <li>
        <Link to="/" className="font-bold">
          <i className="fas fa-home text-black" />
        </Link>
      </li>

      {items.map((o, idx) => {
        return (
          <Fragment key={`${JSON.stringify(o)}_${idx}`}>
            <li>
              <i className="mx-4 fas fa-angle-right"></i>
            </li>
            <li>
              {o.link ? (
                <Link to={o.link} className="text-gray hover:text-blue-600 font-semibold">
                  {o.title}
                </Link>
              ) : (
                o.title
              )}
            </li>
          </Fragment>
        );
      })}
    </ol>
  );
}
