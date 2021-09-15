/// <reference types="react-scripts" />

interface Todo {
  userId: number;
  id: string;
  title: string;
  completed: boolean;
  user: User | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string
  website: string;
}
