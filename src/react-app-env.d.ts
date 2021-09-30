/// <reference types="react-scripts" />

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  userId: number;
  id: string;
  title: string;
  completed: boolean;
  user: User | null;
}
