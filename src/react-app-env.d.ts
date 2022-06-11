/// <reference types="react-scripts" />
export interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

export interface Geo {
  lat: string,
  lng: string,
}

export interface Company {
  name: string,
  catchPhrase: string,
  bs: string,
}

export interface Address {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: Geo,
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: Address,
  phone: string,
  website: string,
  company: Company,
}

export interface PrepArray extends Todo {
  user: User | undefined,
}
