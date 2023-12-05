export interface ToDo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

export interface ToDoWithusers extends ToDo {
  user: User | null;
}
