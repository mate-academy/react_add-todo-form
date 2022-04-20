export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: Address,
  phone: string,
  website: string,
  company: { name: string, catchPhrase: string, bs: string }
}

export interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user?: User | null
}

type Address = {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: { lat: string, lng: string },
};
