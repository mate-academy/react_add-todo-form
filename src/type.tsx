interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  address: {};
  phone: string;
  website: string;
  company: {};
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}
