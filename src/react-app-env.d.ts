/// <reference types="react-scripts" />

export interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  adress?: Adress,
  phone: string,
  website: string,
  company: Company,
}

export interface PreparedTodo extends Todo {
  user: User | null,
}

export interface Adress {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: Geo,
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
