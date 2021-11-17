export interface User {
  id: number;
  name: string;
  email: string;
}

export interface PreparedTodo {
  userId: number;
  id: number;
  title: string;
}
