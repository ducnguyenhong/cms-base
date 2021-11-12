import { Registry, Request } from 'miragejs';
import { AnyFactories, AnyModels } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

export function getUserDetail(schema: Schema<Registry<AnyModels, AnyFactories>>, request: Request) {
  return {
    ok: true,
    code: 200,
    data: {
      id: 1,
      fullname: 'User 1',
      username: 'user1',
      phone: '0989871824',
      email: 'user@gmail.com',
      type: 'USER',
      avatar: null,
      address: 'Ba Đình, Hà Nội',
      status: 'ACTIVE',
      birthday: 1589871824,
      created_at: 1589871824,
      updated_at: null,
    },
  };
}
