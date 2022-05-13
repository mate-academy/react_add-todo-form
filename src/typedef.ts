export interface LinkedTodo extends Omit<Todo, 'userId'> {
  userName: string,
}

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
  adress: Address,
  phone: string,
  website: string,
  company: Company,
}

export interface Address {
  stret: string,
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
