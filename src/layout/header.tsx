import BackgroundDialog from 'assets/images/bg-user-dialog.jpg';
import DefaultAvatar from 'assets/images/default-avatar.png';
import { BreadCrumbs } from 'component/bread-crumb';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/reducer/auth-slice';
import { getAuthRequest } from '../store/selector/auth-selector';

interface HeaderProps {
  onToggleMenuMobile: () => void;
}

export default function Header(props: HeaderProps) {
  const { onToggleMenuMobile } = props;
  const dispatch = useDispatch();
  const userInfo = useSelector(getAuthRequest);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const userDialogRef = useRef<HTMLDivElement>(null);

  const logoutAction = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const useOutsideElement = (ref: RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const onClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowUserDialog(false);
        }
      };
      document.addEventListener('mousedown', onClickOutside);
      return () => {
        document.removeEventListener('mousedown', onClickOutside);
      };
    }, [ref]);
  };

  useOutsideElement(userDialogRef);

  return (
    <div className="z-30 flex items-center sticky left-0 top-0 right-0 w-auto justify-between bg-white duration-500">
      <nav className="p-1 rounded m-4 ">
        <BreadCrumbs />
        <div className="md:hidden text-2xl text-gray-500" onClick={onToggleMenuMobile}>
          <i className="fas fa-bars" />
        </div>
      </nav>
      <div className="flex pr-5" ref={userDialogRef}>
        <div
          className="flex items-center justify-center px-4 cursor-pointer rounded-md py-2 my-2 hover:bg-gray-100"
          onClick={() => setShowUserDialog(!showUserDialog)}
        >
          <img alt={userInfo?.username} src={userInfo?.avatar || DefaultAvatar} className="w-10 h-10 object-cover" />
          <div className="text-right ml-2">
            <div className="font-semibold">{userInfo?.fullname}</div>
            <div className="text-gray-500 text-sm text-center">{userInfo?.type}</div>
          </div>
        </div>

        {showUserDialog && (
          <div
            className="header rounded origin-top-right absolute right-2 mt-20 shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            style={{ width: 350 }}
          >
            <div
              className="flex px-6 py-8"
              style={{
                backgroundImage: `url(${BackgroundDialog})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <img className="rounded-full w-16" src={userInfo?.avatar || DefaultAvatar} alt="user avatar" />
              <div className="ml-4">
                <span className="text-white text-xl">
                  {userInfo?.fullname} <span className="opacity-50 text-lg ml-3">#{userInfo?.id}</span>
                </span>
                <div className="flex items-center text-white opacity-50">
                  <span className="text-white text-lg">@{userInfo?.username}</span>
                </div>
              </div>
            </div>
            <Link
              to="/profile"
              className=" px-4 py-5 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => setShowUserDialog(false)}
            >
              <i className="fas fa-info-circle mr-2"></i>
              <span>Trang cá nhân</span>
            </Link>
            <button
              className="m-4 bg-blue-100 hover:bg-blue-600 px-4 py-2 rounded group duration-300"
              onClick={logoutAction}
            >
              <span className="duration-300 font-semibold text-blue-500 group-hover:text-white">Đăng xuất</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
