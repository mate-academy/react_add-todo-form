export interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
