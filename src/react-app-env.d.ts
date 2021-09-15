/// <reference types="react-scripts" />
interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string,
    },
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string,
  },
}

interface PreparedTodo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user: User | null,
}
