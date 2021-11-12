import Image404 from 'assets/images/404.jpg';
import { Link } from 'react-router-dom';

export const ErrorPage404: React.FC = () => {
  return (
    <div className="bg-white w-full rounded p-10 md:px-10 md:py-20">
      <div className="flex justify-center">
        <span className="px-4 py-2 rounded text-gray-600 duration-300 uppercase text-3xl font-semibold">
          Không tồn tại trang!
        </span>
      </div>
      <div className="flex justify-center">
        <img src={Image404} alt="not found" className="h-96" />
      </div>
      <div className="flex justify-center">
        <Link
          to="/"
          className="px-4 py-2 rounded bg-green-500 font-medium text-gray-50 duration-300 hover:bg-green-600"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
};
