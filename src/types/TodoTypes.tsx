export interface User {
  id: number;
  name: string;
}
interface TodoWithoutUser {
  title: string;
  id: number;
  userId: number;
}

export interface Todo extends TodoWithoutUser {
  user: User | null;
}
