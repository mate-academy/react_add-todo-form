export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface TodoPlusUser {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user?: User;
}
