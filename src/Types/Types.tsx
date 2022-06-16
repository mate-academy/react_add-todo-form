export interface Todo {
  id: number,
  title: string,
  userId: number,
  completed: boolean,
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

interface Adress {
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
  address: Adress;
  phone: string;
  website: string;
  company: Company;
}

export interface PreparedTodos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
}
