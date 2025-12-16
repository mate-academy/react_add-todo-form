// src/types.ts
export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  user: User;
  userId: number; // додаємо userId для кожного todo
};
