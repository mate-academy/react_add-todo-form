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

export type ComplitlyTodo = {
  todo: TypeTodo,
  user: User | undefined,
};

export type HendleEvent = ChangeEvent<HTMLInputElement>
| ChangeEvent<HTMLSelectElement>;
