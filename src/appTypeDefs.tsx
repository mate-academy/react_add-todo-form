export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type Geo = {
  lat: string;
  lng: string;
};

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company | null;
}

export interface PreparedTodos extends Todo {
  user?: User | null | undefined;
}
