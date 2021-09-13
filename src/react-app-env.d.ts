/// <reference types="react-scripts" />

interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

interface Address {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: {
    lat: string,
    lng: string,
  },
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

interface TodoItem extends Todo {
  user: User | null,
}
