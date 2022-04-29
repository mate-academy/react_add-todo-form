export interface Todo {
  id?: number,
  title: string,
  completed: boolean,
  user: User | null,
}

interface User {
  id?: number,
  name: string,
  email: string,
  phone: string,
  website: string,
}
