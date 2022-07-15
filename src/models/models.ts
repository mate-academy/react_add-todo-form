interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

export interface Todo {
  id: number | string;
  userId: number | string;
  title: string;
  completed: boolean,
}
type RemoveAction = { type: 'REMOVE', payload: number | string };
type CompleteAction = { type: 'COMPLETED', payload: number | string };
type SubmitAction = { type: 'SUBMIT' };

export type ActionType = CompleteAction | RemoveAction | SubmitAction;

export const initialUser = {
  id: 20,
  name: 'Leanne Graham',
  username: '',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
};
