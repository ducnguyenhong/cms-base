import { DoubleArrowIcon } from 'assets/icons/double-arrow';
import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { menu, MenuItem } from 'routes/menu-state';
import { toggleMenu } from 'store/action/menu-action';
import { getShowMenu } from 'store/selector/menu-selector';
interface SideBarProps {
  showMenuMobile?: boolean;
  onToggleMenuMobile: () => void;
}

interface SubMenuItemsProps {
  showMenu?: boolean;
  item: MenuItem;
}

const SubMenuItems: React.FC<SubMenuItemsProps> = memo((props) => {
  const { showMenu, item } = props;
  const { subItem } = item;
  const { pathname } = useLocation();

  const [expandMenu, setExpandMenu] = useState<boolean>(false);

  useEffect(() => {
    if (subItem && subItem.length) {
      const paths = subItem.map((sub) => sub.path);
      if (paths.includes(pathname)) {
        setExpandMenu(true);
      }
    }
  }, [pathname, subItem]);

  return (
    <div>
      <div
        onClick={() => setExpandMenu(!expandMenu)}
        className={clsx({
          'rounded-sm overflow-hidden flex w-full justify-between text-gray-500 hover:bg-gray-900 hover:text-blue-400 font-medium cursor-pointer items-center py-3 px-2':
            true,
          'pl-7': item.type === 'secondary' && showMenu,
        })}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div className="w-5 ml-2 ">
              {(showMenu || (!showMenu && item.type !== 'secondary')) && <i className={`${item.icon}`} />}
              {!showMenu && item.type === 'secondary' && <span className="text-sm">. . .</span>}
            </div>
            {showMenu && <span className="ml-2 block whitespace-nowrap">{item.title}</span>}
          </div>
          {showMenu && (
            <i
              className={clsx({
                'fas duration-300 mr-2': true,
                'fa-chevron-down': expandMenu,
                'fa-chevron-right': !expandMenu,
              })}
            />
          )}
        </div>
      </div>

      <div
        className={clsx({
          'duration-300': true,
          'h-0 overflow-hidden': !expandMenu,
          'h-auto': expandMenu,
        })}
      >
        {item.subItem?.map((subItem) => {
          return (
            <NavLink
              to={subItem.path || '/404'}
              className={clsx({
                'flex w-full justify-between text-gray-500 hover:bg-gray-900 hover:text-blue-400 font-medium cursor-pointer items-center py-3 px-4 transition-all delay-75':
                  true,
                'pl-10': subItem.type === 'secondary' && showMenu,
              })}
              activeClassName="text-blue-500 bg-gray-900 "
              key={subItem.path}
              exact
            >
              <div className="flex items-center whitespace-nowrap">
                <div className="w-5">
                  {showMenu && <i className={clsx('text-sm', `${subItem.icon}`)} />}
                  {!showMenu && <span className="text-sm">. . .</span>}
                </div>
                {showMenu && <span className="ml-2 font-medium">{subItem.title}</span>}
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
});

export default function Sidebar(props: SideBarProps) {
  const { showMenuMobile, onToggleMenuMobile } = props;
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');
  const showMenu = useSelector(getShowMenu);
  const dispatch = useDispatch();

  const handleClearSearch = () => {
    setKeyword('');
    setSearch('');
  };

  return (
    <div className="flex flex-no-wrap">
      <div
        className={clsx({
          'duration-300 hidden sm:block': true,
          'w-72': showMenu,
          'w-20': !showMenu,
        })}
      >
        <div className="w-full absolute sm:relative bg-gray-800 shadow md:h-full flex-col justify-between sm:flex">
          <div>
            <div
              className={clsx({
                'h-20 flex items-center': true,
                'justify-between px-3': showMenu,
                'justify-center': !showMenu,
              })}
            >
              {showMenu && (
                <label className="text-white w-full duration-300 font-bold text-2xl text-center block whitespace-nowrap ">
                  CMS
                </label>
              )}
              <span className="cursor-pointer" onClick={() => dispatch(toggleMenu(!showMenu))}>
                <DoubleArrowIcon
                  className={clsx({
                    'duration-300 hover:text-blue-500': true,
                    'transform rotate-180': !showMenu,
                  })}
                />
              </span>
            </div>

            <div className="flex justify-center mt-1 mb-4">
              <div className="relative w-full px-5">
                <div className="text-gray-500 absolute ml-9 inset-0 m-auto h-4 w-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-search"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx={10} cy={10} r={7} />
                    <line x1={21} y1={21} x2={15} y2={15} />
                  </svg>
                </div>
                <input
                  className=" bg-gray-700 focus:outline-none rounded w-full text-white pl-12 py-2"
                  type="text"
                  placeholder="Tìm kiếm"
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setSearch(e.target.value);
                  }}
                  value={keyword}
                />
                {keyword && (
                  <span
                    className="absolute right-7 top-2 cursor-pointer text-gray-500 hover:text-white"
                    onClick={handleClearSearch}
                  >
                    <i className="w-4 fas fa-times"></i>
                  </span>
                )}
              </div>
            </div>
            <ul className="mt-8">
              {menu
                .filter((o) => {
                  if (typeof search === 'undefined' || search === null || search === '') {
                    return true;
                  }

                  if (o.title.toLowerCase().includes(search.toLowerCase())) {
                    return true;
                  }

                  const hasElement = o.subMenu.find((m) => m.title.toLowerCase().includes(search.toLowerCase()));

                  return typeof hasElement !== 'undefined';
                })
                .map((item, index) => {
                  return (
                    <div className="mb-8 px-4" key={index}>
                      <p
                        className={clsx({
                          'text-gray-600 uppercase ml-3 mb-2 text-sm whitespace-nowrap': true,
                          'font-semibold ml-3.5': !showMenu,
                        })}
                      >
                        {showMenu ? item.title : '. . .'}
                      </p>
                      {item.subMenu
                        .filter((e) => typeof e.hidden === 'undefined' || !e.hidden)
                        .filter((e) => e.title.toLowerCase().includes(search?.toLowerCase() ?? ''))
                        .map((obj, key) => {
                          if (obj.subItem && obj.subItem.length) {
                            return <SubMenuItems key={key} showMenu={showMenu} item={obj} />;
                          }
                          return (
                            <NavLink
                              to={obj.path || '/404'}
                              className={clsx({
                                'rounded-sm overflow-hidden flex w-full justify-between text-gray-500 hover:bg-gray-900 hover:text-blue-400 font-medium cursor-pointer items-center py-3 px-2':
                                  true,
                                'pl-7': obj.type === 'secondary' && showMenu,
                              })}
                              activeClassName="text-blue-500 bg-gray-900"
                              key={key}
                              exact
                            >
                              <div className="flex items-center">
                                <div className="w-5 ml-2 ">
                                  {(showMenu || (!showMenu && obj.type !== 'secondary')) && (
                                    <i className={`${obj.icon}`} />
                                  )}
                                  {!showMenu && obj.type === 'secondary' && <span className="text-sm">. . .</span>}
                                </div>
                                {showMenu && <span className="ml-2 block whitespace-nowrap">{obj.title}</span>}
                              </div>
                            </NavLink>
                          );
                        })}
                    </div>
                  );
                })}
            </ul>
          </div>
          <div className="px-4 py-2 border-t border-gray-700">
            {showMenu ? (
              <span className="text-gray-500 whitespace-nowrap overflow-x-hidden duration-300">
                Version: <span className="text-blue-400 font-medium">{process.env.REACT_APP_VERSION}</span>
              </span>
            ) : (
              <span className="cursor-pointer" onClick={() => dispatch(toggleMenu(!showMenu))}>
                <DoubleArrowIcon
                  className={clsx({
                    'duration-300 hover:text-blue-500': true,
                    'transform rotate-180 block mx-auto': !showMenu,
                  })}
                />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* menu mobile */}
      <div
        className={clsx({
          'w-64 z-40 absolute bg-gray-800 shadow md:hidden md:h-full flex-col justify-between transform duration-300':
            true,
          '-translate-x-full': !showMenuMobile,
        })}
      >
        <div className="h-screen">
          <div className="px-2 h-16 w-full flex items-center justify-between">
            <p className="text-white font-bold text-2xl ml-5">CMS</p>
            <span
              onClick={onToggleMenuMobile}
              className={clsx('transform cursor-pointer w-1/5 flex items-center justify-center', {
                'rotate-180': !showMenuMobile,
                'rotate-0': showMenuMobile,
              })}
            >
              <DoubleArrowIcon />
            </span>
          </div>
          <div className="flex justify-center mt-5 mb-4">
            <div className="relative w-full px-3">
              <div className="text-gray-500 absolute ml-6 inset-0 m-auto h-4 w-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-search"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx={10} cy={10} r={7} />
                  <line x1={21} y1={21} x2={15} y2={15} />
                </svg>
              </div>
              <input
                className=" bg-gray-700 focus:outline-none rounded w-full text-sm text-white  pl-10 py-2"
                type="text"
                placeholder="Search"
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setSearch(e.target.value);
                }}
                value={keyword}
              />
              {keyword && (
                <span
                  className="absolute right-5 top-1.5 cursor-pointer text-gray-500 hover:text-white"
                  onClick={handleClearSearch}
                >
                  <i className="w-4 fas fa-times-circle"></i>
                </span>
              )}
            </div>
          </div>
          <ul className="mt-5">
            {menu
              .filter((o) => {
                if (typeof search === 'undefined' || search === null || search === '') {
                  return true;
                }

                if (o.title.toLowerCase().includes(search.toLowerCase())) {
                  return true;
                }

                const hasElement = o.subMenu.find((m) => m.title.toLowerCase().includes(search.toLowerCase()));

                return typeof hasElement !== 'undefined';
              })
              .map((item, index) => {
                return (
                  <div className="mb-2" key={index}>
                    <p className="text-xs text-gray-600 uppercase ml-3 mb-2">{item.title}</p>
                    {item.subMenu
                      .filter((e) => typeof e.hidden === 'undefined' || !e.hidden)
                      .filter((e) => e.title.toLowerCase().includes(search?.toLowerCase() ?? ''))
                      .map((obj, key) => {
                        if (obj.subItem && obj.subItem.length) {
                          return <SubMenuItems key={key} showMenu={showMenu} item={obj} />;
                        }

                        return (
                          <NavLink
                            to={obj.path || '/404'}
                            className={clsx({
                              'flex w-full justify-between text-gray-500 hover:bg-gray-900 hover:text-blue-400 font-semibold cursor-pointer items-center py-3 px-5 transition-all delay-75':
                                true,
                              'pl-10': obj.type === 'secondary',
                            })}
                            activeClassName="text-blue-500 font-semibold bg-gray-900 "
                            key={key}
                            exact
                          >
                            <div className="flex items-center">
                              <div className="w-5">
                                <i className={clsx('text-sm', `${obj.icon}`)} />
                              </div>
                              <span className="text-sm  ml-2">{obj.title}</span>
                            </div>
                          </NavLink>
                        );
                      })}
                  </div>
                );
              })}
          </ul>
        </div>
        <div className="px-4 py-2 border-t border-gray-700">
          <span className="text-gray-500">
            Version: <span className="text-blue-400 font-medium">{process.env.REACT_APP_VERSION}</span>
          </span>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}
