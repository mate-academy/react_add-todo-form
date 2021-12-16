export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
}

export interface PreparedTodos extends Todo {
  userName: string;
}
