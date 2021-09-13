/// <reference types="react-scripts" />

interface Todo {
  userId: number | string;
  id: number | string;
  title: string;
  user: User | null;
}

interface User {
  id: number;
  name: string;
}
