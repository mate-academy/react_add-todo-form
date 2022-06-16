export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface PreparedTodo extends Todo {
  user?: User;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
