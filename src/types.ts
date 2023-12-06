export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

export interface Todo {
  id: number,
  title: string,
  completed: true | false,
  userId: number,
}

export interface PreparedTodo extends Todo {
  user: User | null;
}
