/// <reference types="react-scripts" />
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
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string,
    },
  }
}

export interface FullTodo extends Todo {
  user: User | null,
}
