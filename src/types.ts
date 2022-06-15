export interface Todos {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

export interface Geo {
  lat: string,
  lng: string,
}

export interface Adress {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: Geo,
}

export interface Company {
  name: string,
  catchPhrase: string,
  bs: string,
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: Adress,
  phone: string,
  website: string,
  company: Company,
}

export interface PreparedTodos extends Todos {
  user: User | null,
}
