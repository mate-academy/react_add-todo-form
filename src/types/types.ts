export type Post = {
  title: string;
  userId: number;
};

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};
