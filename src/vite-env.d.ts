/// <reference types="vite/client" />
type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User | null;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};
