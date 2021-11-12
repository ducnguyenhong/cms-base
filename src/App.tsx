import { LoadingPage } from 'layout/loading-page';
import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthRouter } from 'routes/auth-router';
import { MainRouter } from 'routes/main-router';
import { getToken } from 'store/selector/auth-selector';
import { setupAxios } from 'utils/setup-axios';

// mock data
if (process.env.REACT_APP_MOCK_ENABLE) {
  import('./__mocks__/server')
    .then((data) => data.makeMockServer())
    .then((data) => {
      console.log('Start MOCK Server Completed');
    })
    .catch((err) => {
      console.error(`Error on start mock server`, err);
    });
}
// end mock data

function App() {
  const token = useSelector(getToken);

  // mock data
  useEffect(() => {
    const cleanup = () => {
      // do something
    };

    // if (process.env.NODE_ENV !== 'development' || !token || token === 'undefined') {
    //   return cleanup;
    // }

    import('./__mocks__/server')
      .then((data) => data.makeMockServer())
      .then((data) => {
        console.log('Start MOCK Server Completed');
      })
      .catch((err) => {
        console.error(`Error on start mock server`, err);
      });
    return cleanup;
  }, [token]);
  // end mock data

  useEffect(() => {
    setupAxios(token);
  }, [token]);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        {!token || token === 'undefined' ? <AuthRouter /> : <MainRouter />}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
