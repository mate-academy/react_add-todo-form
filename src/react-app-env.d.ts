/// <reference types="react-scripts" />

interface Todo {
  id: number;
  title: string;
  userId: number | null;
  completed: boolean;
  user: User | null;
}

interface User {
  id: number | null;
  name: string;
  email: string;
}
