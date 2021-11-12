import { Registry, Request } from 'miragejs';
import { AnyFactories, AnyModels } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

export function getApplicationDetail(schema: Schema<Registry<AnyModels, AnyFactories>>, request: Request) {
  return {
    ok: true,
    code: 200,
    message: "Get data success",
    data: {
      id: 1,
      logo: null,
      name: 'Application1',
      points: 1000000,
      owner: {
        id: 1,
        fullname: "User 1",
        avatar: null,
      },
      editor: [{
        id: 2,
        fullname: "User 2",
        avatar: null,
      },
      {
        id: 3,
        fullname: "User 3",
        avatar: null,
      },
      {
        id: 4,
        fullname: "User 4",
        avatar: null,
      },
      {
        id: 5,
        fullname: "User 5",
        avatar: null,
      },
      {
        id: 6,
        fullname: "User 6",
        avatar: null,
      }],
      status: 'ACTIVE',
      created_at: 1589871824,
      updated_at: null,
    },
  };
}
