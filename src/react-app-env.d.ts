/// <reference types="react-scripts" />

interface Todo {
  userId: number | null;
  id: v4 | number;
  title: string;
  completed: boolean;
  user: User | null;
}

interface User {
  id: number;
  name: string;
}
