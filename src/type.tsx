import { ChangeEvent } from 'react';

export type User = {
  id: number,
  name: string,
  username: string,
  email: string,
};

export type TypeTodo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
};

export type CompletedTodo = {
  todo: TypeTodo,
  user: User | undefined,
};

export type HandleEvent = ChangeEvent<HTMLInputElement>
| ChangeEvent<HTMLSelectElement>;
