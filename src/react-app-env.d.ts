/// <reference types="react-scripts" />

interface Todo {
  user: User | null;
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface User {
  id: number,
  name: string,
  email: string
}
