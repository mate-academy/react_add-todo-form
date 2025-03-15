export interface ToDoList {
  id: number;
  title: string;
  completed: boolean;
  userId?: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface ToDo {
  id: number;
  title: string;
  completed: boolean;
  user?: User;
}
