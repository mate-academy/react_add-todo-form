export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}

export interface UserInfoProps {
  name: string;
  email: string;
}
