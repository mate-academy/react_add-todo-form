/// <reference types="react-scripts" />

interface Todo {
  user: User | null;
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

/* export interface TodoOfUser extends Todo {
  user : User | null;
} */

interface User {
  id: number,
  name: string,
  email: string
}
