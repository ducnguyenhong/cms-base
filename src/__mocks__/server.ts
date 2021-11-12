import { getApplication, getApplicationDetail } from './application';
import { postLogin } from './auth/login';
import { getEventDetail, getEventList } from './event';
import { getQuestionList } from './question';
import { getUserDetail, getUserList } from './user';

export const MOCK_DOMAIN = 'https://mock-api.hotqa.io';
export async function makeMockServer() {
  const { createServer } = await import('miragejs');

  return createServer({
    routes() {
      this.namespace = 'api';

      // auth
      this.post(`${MOCK_DOMAIN}/login`, postLogin, { timing: 1000 });

      // user
      this.get(`${MOCK_DOMAIN}/users`, getUserList);
      this.get(`${MOCK_DOMAIN}/user/1`, getUserDetail);

      // event
      this.get(`${MOCK_DOMAIN}/events`, getEventList);
      this.get(`${MOCK_DOMAIN}/event/1`, getEventDetail);

      // question
      this.get(`${MOCK_DOMAIN}/event/1/questions`, getQuestionList);
      // application
      this.get(`${MOCK_DOMAIN}/applications`, getApplication);
      this.get(`${MOCK_DOMAIN}/application/1`, getApplicationDetail);

      // Allow unhandled requests on the current domain to pass through
      this.passthrough();

      // If your API requests go to an external domain, pass those through by
      // specifying the fully qualified domain name
      this.passthrough(`${MOCK_DOMAIN}/**`);
      // this.passthrough(`${server}/**`);
    },
  });
}
