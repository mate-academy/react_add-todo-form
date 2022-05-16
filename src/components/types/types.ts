export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface TodoDesc {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user?: User;
}
