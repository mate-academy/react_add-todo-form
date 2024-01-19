export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
export interface PrepareTodo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}
export interface Props {
  todo: PrepareTodo;
}
