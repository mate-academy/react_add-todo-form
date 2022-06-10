export type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string,
    },
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string,
  },
};

export interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

export interface Todos extends Todo {
  user: User | undefined
}

export type ListProps = {
  todos: Todos[]
};

export type TodoInfoProps = {
  todo: Todos;
};

export type UserProps = {
  user: User
};
