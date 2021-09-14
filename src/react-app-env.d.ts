/// <reference types="react-scripts" />
interface Todo {
  userId: number | string;
  id: number | string;
  title: string;
  completed: boolean;
  user: User | null;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}