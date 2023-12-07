export interface TodoWithoutUser {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface TodoWithUser extends TodoWithoutUser{
  user: User | null;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
