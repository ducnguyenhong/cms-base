import { Registry, Request } from 'miragejs';
import { AnyFactories, AnyModels } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

export const getApplication = (schema: Schema<Registry<AnyModels, AnyFactories>>, request: Request) => {
  return {
    ok: true,
    code: 200,
    data: [
      {
        id: 1,
        logo: null,
        name: 'Application1',
        points: 1000000,
        owner: {
          id: 1,
          fullname: 'User 1',
          avatar: null,
        },
        editor: [
          {
            id: 2,
            name: 'User 2',
            avatar: null,
          },
          {
            id: 3,
            name: 'User 3',
            avatar: null,
          },
          {
            id: 4,
            name: 'User 4',
            avatar: null,
          },
          {
            id: 5,
            name: 'User 5',
            avatar: null,
          },
          {
            id: 6,
            name: 'User 6',
            avatar: null,
          },
        ],
        status: 'ACTIVE',
        created_at: 1589871824,
        updated_at: null,
      },
      {
        id: 2,
        logo: null,
        name: 'Application2',
        points: 2000000,
        owner: {
          id: 1,
          fullname: 'User 1',
          avatar: null,
        },
        editor: [
          {
            id: 2,
            name: 'User 2',
            avatar: null,
          },
          {
            id: 3,
            name: 'User 3',
            avatar: null,
          },
          {
            id: 4,
            name: 'User 4',
            avatar: null,
          },
        ],
        status: 'ACTIVE',
        created_at: 1589871824,
        updated_at: null,
      },
      {
        id: 3,
        logo: null,
        name: 'application 3',
        points: 3000000,
        owner: {
          id: 1,
          fullname: 'User 1',
          avatar: null,
        },
        editor: [
          {
            id: 2,
            name: 'User 2',
            avatar: null,
          },
          {
            id: 3,
            name: 'User 3',
            avatar: null,
          },
          {
            id: 4,
            name: 'User 4',
            avatar: null,
          },
          {
            id: 5,
            name: 'User 5',
            avatar: null,
          },
        ],
        status: 'ACTIVE',
        created_at: 1589871824,
        updated_at: null,
      },
      {
        id: 4,
        logo: null,
        name: 'application 444',
        points: 3000000,
        owner: {
          id: 1,
          fullname: 'User 1',
          avatar: null,
        },
        editor: [
          {
            id: 2,
            name: 'User 2',
            avatar: null,
          },
          {
            id: 3,
            name: 'User 3',
            avatar: null,
          },
        ],
        status: 'ACTIVE',
        created_at: 1589871824,
        updated_at: null,
      },

      {
        id: 5,
        logo: null,
        name: 'application 555555',
        points: 3000000,
        owner: {
          id: 1,
          fullname: 'User 1',
          avatar: null,
        },
        editor: [
          {
            id: 2,
            name: 'User 2',
            avatar: null,
          },
          {
            id: 3,
            name: 'User 3',
            avatar: null,
          },
          {
            id: 4,
            name: 'User 4',
            avatar: null,
          },
          {
            id: 5,
            name: 'User 5',
            avatar: null,
          },
        ],
        status: 'ACTIVE',
        created_at: 1589871824,
        updated_at: null,
      },
    ],
    pagination: {
      page: 1,
      limit: 10,
      sort: '',
      total: 10,
      total_items: 50,
      current: 10,
    },
  };
};
