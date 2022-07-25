export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

export interface ToDo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

export interface PreparedToDos extends ToDo {
  user: User | null,
}
