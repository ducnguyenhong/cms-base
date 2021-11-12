import ImageError from 'assets/images/error-boundary.png';
import { FallbackProps } from 'react-error-boundary';

const ErrorFallback: React.FC<FallbackProps> = (props) => {
  const { error } = props;
  return (
    <div className="flex items-center justify-center mt-10 md:px-8 right-0 w-auto duration-500">
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden transform transition-all w-full">
        <div className="bg-white md:pt-32 pb-40">
          <div className="md:flex px-5 md:px-10 lg:px-32">
            <div className="items-center mx-auto md:mx-0 w-11/12 md:w-1/2 lg:w-1/4 flex-col flex">
              <img src={ImageError} alt="logo" className="w-80" />
            </div>

            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left mx-auto md:mx-0 md:ml-5 w-11/12 md:w-3/4 flex-col flex justify-center">
              <div>
                <span
                  className="text-4xl font-bold text-gray-900"
                  id="modal-headline"
                >
                  Something went wrong !
                </span>
              </div>
              <div className="mt-8">
                <p className="text-red-500 text-lg text-justify md:text-left">
                  {error.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
