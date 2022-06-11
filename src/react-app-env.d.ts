export interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

export interface PreparedTodo extends Todo {
  user: User | null,
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
  address: Addres,
  phone: string,
  website: string,
  company: Company
}

export interface Addres {
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
