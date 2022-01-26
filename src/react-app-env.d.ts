/// <reference types="react-scripts" />

interface PreparedTodos {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user: User | null,
}

interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: UserAddress,
  phone: string,
  website: string,
  company: Company,
}

interface UserAddress {
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
