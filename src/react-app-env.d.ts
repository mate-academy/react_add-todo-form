/// <reference types="react-scripts" />

interface Geo {
  lat: string,
  lng: string,
}

interface Address {
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
  address: Address
}

export interface ToDo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

export interface FinalFormToDo extends ToDo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user?: User | null
}
