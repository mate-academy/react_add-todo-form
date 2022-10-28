export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export interface FullTodoInfo extends Post {
  user: User | null;
}
