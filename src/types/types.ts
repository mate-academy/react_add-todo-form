export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface TodosList {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
