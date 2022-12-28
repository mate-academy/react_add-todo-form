/// <reference types="react-scripts" />

interface Todo {
  id: number;
  title: string;
  userId: number | undefined;
  completed: boolean;
  user: User | undefined;
}

interface User {
  id: number | undefined;
  name: string;
  email: string;
}
