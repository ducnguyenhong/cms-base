import axios from 'axios';

let interceptorId: number | null = null;

export function setupAxios(token?: string) {
  if (interceptorId) {
    axios.interceptors.request.eject(interceptorId);
  }

  interceptorId = axios.interceptors.request.use(
    (config) => {
      if (!config.url?.startsWith('https://')) {
        config.url = `${process.env.REACT_APP_API_DOMAIN}${config.url}`;
      }
      if (token && token !== '') {
        const currentAuthorization = config?.headers?.Authorization;
        if (
          typeof currentAuthorization === 'undefined' ||
          currentAuthorization === null ||
          currentAuthorization === ''
        ) {
          config.headers = {
            ...config.headers,
            Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`,
          };
        }
      }

      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    },
  );
}
