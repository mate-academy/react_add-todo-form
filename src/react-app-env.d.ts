/// <reference types="react-scripts" />
interface Todo {
  userId: number | null,
  id?: number,
  uuid: string,
  title: string,
  user: User | null,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}
