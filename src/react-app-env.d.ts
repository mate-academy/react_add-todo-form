/// <reference types="react-scripts" />

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: AddressUser,
  phone: string,
  website: string,
  company: CompanyUser
}

export interface AddressUser {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: GeoUser,
}

export interface GeoUser {
  lat: string,
  lng: string,
}

export interface CompanyUser {
  name: string,
  catchPhrase: string,
  bs: string,
}

export interface Todo {
  userId: number;
  id: number;
  name: string;
  completed: boolean;
}

export interface PrepTodo extends Todo {
  user: User | null;
}
