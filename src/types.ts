// src/types.ts
export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type RawTodo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type Todo = RawTodo & { user: User };
