export interface ToDoFromServer {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

export interface UserFromServer {
  id: number,
  name: string,
  username: string,
  email: string,
}

export interface ToDo extends ToDoFromServer {
  user: UserFromServer,
}
