import { Registry, Request, Response } from 'miragejs';
import { AnyFactories, AnyModels } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

export function postLogin(schema: Schema<Registry<AnyModels, AnyFactories>>, request: Request) {
  const body = JSON.parse(request.requestBody);
  const { username, password } = body;

  if (username === 'admin' && password === '123456') {
    return {
      code: 200,
      ok: true,
      data: {
        token: '123456',
        refresh_token: '123456',
        user_info: {
          id: 1,
          username: 'admin',
          fullname: 'Admin Local',
          avatar: null,
          type: 'ADMIN',
        },
      },
    };
  }

  if (username === 'nonadmin' && password === 'test02') {
    return {
      code: 200,
      ok: true,
      data: {
        token: 'abcxyz',
        refreshToken: '123456',
        user: {
          id: 2,
          username: 'nonadmin',
          avatar: null,
          type: 'NORMAL',
        },
      },
    };
  }

  return new Response(400, {}, { errors: ['user not found'] });
}
