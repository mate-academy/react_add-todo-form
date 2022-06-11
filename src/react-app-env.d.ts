/// <reference types="react-scripts" />

export interface Todos {
  userId : number,
  id: number,
  title: string,
  completed: boolean,
}

export interface PrepearedTodos {
  userId : number,
  id: number,
  title: string,
  completed: boolean,
  user?: string,
}

interface Address {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: {
    lat: string,
    lng: string,
  }
}

interface Company {
  name: string,
  catchPhrase: string,
  bs: string,
}

export interface Users {
  id: number,
  name: string,
  username: string,
  email: string,
  address: Address,
  phone: string,
  website: string,
  company: Company,
}
