/// <reference types="react-scripts" />

interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

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

interface Company {
  name: string,
  catchPhrase: string,
  bs: string,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: Address,
  phone: string,
  website: string,
  company: Company,
}

interface FullTodos extends Todo {
  user: User | null
}

type Todos = Todo[];
type Users = User[];
