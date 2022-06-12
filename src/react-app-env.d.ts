/// <reference types="react-scripts" />
export interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

export interface FinalTodo extends Todo {
  user: User | null,
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

interface Address {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: Geo,
}

interface Geo {
  lat: string,
  lng: string,
}

interface Company {
  name: string,
  catchPhrase: string,
  bs: string,
}
