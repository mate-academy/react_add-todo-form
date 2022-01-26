/// <reference types="react-scripts" />

interface Todo {
  userId?: number,
  id: number,
  title: string,
  completed: boolean,
  user: User | null,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: Address,
}

interface Address {
  street: string,
  suite: string,
  city: string,
  zipcode: str,
  geo: Geo,
}

interface Geo {
  lat: string,
  lng: string,
}
